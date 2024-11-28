module.exports = function(sequelize, DataTypes) {
  const Route = sequelize.define('routes', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    origin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stops',
        key: 'id'
      }
    },
    destination: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stops',
        key: 'id'
      }
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id'
      }
    }
  });

  // Relación con 'Stop' para 'origin' y 'destination'
  Route.associate = function(models) {
    Route.belongsTo(models.stops, { foreignKey: 'origin', as: 'originStop' });
    Route.belongsTo(models.stops, { foreignKey: 'destination', as: 'destinationStop' });
    Route.belongsTo(models.companies, { foreignKey: 'company_id', as: 'company' });
  };
  
  return Route;
};
