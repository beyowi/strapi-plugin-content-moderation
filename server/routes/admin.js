'use strict';

module.exports = [
  {
    method: 'GET',
    path: '/find-all-pending',
    handler: 'admin.findAllPending',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/:contentTypeName/:id/approve',
    handler: 'admin.approve',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/:contentTypeName/:id/pending',
    handler: 'admin.pending',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/:contentTypeName/:id/reject',
    handler: 'admin.reject',
    config: {
      auth: false,
      policies: [],
    },
  },
];
