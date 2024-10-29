'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('companies', [
      {
        name: 'Horianski',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Expreso A del Valle',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sol del Norte',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Singer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Expreso Misiones',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('companies', null, {});
  }
};
