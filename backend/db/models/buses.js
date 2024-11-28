module.exports = function(sequelize, DataTypes) {
  const Bus = sequelize.define('buses', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'companies',
        key: 'id'
      }
    },
    line: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    bus_type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    route_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'routes',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'buses',
    timestamps: true
  });

  // Relación con 'Company' y 'Route'
  Bus.associate = function(models) {
    Bus.belongsTo(models.companies, { foreignKey: 'company_id', as: 'company' });
    Bus.belongsTo(models.routes, { foreignKey: 'route_id', as: 'route' });
  };

  return Bus;
};
