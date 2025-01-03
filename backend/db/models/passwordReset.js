module.exports = function (sequelize, DataTypes) {
    const PasswordReset = sequelize.define('password_resets', {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      reset_password_token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      reset_password_expiration: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  
    PasswordReset.associate = function (models) {
      // Relación con usuarios
      PasswordReset.belongsTo(models.users, { foreignKey: 'user_id', as: 'user' });
    };
  
    return PasswordReset;
  };
  