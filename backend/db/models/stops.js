module.exports = function(sequelize, DataTypes) {
  const Stop = sequelize.define('stops', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    location: {
      type: DataTypes.GEOGRAPHY('POINT'),
    }
  });

  Stop.associate = function(models) {
    // Relación con rutas
    Stop.hasMany(models.routes, { foreignKey: 'origin', as: 'originRoutes' });
    Stop.hasMany(models.routes, { foreignKey: 'destination', as: 'destinationRoutes' });
  };

  return Stop;
};
