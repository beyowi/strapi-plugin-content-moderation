"use strict";

const { prop } = require("lodash/fp");

const hasModeratedOption = (modelOrAttribute) => {
  return prop("pluginOptions.moderation.moderated", modelOrAttribute) === true;
};

/**
 * Returns whether a model is moderated or not
 * @param {*} model
 * @returns
 */
const isModeratedContentType = (model) => {
  return hasModeratedOption(model);
};

module.exports = () => ({
  isModeratedContentType,
});
