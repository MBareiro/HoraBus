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
        len: {
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
      defaultValue: "enabled", 
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
      defaultValue: DataTypes.NOW 
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW 
    }
  });

  Stop.associate = function (models) {
    Stop.belongsToMany(models.companies, {
      through: 'companies_stops',
      foreignKey: 'stop_id',
      otherKey: 'company_id',
      as: 'companies'
    });
  };

  return Stop;
};
