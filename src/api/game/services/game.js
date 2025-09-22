'use strict';

/**
 * game service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::game.game', ({ strapi }) => ({

  /**
   * Finds a single game using either its numeric ID or its string slug.
   * @param {string | number} identifier - The ID or slug of the game.
   */
  async findOneByIdentifier(identifier) {
    // Check if the identifier is a number (for ID) or a string (for slug)
    const isNumeric = !isNaN(identifier) && !isNaN(parseFloat(identifier));

    const filters = isNumeric
      ? { id: Number(identifier) }
      : { slug: identifier };

    // Find the entry using the correct filter
    const entry = await strapi.entityService.findMany('api::game.game', {
      filters: filters,
      populate: 'deep', // This populates all your components and relations
    });

    // findMany always returns an array, so we return the first item or null
    return entry.length > 0 ? entry[0] : null;
  }
}));
