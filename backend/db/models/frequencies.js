module.exports = (sequelize, DataTypes) => {
  const Frequency = sequelize.define('frequencies', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'frequencies', 
    timestamps: true,
  });

  // Relación inversa con Schedule
  Frequency.associate = (models) => {
    Frequency.hasMany(models.schedules, { foreignKey: 'frequency_id', as: 'schedules' });
  };

  return Frequency;
};

