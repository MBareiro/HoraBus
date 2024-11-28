module.exports = function(sequelize, DataTypes) {
  const Schedule = sequelize.define('schedules', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    bus_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'buses',
        key: 'id'
      }
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
    observations: {
      type: DataTypes.STRING(255),  
      allowNull: true
    }
  });

  // Relación con el bus y la ruta
  Schedule.associate = function(models) {
    Schedule.belongsTo(models.buses, { foreignKey: 'bus_id', as: 'bus' });
    Schedule.belongsTo(models.routes, { foreignKey: 'route_id', as: 'route' });
  };

  return Schedule;
};
