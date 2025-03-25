module.exports = (sequelize, DataTypes) => {
    const Subscription = sequelize.define('subscription', {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    });
  
    return Subscription;
  };
  