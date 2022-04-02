'use strict';

const _ = require('lodash');

const { getService } = require('./utils');

module.exports = ({ strapi }) => {
  extendModeratedContentTypes(strapi);
};

/**
 * Adds moderation fields to moderated content types
 * @param {Strapi} strapi
 */
const extendModeratedContentTypes = (strapi) => {
  const contentTypeService = getService('content-types');

  Object.values(strapi.contentTypes).forEach((contentType) => {
    if (contentTypeService.isModeratedContentType(contentType)) {
      const { attributes } = contentType;

      _.set(attributes, 'moderationStatus', {
        writable: true,
        private: false,
        configurable: false,
        visible: false,
        type: 'string',
      });
    }
  });
};
