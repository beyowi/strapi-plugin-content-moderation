'use strict';

module.exports = {
  render: function (uid) {
    return `plugin::content-moderation.${uid}`;
  },
  moderation: {
    pending: 'pending',
    moderate: 'moderate',
  },
};
