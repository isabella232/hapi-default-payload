'use strict';

exports.register = function (server, options, next) {

  server.ext('onPostAuth', function (request, reply) {
    if (request.method !== 'get' && !request.payload) {
      request.payload = {};
    }

    return reply.continue();
  });

  next();
};

exports.register.attributes = {
  pkg: require('../package.json')
};
