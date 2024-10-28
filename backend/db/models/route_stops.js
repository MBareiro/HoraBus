const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('route_stops', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    route_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'routes',
        key: 'id'
      }
    },
    stop_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'stops',
        key: 'id'
      }
    },
    stop_order: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'route_stops',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "route_id",
        using: "BTREE",
        fields: [
          { name: "route_id" },
        ]
      },
      {
        name: "stop_id",
        using: "BTREE",
        fields: [
          { name: "stop_id" },
        ]
      },
    ]
  });
};
