'use strict';

module.exports = [
  {
    method: 'GET',
    path: '/find-content-types',
    handler: 'admin.findModeratedContentTypes',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/find-all-pending/:slug',
    handler: 'admin.findAllPending',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/:slug/:id/approve',
    handler: 'admin.approve',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/:slug/:id/pending',
    handler: 'admin.pending',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/:slug/:id/reject',
    handler: 'admin.reject',
    config: {
      auth: false,
      policies: [],
    },
  },
];
