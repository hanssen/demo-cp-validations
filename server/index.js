function hasRandomError() {
  return Math.random() < randomErrors;
}

function getError() {
  return {
    data: Math.random() > 0.5 ? validationError : validationErrors,
    status: 422
  };
}

const
  randomErrors = 0.6, // percent as 0.0 - 1.0

  bodyParser = require('body-parser'),
  fs = require('fs'),

  validationError = JSON.stringify({
    errors: [{
      detail: 'This name is already in use',
      source: { pointer: 'data/attributes/name' }
    }]
  }),

  validationErrors = JSON.stringify({
    errors: [{
      detail: 'This name is already in use',
      source: { pointer: 'data/attributes/name' }
    }, {
      detail: 'This E-Mail address is already in use',
      source: { pointer: 'data/attributes/e-mail' }
    }]
  });

module.exports = function(app) {
  // users all
  app.get('/api/v1/users', function(req, res) {
    const
      users = JSON.parse(fs.readFileSync('server/data/users.json')),
      json = { data: users.data };

    res.status(200).send(json);
  });

  // user by ID
  app.get('/api/v1/users/:id', function(req, res) {
    const
      users = JSON.parse(fs.readFileSync('server/data/users.json')),
      json = {
        data: users.data.filter(function(obj) {
          return obj.id === parseInt(req.params.id, 10);
        })[0]
      };

    res.status(200).send(json);
  });

  // user create
  app.post('/api/v1/users', bodyParser.json({ type: 'application/vnd.api+json' }), function(req, res) {
    let
      json = {},
      status = 201;

    if (hasRandomError()) {
      const error = getError();
      json = error.data;
      status = error.status;
    } else {
      const users = JSON.parse(fs.readFileSync('server/data/users.json'));

      json = req.body;
      json.data.id = Date.now();
    }

    res.status(status).send(json);
  });

  // user update
  app.patch('/api/v1/users/:id', bodyParser.json({ type: 'application/vnd.api+json' }), function(req, res) {
    let
      json = {},
      status = 200;

    if (hasRandomError()) {
      const error = getError();
      json = error.data;
      status = error.status;
    } else {
      json = req.body;
    }

    res.status(status).send(json);
  });

  // user delete
  app.delete('/api/v1/users/:id', function(req, res) {
    res.status(204).send('');
  });
};
