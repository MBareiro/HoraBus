const { Sequelize } = require('sequelize');
const config = require('./config')[process.env.NODE_ENV || 'development']; // Selecciona configuración según el entorno

// Crear una nueva instancia de Sequelize con la configuración
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  logging: config.logging || false, // Habilitar/deshabilitar logs de consultas SQL
  dialectOptions: config.dialectOptions, // Opciones adicionales de dialecto si es necesario
  dialectModule: require('mysql2'), 
  port: process.env.DB_PORT || 3306,

});

// Función para autenticar la conexión a la base de datos
const authenticateDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw new Error('No se pudo establecer la conexión con la base de datos.');
  }
};

// Función para sincronizar los modelos de Sequelize con la base de datos
const syncDB = async () => {
  try {
    // Sincroniza los modelos (elimina las tablas y las recrea si usas `force: true`)
    await sequelize.sync({ force: true }); // Cambia a `force: true` para eliminar y recrear las tablas
    console.log('Base de datos sincronizada correctamente.');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
    throw new Error('No se pudo sincronizar la base de datos.');
  }
};

// Exportar la instancia de Sequelize y las funciones de conexión y sincronización
module.exports = {
  sequelize,
  authenticateDB,
  syncDB,
};
