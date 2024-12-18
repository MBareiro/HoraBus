module.exports = function(sequelize, DataTypes) {
  const Schedule = sequelize.define('schedules', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    route_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'routes',
        key: 'id'
      }
    },
    departure_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    arrival_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    frequency_id: { // Cambié "frequency" por "frequency_id"
      type: DataTypes.INTEGER,  // Será un número que representa la clave foránea
      allowNull: true,
      references: {
        model: 'frequencies',  // Referencia al modelo Frequency
        key: 'id'  // El campo "id" de la tabla frequencies
      }
    }
  });

  // Relación con la ruta y frecuencia
  Schedule.associate = function(models) {
    Schedule.belongsTo(models.routes, { foreignKey: 'route_id', as: 'route' });
    Schedule.belongsTo(models.frequency, { foreignKey: 'frequency_id', as: 'frequency' }); // Relación con Frequency
  };

  return Schedule;
};
