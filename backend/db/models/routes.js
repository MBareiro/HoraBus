module.exports = function(sequelize, DataTypes) {
  const Route = sequelize.define('routes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    origin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stops',
        key: 'id',
      },
    },
    destination: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stops',
        key: 'id',
      },
    },
  }, {
    tableName: 'routes',
    timestamps: true,
  });

  // Relación con 'Stop' para 'origin' y 'destination'
  Route.associate = function(models) {
    // Relación con las paradas de origen y destino
    Route.belongsTo(models.stops, { foreignKey: 'origin', as: 'originStop' });
    Route.belongsTo(models.stops, { foreignKey: 'destination', as: 'destinationStop' });

    // Relación con 'Company' (aunque 'company_id' ahora está en 'schedules')
    Route.hasMany(models.schedules, { foreignKey: 'route_id', as: 'schedules' });
  };

  return Route;
};
