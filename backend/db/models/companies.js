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
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  });

  Company.associate = function(models) {
    // Relación muchos a muchos con Stop
    Company.belongsToMany(models.stops, {
      through: 'companies_stops',
      foreignKey: 'company_id',
      otherKey: 'stop_id',
      as: 'stops'
    });
  };

  return Company;
};
