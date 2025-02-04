module.exports = function(sequelize, DataTypes) {
  const Stop = sequelize.define('stops', {
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
    location: {
      type: DataTypes.GEOGRAPHY('POINT'),
      allowNull: true
    },
    state: {
      type: DataTypes.ENUM('enabled', 'disabled'),
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

  Stop.associate = function(models) {
    // Relación muchos a muchos con Company
    Stop.belongsToMany(models.companies, {
      through: 'companies_stops',
      foreignKey: 'stop_id',
      otherKey: 'company_id',
      as: 'companies'
    });
  };

  return Stop;
};
