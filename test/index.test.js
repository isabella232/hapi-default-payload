'use strict';

var expect = require('chai').expect;
var Hapi = require('hapi');

describe('plugin', function () {

  var server = new Hapi.Server();
  server.connection({ port: 80 });

  server.register([
    require('inject-then'),
    require('../lib')
  ], function () { });

  server.route([{
    method: 'GET',
    path: '/default_payload',
    config: {
      handler: function (request, reply) {
        reply(request.payload);
      }
    }
  },
  {
    method: 'POST',
    path: '/default_payload',
    config: {
      handler: function (request, reply) {
        reply(request.payload);
      }
    }
  }]);

  it('defaults the request payload to an empty object', function () {
    return server.injectThen({
      method: 'POST',
      url: '/default_payload'
    })
    .then(function (response) {
      expect(response.result).to.eql({});
    });
  });

  it('does not default the request payload for GET requests', function () {
    return server.injectThen({
      method: 'GET',
      url: '/default_payload'
    })
    .then(function (response) {
      expect(response.result).to.be.null;
    });
  });

  it('does not default the request payload when the payload is non-empty', function () {
    var payload = { something: 'banana' };

    return server.injectThen({
      method: 'POST',
      url: '/default_payload',
      payload: payload
    })
    .then(function (response) {
      expect(response.result).to.eql(payload);
    });
  });

});
