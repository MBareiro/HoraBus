'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Obtener los ids de las paradas
    const stops = await queryInterface.sequelize.query(
      'SELECT id, name FROM stops;',
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (!stops || stops.length === 0) {
      throw new Error('No se encontraron paradas en la base de datos.');
    }

    // Función para obtener el id de la parada por nombre
    const getStopId = (name) => {
      const stop = stops.find(stop => stop.name === name);
      if (!stop) {
        throw new Error(`No se encontró la parada: ${name}`);
      }
      return stop.id;
    };

    // Asociar los ids de las paradas con las rutas
    await queryInterface.bulkInsert('routes', [
      {
        company_id: 1, // ID de la compañía "Horianski"
        origin: getStopId('Aristóbulo del Valle'),
        destination: getStopId('Posadas'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_id: 2, // ID de la compañía "Expreso A del Valle"
        origin: getStopId('Campo Grande'),
        destination: getStopId('Oberá'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_id: 3, // ID de la compañía "Sol del Norte"
        origin: getStopId('San Vicente'),
        destination: getStopId('San Pedro'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_id: 4, // ID de la compañía "Singer"
        origin: getStopId('Campo Grande'),
        destination: getStopId('Oberá'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        company_id: 5, // ID de la compañía "Expreso Misiones"
        origin: getStopId('San Pedro'),
        destination: getStopId('Eldorado'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('routes', null, {});
  }
};
