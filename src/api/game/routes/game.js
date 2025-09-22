'use strict';

/**
 * Custom router for the Game content type.
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/games/slug/:slug', // The URL endpoint
      handler: 'game.findOneBySlug', // Maps to the controller action: 'game' controller, 'findOneBySlug' function
      config: {
        auth: false, // Make this endpoint publicly accessible
      },
    },
  ],
};
