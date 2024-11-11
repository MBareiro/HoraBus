'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('buses', [
      {
        company_id: 1, // ID de la compañía "Horianski" en `companies`
        route_id: 1,    // Asegúrate de que este ID exista en la tabla `routes`
        line: 'Línea 101',
        bus_type: 'Interurbano',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_id: 2, // ID de la compañía "Expreso A del Valle"
        route_id: 2,    // Asegúrate de que este ID exista en la tabla `routes`
        line: 'Línea 202',
        bus_type: 'Rápido',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_id: 3, // ID de la compañía "Sol del Norte"
        route_id: 3,    // Asegúrate de que este ID exista en la tabla `routes`
        line: 'Línea 303',
        bus_type: 'Semi-cama',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_id: 4, // ID de la compañía "Singer"
        route_id: 4,    // Asegúrate de que este ID exista en la tabla `routes`
        line: 'Línea 404',
        bus_type: 'Cama',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_id: 5, // ID de la compañía "Expreso Misiones"
        route_id: 5,    // Asegúrate de que este ID exista en la tabla `routes`
        line: 'Línea 505',
        bus_type: 'Común',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('buses', null, {});
  }
};
