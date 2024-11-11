const Sequelize = require('sequelize');
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
  }, {
    sequelize,
    tableName: 'companies',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });

  // Relación: Una compañía tiene muchos buses
  Company.associate = function(models) {
    Company.hasMany(models.buses, { foreignKey: 'company_id', as: 'buses' });
  };

  return Company;
};
