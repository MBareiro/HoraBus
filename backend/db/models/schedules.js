module.exports = function (sequelize, DataTypes) {
  const Schedule = sequelize.define(
    'schedules',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      departure_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      arrival_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('on_time', 'delayed', 'canceled'),
        allowNull: false,
        defaultValue: 'on_time',
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      route_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'routes',
          key: 'id',
        },
      },
      frequency_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'frequencies',
          key: 'id',
        },
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id',
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        onUpdate: sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );

  // Definir asociaciones
  Schedule.associate = function (models) {
    Schedule.belongsTo(models.routes, { foreignKey: 'route_id', as: 'route' });
    Schedule.belongsTo(models.frequencies, { foreignKey: 'frequency_id', as: 'frequency' });
    Schedule.belongsTo(models.companies, { foreignKey: 'company_id', as: 'company' });
  };

  return Schedule;
};
