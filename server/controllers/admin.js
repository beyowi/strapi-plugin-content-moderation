'use strict';

const { getService } = require('../utils');
const { APPROVAL_STATUS } = require('../utils/constants');

module.exports = {
  async findAllPending(ctx) {
    return getService('common').findAllPending();
  },

  approve(ctx) {
    const { params = {} } = ctx;
    const { contentTypeName, id } = params;

    return getService('common').updateStatus(
      contentTypeName,
      id,
      APPROVAL_STATUS.APPROVED
    );
  },

  pending(ctx) {
    const { params = {} } = ctx;
    const { contentTypeName, id } = params;

    return getService('common').updateStatus(
      contentTypeName,
      id,
      APPROVAL_STATUS.PENDING
    );
  },

  reject(ctx) {
    const { params = {} } = ctx;
    const { contentTypeName, id } = params;

    return getService('common').updateStatus(
      contentTypeName,
      id,
      APPROVAL_STATUS.REJECTED
    );
  },
};
