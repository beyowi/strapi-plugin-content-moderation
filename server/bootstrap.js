'use strict';

const permissions = require('./../permissions');

module.exports = async ({ strapi }) => {
  // Check if the plugin users-permissions is installed because the navigation needs it
  if (Object.keys(strapi.plugins).indexOf('users-permissions') === -1) {
    throw new Error(
      'In order to make the content-moderation plugin work the users-permissions plugin is required'
    );
  }
  // Add permissions
  const actions = [
    {
      section: 'plugins',
      displayName: 'Moderation: Set Pending',
      uid: permissions.moderation.pending,
      pluginName: 'content-moderation',
    },
    {
      section: 'plugins',
      displayName: 'Moderation: Moderate',
      uid: permissions.moderation.moderate,
      pluginName: 'content-moderation',
    },
  ];

  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};
