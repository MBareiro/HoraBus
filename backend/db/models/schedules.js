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
    frequency_id: { 
      type: DataTypes.INTEGER, 
      allowNull: true,
      references: {
        model: 'frequencies',  
        key: 'id'  
      }
    },
    is_active: { 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true 
    }
  });

  // Relación con la ruta y frecuencia
  Schedule.associate = function(models) {
    Schedule.belongsTo(models.routes, { foreignKey: 'route_id', as: 'route' });
    Schedule.belongsTo(models.frequency, { foreignKey: 'frequency_id', as: 'frequency' }); 
  };

  return Schedule;
};
