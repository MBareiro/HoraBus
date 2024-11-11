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
        model: 'routes', // Relacionado con la tabla routes
        key: 'id'
      }
    },
    day_of_week: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    departure_time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  });

  // Relación: un horario pertenece a una ruta
  Schedule.associate = function(models) {
    Schedule.belongsTo(models.routes, { foreignKey: 'route_id', as: 'route' });
    
  };

  return Schedule;
};
