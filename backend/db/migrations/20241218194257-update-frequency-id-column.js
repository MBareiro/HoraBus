'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('schedules', 'frequency_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'frequencies',  // Se refiere a la tabla 'frequencies'
        key: 'id'  // Se refiere al campo 'id' de la tabla 'frequencies'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Si es necesario revertir la migración, puedes restaurar el tipo original o realizar una operación adecuada.
    await queryInterface.changeColumn('schedules', 'frequency_id', {
      type: Sequelize.STRING,  // O el tipo de datos anterior si es necesario revertir
      allowNull: true
    });
  }
};
