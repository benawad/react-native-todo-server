'use strict';

// TodoList-model.js - A sequelize model
// 
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.

const Sequelize = require('sequelize');

module.exports = function(sequelize) {
  const TodoList = sequelize.define('TodoLists', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
  }, {
    freezeTableName: true,
    classMethods: {
      associate(models) {
        TodoList.hasMany(models.Todos, { foreignKey: 'listId' });
        TodoList.belongsToMany(models.users, {
          through: 'ShareTodoList',
          foreignKey: 'listId',
        });
      },
    },
  });

  return TodoList;
};
