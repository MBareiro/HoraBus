'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'Juan Pérez',
        role: 'User',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ana García',
        role: 'Administrator',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Don Ramon',
        role: 'Operator',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'El chavo',
        role: 'Driver',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
