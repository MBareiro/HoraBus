module.exports = function (sequelize, DataTypes) {
  const Stop = sequelize.define('stops', {
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
          msg: 'El nombre de la parada es obligatorio.'
        },
        isLength: {
          args: [3],
          msg: 'El nombre de la parada debe tener al menos 3 caracteres.'
        }
      }
    },
    location: {
      type: DataTypes.GEOMETRY('POINT'),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['enabled', 'disabled']],
          msg: 'El estado debe ser "enabled" o "disabled".'
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

  Stop.associate = function (models) {
    // Relación muchos a muchos con Company
    Stop.belongsToMany(models.companies, {
      through: 'companies_stops',
      foreignKey: 'stop_id',
      otherKey: 'company_id',
      as: 'companies' // Alias consistente con las consultas
    });
  };

  return Stop;
};
