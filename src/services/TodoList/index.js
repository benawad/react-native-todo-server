'use strict';

const service = require('feathers-sequelize');
const TodoList = require('./TodoList-model');
const hooks = require('./hooks');

module.exports = function(){
  const app = this;

  const options = {
    Model: TodoList(app.get('sequelize')),
  };

  // Initialize our service with any options it requires
  app.use('/TodoLists', service(options));

  // Get our initialize service to that we can bind hooks
  const TodoListService = app.service('/TodoLists');

  // Set up our before hooks
  TodoListService.before(hooks.before);

  // Set up our after hooks
  TodoListService.after(hooks.after);
};
