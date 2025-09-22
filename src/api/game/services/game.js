'use strict';

/**
 * game service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

// Extend the core service
module.exports = createCoreService('api::game.game', ({ strapi }) => ({

  // This is our custom service function
  async findOneBySlug(slug) {
    // 1. Use the Entity Service API to find one entry
    const entry = await strapi.entityService.findMany('api::game.game', {
      filters: { slug: slug }, // Find by the slug field
      populate: 'deep', // Use the 'deep' populate to get all components, relations, and media
    });

    // findMany returns an array, so we return the first item or null
    return entry.length > 0 ? entry[0] : null;
  }
}));
