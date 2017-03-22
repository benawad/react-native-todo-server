'use strict';

// user-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');
const todoFunc = require('../Todo/Todo-model.js');

module.exports = function(sequelize) {
  const user = sequelize.define('users', {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate(models) {
        user.hasMany(models.TodoLists, { foreignKey: 'ownerId' });
        user.belongsToMany(models.TodoLists, {
          through: 'ShareTodoList',
          foreignKey: 'userId',
        });
      },
    },
  });

  return user;
};
