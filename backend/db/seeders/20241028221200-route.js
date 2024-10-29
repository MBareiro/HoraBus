'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('routes', [
      {
        company_id: 1, // ID de la compañía "Horianski" en `companies`
        origin: 'Aristóbulo del Valle',
        destination: 'Posadas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_id: 2, // ID de la compañía "Expreso A del Valle"
        origin: 'Salto Encantado',
        destination: '25 de Mayo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_id: 3, // ID de la compañía "Sol del Norte"
        origin: 'San Vicente',
        destination: 'San Pedro',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_id: 4, // ID de la compañía "Singer"
        origin: 'Campo Grande',
        destination: 'Oberá',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_id: 5, // ID de la compañía "Expreso Misiones"
        origin: 'Capioví',
        destination: 'Puerto Rico',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('routes', null, {});
  }
};
