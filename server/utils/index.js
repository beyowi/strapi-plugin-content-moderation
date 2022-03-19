"use strict";

// retrieve a local service
const getService = (name) => {
  return strapi.plugin("content-moderation").service(name);
};

module.exports = {
  getService,
};
