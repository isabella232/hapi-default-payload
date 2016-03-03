# hapi-default-payload [![npm version](https://badge.fury.io/js/hapi-default-payload.svg)](http://badge.fury.io/js/hapi-default-payload) [![Build Status](https://travis-ci.org/lob/hapi-default-payload.svg)](https://travis-ci.org/lob/hapi-default-payload)

A tiny plugin to default the `request.payload` to an empty object (similar to the pre [Hapi 9+](https://github.com/hapijs/hapi/issues/2689) behavior).
This can be useful if you want more descriptive Joi error messages in response to requests that are missing payload data from the request body.

For example, the error message for the schema...

```js
  Joi.object.keys({
    a: Joi.number().required(),
    b: Joi.string().required()
  })
```

can become more detailed with this plugin...

```
ValidationError: child "a" fails because ["a" is required]. child "b" fails because ["b" is required]
```

as opposed to the technically accurate but more abrupt and less helpful...

```
ValidationError: "value" must be an object
```

## Registering the plugin

```js
var Hapi = require('hapi');

var server = new Hapi.Server();

server.register([
  require('hapi-default-payload')
], function (err) {
  // Insert your preferred error handling here...
});
```
