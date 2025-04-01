module.exports = function (sequelize, DataTypes) {
  const Role = sequelize.define('roles', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    tableName: 'roles',
    timestamps: false,
  });

  Role.associate = function (models) {
    Role.hasMany(models.users, { foreignKey: 'role_id', as: 'users' });
  };

  return Role;
};
