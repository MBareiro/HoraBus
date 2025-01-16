const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs'); // Importar bcrypt para hashear contraseñas

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    'users',
    {
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
      role: {
        type: DataTypes.ENUM('Administrator', 'Operator', 'Driver', 'User'),
        allowNull: false,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },      
    },
    {
      sequelize,
      tableName: 'users',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    }
  );

  // Hook para hashear la contraseña antes de crear el usuario
  User.beforeCreate(async (user, options) => {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10); // Hashea la contraseña
    }
  });

  // Hook para hashear la contraseña antes de actualizar si cambió
  User.beforeUpdate(async (user, options) => {
    if (user.changed('password')) {
      const isAlreadyHashed = user.password.startsWith('$2a$'); // Verifica si ya está hasheada
      if (!isAlreadyHashed) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  });

  User.beforeSave(async (user, options) => {
    if (user.changed('password')) {
      const isAlreadyHashed = user.password.startsWith('$2a$'); // Verifica si ya está hasheada
      if (!isAlreadyHashed) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    }
  });

  return User;
};
