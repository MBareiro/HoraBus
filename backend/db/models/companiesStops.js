module.exports = function (sequelize, DataTypes) {
    const CompaniesStops = sequelize.define('companies_stops', {
      stop_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'stops',
          key: 'id'
        }
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id'
        }
      }
    });
  
    return CompaniesStops;
  };
  