'use strict';

/**
 *  game controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::game.game', ({ strapi }) => ({

  /**
   * This brings back the default functionality for the '/games' list endpoint.
   */
  async find(ctx) {
    // Calling the default core action
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  /**
   * This is the custom logic to find a single game by its slug OR its ID.
   * It powers the '/games/:identifier' endpoint.
   */
  async findOne(ctx) {
    // 'id' is the default parameter name in Strapi's routes
    const { id: identifier } = ctx.params;

    // Delegate the lookup logic to the service
    const entity = await strapi.service('api::game.game').findOneByIdentifier(identifier);

    // If no entity is found, return a 404 error
    if (!entity) {
      return ctx.notFound('Game not found');
    }

    // Sanitize and transform the response
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  }
}));
