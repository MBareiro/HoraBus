module.exports = (sequelize, DataTypes) => {
  const Frequency = sequelize.define('frequency', {
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
    tableName: 'frequencies', // Nombre de la tabla en la base de datos
    timestamps: true, // Crea columnas createdAt y updatedAt automáticamente
  });

  // Relación inversa con Schedule
  Frequency.associate = (models) => {
    Frequency.hasMany(models.schedules, { foreignKey: 'frequency_id', as: 'schedules' });
  };

  return Frequency;
};

