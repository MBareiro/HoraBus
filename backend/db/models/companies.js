module.exports = function(sequelize, DataTypes) {
  const Company = sequelize.define('companies', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  });

  Company.associate = function(models) {
    // Relación con buses
    Company.hasMany(models.buses, { foreignKey: 'company_id', as: 'buses' });
    // Relación con rutas
    Company.hasMany(models.routes, { foreignKey: 'company_id', as: 'routes' });
  };

  return Company;
};
