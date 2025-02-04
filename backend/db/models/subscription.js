module.exports = (sequelize, DataTypes) => {
    const Subscription = sequelize.define('Subscription', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    });
  
    return Subscription;
  };
  