'use strict';

const { getService } = require('../utils');
const { APPROVAL_STATUS } = require('../utils/constants');

module.exports = {
  async findModeratedContentTypes(ctx) {
    return getService('content-types').getModeratedContentTypes();
  },

  async findAll(ctx) {
    const {
      params: { slug },
      query,
    } = ctx;

    return getService('common').findAll(slug, query);
  },

  approve(ctx) {
    const {
      params: { slug, id },
    } = ctx;

    return getService('common').updateStatus(
      slug,
      id,
      APPROVAL_STATUS.APPROVED
    );
  },

  pending(ctx) {
    const {
      params: { slug, id },
    } = ctx;

    return getService('common').updateStatus(slug, id, APPROVAL_STATUS.PENDING);
  },

  reject(ctx) {
    const {
      params: { slug, id },
    } = ctx;

    return getService('common').updateStatus(
      slug,
      id,
      APPROVAL_STATUS.REJECTED
    );
  },
};
