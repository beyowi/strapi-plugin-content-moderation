'use strict';

const { getService } = require('../utils');
const { APPROVAL_STATUS } = require('../utils/constants');

module.exports = ({ strapi }) => ({
  // Find all pending content
  async findAllPending() {
    const moderatedModelUIDs =
      getService('content-types').getModeratedContentTypes();

    let pendingContent = {};

    if (moderatedModelUIDs.length > 0) {
      for (let i = 0; i < moderatedModelUIDs.length; i++) {
        pendingContent[moderatedModelUIDs[i]] = await strapi.db
          .query(moderatedModelUIDs[i])
          .findMany({
            where: { moderation_status: APPROVAL_STATUS.PENDING },
          });
      }
    }
    return pendingContent;
  },

  // Change content status
  async updateStatus(modelUid, contentId, newStatus) {
    return await strapi.db.query(modelUid).update({
      where: { id: contentId },
      data: {
        moderation_status: newStatus,
      },
    });
  },
});
