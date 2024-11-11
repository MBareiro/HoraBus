module.exports = function(sequelize, DataTypes) {
  const Stop = sequelize.define('stops', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });

  // Relación: una parada puede estar asociada a muchas rutas
  Stop.associate = function(models) {
    Stop.hasMany(models.routes, { foreignKey: 'origin', as: 'originRoutes' });
    Stop.hasMany(models.routes, { foreignKey: 'destination', as: 'destinationRoutes' });
  };

  return Stop;
};
