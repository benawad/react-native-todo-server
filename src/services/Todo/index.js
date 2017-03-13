'use strict';

const service = require('feathers-sequelize');
const Todo = require('./Todo-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: Todo(app.get('sequelize')),
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/Todos', service(options));

  // Get our initialize service to that we can bind hooks
  const TodoService = app.service('/Todos');

  // Set up our before hooks
  TodoService.before(hooks.before);

  // Set up our after hooks
  TodoService.after(hooks.after);
};
