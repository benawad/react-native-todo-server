'use strict';

// src/services/user/hooks/addRelationship.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    hook.params.sequelize = {
      include: [ hook.app.services.TodoLists.Model ],
    };
  };
};
