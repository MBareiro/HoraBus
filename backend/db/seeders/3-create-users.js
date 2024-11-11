'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Primero, recupera los ids de las compañías
    const companies = await queryInterface.sequelize.query(
      'SELECT id, name FROM companies;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    // Insertar los usuarios y asociarlos a las compañías usando los ids recuperados
    await queryInterface.bulkInsert('users', [
      {
        name: 'Juan Pérez',
        role: 'User',
        company_id: companies.find(company => company.name === 'Horianski').id,  // Asocia al usuario con la compañía 'Horianski'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ana García',
        role: 'Administrator',
        company_id: companies.find(company => company.name === 'Expreso A del Valle').id,  // Asocia al usuario con la compañía 'Expreso A del Valle'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Don Ramon',
        role: 'Operator',
        company_id: companies.find(company => company.name === 'Sol del Norte').id,  // Asocia al usuario con la compañía 'Sol del Norte'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'El chavo',
        role: 'Driver',
        company_id: companies.find(company => company.name === 'Singer').id,  // Asocia al usuario con la compañía 'Singer'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
