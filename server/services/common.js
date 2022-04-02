'use strict';

module.exports = ({ strapi }) => ({
  // Find all content
  async findAll(slug, query) {
    const { pageSize = 10, page = 1, filters } = query;
    let params = {
      where: {
        ...filters,
      },
      offset: (page - 1) * pageSize,
      limit: pageSize,
      orderBy: [{ createdAt: 'desc' }],
    };

    const result = await strapi.db.query(slug).findMany({ ...params });
    const total = await strapi.db.query(slug).count({
      where: params.where,
    });
    const pageCount = Math.floor(total / pageSize);
    return {
      result,
      pagination: {
        page: page,
        pageSize: pageSize,
        pageCount: total % pageSize === 0 ? pageCount : pageCount + 1,
        total,
      },
    };
  },

  // Change content status
  async updateStatus(slug, contentId, newStatus) {
    return await strapi.db.query(slug).update({
      where: { id: contentId },
      data: {
        moderation_status: newStatus,
      },
    });
  },
});
