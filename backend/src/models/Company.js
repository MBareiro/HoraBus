const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definir el modelo Company
const Company = sequelize.define('Company', {
  // Definición de columnas
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Otras opciones del modelo
  tableName: 'companies', // Nombre de la tabla en la base de datos
  timestamps: true,   // Agrega campos createdAt y updatedAt
});

module.exports = Company;