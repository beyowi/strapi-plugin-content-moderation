const pluginPkg = require('../../package.json');

const pluginId = pluginPkg.name.replace(/^@beyowi\/strapi-plugin-/i, '');

module.exports = pluginId;
