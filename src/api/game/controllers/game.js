'use strict';

/**
 *  game controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

// Extend the core controller
module.exports = createCoreController('api::game.game', ({ strapi }) => ({
  
  // This is our custom action
  async findOneBySlug(ctx) {
    // 1. Get the slug from the request context (the URL parameters)
    const { slug } = ctx.params;

    // 2. Call the service to find the game by slug, ensuring deep population
    // 'api::game.game' is the UID of our service
    const entity = await strapi.service('api::game.game').findOneBySlug(slug);

    // 3. Use the 'transformResponse' utility to sanitize the output
    // This removes private fields and properly formats the data for the API
    if (!entity) {
      return ctx.notFound('Game not found');
    }
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  }
}));
