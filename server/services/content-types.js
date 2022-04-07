'use strict';

const { prop } = require('lodash/fp');
const { first } = require('lodash');

const hasModeratedOption = (modelOrAttribute) => {
  return prop('pluginOptions.moderation.moderated', modelOrAttribute) === true;
};

/**
 * Returns whether a model is moderated or not
 * @param {*} model
 * @returns
 */
const isModeratedContentType = (model) => {
  return hasModeratedOption(model);
};

const getModeratedContentTypes = () => {
  return Object.values(strapi.contentTypes)
    .filter((contentType) => isModeratedContentType(contentType))
    .map((contentType) => ({
      uid: contentType.uid,
      displayName: contentType.info.displayName,
      attributes: contentType.attributes,
    }));
};

const getContentTypeData = (slug) => {
  return first(
    Object.values(strapi.contentTypes).filter(
      (contentType) => contentType.uid === slug
    )
  );
};

module.exports = () => ({
  getContentTypeData,
  getModeratedContentTypes,
  isModeratedContentType,
});
