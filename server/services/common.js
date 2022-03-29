'use strict';

const { getService } = require('../utils');
const { APPROVAL_STATUS } = require('../utils/constants');

module.exports = ({ strapi }) => ({
  // Find all pending content
  async findAllPending(slug) {
    return await strapi.db.query(slug).findMany({
      where: { moderation_status: APPROVAL_STATUS.PENDING },
    });
  },

  // Change content status
  async updateStatus(slug, contentId, newStatus) {
    return await strapi.db.query(slug).update({
      where: { id: contentId },
      data: {
        moderation_status: newStatus,
      },
    });
  },
});
