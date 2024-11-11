'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Truncar las tablas antes de insertar nuevos datos
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0'); // Deshabilitar las claves foráneas temporalmente
    await queryInterface.bulkDelete('routes', null, {});
    await queryInterface.bulkDelete('companies', null, {});
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('stops', null, {});
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1'); 
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
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('companies', null, {});
  }
};
