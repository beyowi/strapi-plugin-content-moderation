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
    path: '/:slug/find-all',
    handler: 'admin.findAll',
    config: {
      auth: false,
      policies: [],
    },
  },
  {
    method: 'POST',
    path: '/:slug/:id/approved',
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
    path: '/:slug/:id/rejected',
    handler: 'admin.reject',
    config: {
      auth: false,
      policies: [],
    },
  },
];
