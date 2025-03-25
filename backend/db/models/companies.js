module.exports = function (sequelize, DataTypes) {
  const Company = sequelize.define('companies', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'El nombre de la empresa es obligatorio.'
        },
        isLength: {
          args: [3],
          msg: 'El nombre de la empresa debe tener al menos 3 caracteres.'
        }
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW // Valor por defecto para la fecha de creación
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW // Valor por defecto para la fecha de actualización
    }
  });

  Company.associate = function (models) {
    // Relación muchos a muchos con Stop
    Company.belongsToMany(models.stops, {
      through: 'companies_stops',
      foreignKey: 'company_id',
      otherKey: 'stop_id',
      as: 'stops' // Alias consistente con las consultas
    });
  };

  return Company;
};
