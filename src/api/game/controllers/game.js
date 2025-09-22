'use strict';

/**
 *  game controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::game.game', ({ strapi }) => ({

  /**
   * We are overriding the default findOne controller action.
   * This allows us to find a game by its slug OR its ID.
   */
  async findOne(ctx) {
    // 'id' is the default parameter name in Strapi's routes
    const { id: identifier } = ctx.params;
    
    // The service will handle the logic of finding by slug or ID
    const entity = await strapi.service('api::game.game').findOneByIdentifier(identifier);

    // If no entity is found, throw a 404 error
    if (!entity) {
      return ctx.notFound('Game not found');
    }

    // Sanitize and transform the response before sending it
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  }
}));
