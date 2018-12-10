'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      name: {
        type: Sequelize.STRING,
        primaryKey: true,
        unique: true,
        notNull: true,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: Sequelize.STRING,
        notNull: true,
        validate: {
          notEmpty: true
        }
      },
      color1: {
        type: Sequelize.STRING
      },
      color2: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('users');
  }
};
