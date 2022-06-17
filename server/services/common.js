'use strict';

const { first, isArray, isNil } = require('lodash');

const { getService } = require('../utils');

const { MODERATION_STATUS } = require('../utils/constants');
const approvedContentTemplate = require('../config/email-templates/approved-content');
const approvedUserTemplate = require('../config/email-templates/approved-user');
const refusedContentTemplate = require('../config/email-templates/refused-content');
const refusedUserTemplate = require('../config/email-templates/refused-user');

module.exports = ({ strapi }) => ({
  getConfig(prop, defaultValue) {
    let queryProp = prop;
    if (prop && isArray(prop)) {
      queryProp = prop.join('.');
    }
    const result = strapi.config.get(
      `plugin.content-moderation${queryProp ? '.' + queryProp : ''}`
    );
    return isNil(result) ? defaultValue : result;
  },

  // Find all content
  async findAll(slug, query) {
    const { pageSize = 10, page = 1, filters } = query;
    const fieldConfig = this.getConfig('contentListFields');
    const fieldsList =
      slug in fieldConfig ? fieldConfig[slug] : fieldConfig['*'];
    const contentTypeData =
      getService('content-types').getContentTypeData(slug);

    let existingFields = Object.keys(contentTypeData.attributes).filter(
      (_) => fieldsList === _ || fieldsList.includes(_)
    );

    let params = {
      select: ['id', 'moderationStatus', ...existingFields],
      where: {
        ...filters,
      },
      offset: (page - 1) * pageSize,
      limit: pageSize,
      orderBy: [{ createdAt: 'desc' }],
    };

    const result = await strapi.db.query(slug).findMany({ ...params });
    const total = await strapi.db.query(slug).count({
      where: params.where,
    });
    const pageCount = Math.floor(total / pageSize);
    return {
      result,
      pagination: {
        page: page,
        pageSize: pageSize,
        pageCount: total % pageSize === 0 ? pageCount : pageCount + 1,
        total,
      },
    };
  },

  // Change content status
  async updateStatus(slug, contentId, newStatus) {
    const content = await strapi.entityService.findOne(slug, contentId);

    let data = {
      moderationStatus: newStatus,
    };

    if (content.publishedAt !== undefined) {
      if (newStatus == MODERATION_STATUS.APPROVED && !content.publishedAt) {
        data.publishedAt = Date.now();
      } else {
        data.publishedAt = null;
      }
    }
    const response = await strapi.db.query(slug).update({
      where: { id: contentId },
      data,
      populate: { createdBy: true },
    });

    const configEmail = this.getConfig('sendNotificationEmail', false);
    if (configEmail) {
      let emailAddr;
      let emailTemplate;
      let emailContent;
      let contentLabel;

      if (newStatus != MODERATION_STATUS.PENDING) {
        if (slug === 'plugin::users-permissions.user') {
          emailAddr = response.email;
          emailTemplate =
            newStatus === MODERATION_STATUS.APPROVED
              ? approvedUserTemplate
              : refusedUserTemplate;
        } else {
          const labelConfig = this.getConfig('contentLabel');
          const labelFields =
            slug in labelConfig ? labelConfig[slug] : labelConfig['*'];
          contentLabel = first(
            Object.keys(response)
              .filter((_) => labelFields === _ || labelFields.includes(_))
              .map((_) => response[_])
              .filter((_) => _)
          );

          const contentTypeData =
            getService('content-types').getContentTypeData(slug);

          emailAddr = response.createdBy.email;
          emailTemplate =
            newStatus === MODERATION_STATUS.APPROVED
              ? approvedContentTemplate
              : refusedContentTemplate;
          emailContent = {
            contentType: contentTypeData.info.singularName,
            label: contentLabel,
          };
        }

        await strapi.plugins['email'].services.email.sendTemplatedEmail(
          {
            to: emailAddr,
            // from: is not specified, so it's the defaultFrom that will be used instead
          },
          emailTemplate,
          emailContent
        );
      }
    }
    return response;
  },
});
