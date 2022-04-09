const permissions = require('./../../permissions');

const pluginPermissions = {
  pending: [
    {
      action: permissions.render(permissions.moderation.pending),
      subject: null,
    },
    {
      action: permissions.render(permissions.moderation.moderate),
      subject: null,
    },
  ],
  moderate: [
    {
      action: permissions.render(permissions.moderation.moderate),
      subject: null,
    },
  ],
};

export default pluginPermissions;
