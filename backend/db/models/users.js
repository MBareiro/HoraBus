const bcrypt = require('bcryptjs');

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    dni: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [8, 20],
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [8, 255],
      },
    },
    role_id: {  // Ahora usa una clave foránea a la tabla roles
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'roles',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'companies',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  }, {
    tableName: 'users',
    timestamps: true,
  });

  User.associate = function (models) {
    User.belongsTo(models.roles, { foreignKey: 'role_id', as: 'role' });
    User.belongsTo(models.companies, { foreignKey: 'company_id', as: 'company' });
  };

  // Hooks para hashear la contraseña antes de guardar
  User.beforeSave(async (user) => {
    if (user.changed('password')) {
      const isAlreadyHashed = user.password.startsWith('$2a$');
      if (!isAlreadyHashed) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  });

  return User;
};
