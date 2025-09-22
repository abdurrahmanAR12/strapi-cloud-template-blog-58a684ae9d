
'use strict';

/**
 * game service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::game.game', ({ strapi }) => ({

  /**
   * Custom service function to find a game by its ID or slug.
   * @param {string | number} identifier - The ID or slug of the game.
   */
  async findOneByIdentifier(identifier) {
    // Determine if the identifier is a numeric ID or a string slug
    const isNumeric = !isNaN(identifier) && !isNaN(parseFloat(identifier));
    
    const filters = isNumeric
      ? { id: Number(identifier) }
      : { slug: identifier };

    // Use the Entity Service to find the entry with deep population
    const entry = await strapi.entityService.findMany('api::game.game', {
      filters: filters,
      populate: 'deep', // Populates all components, relations, and media
    });

    // findMany returns an array, so we return the first result or null if not found
    return entry.length > 0 ? entry[0] : null;
  }
}));
