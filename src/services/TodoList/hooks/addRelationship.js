'use strict';

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    hook.params.sequelize = {
      include: [ hook.app.services.users.Model ],
    };
  };
};
