'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('stops', [
      {
        name: 'Aristóbulo del Valle',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Campo Grande',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Oberá',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Posadas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'San Vicente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'San Pedro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Eldorado',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('stops', null, {});
  }
};
