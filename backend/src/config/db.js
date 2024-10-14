// src/config/db.js
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config(); 
// Conectar a la base de datos usando Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql',
});

// Probar la conexión a la base de datos
sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa.'))
  .catch(err => console.error('No se pudo conectar a la base de datos:', err));

  // Sincronizar modelos con la base de datos
sequelize.sync({ force: true }) // Cambia a true si deseas eliminar y recrear la tabla
.then(() => {
  console.log('Modelos sincronizados con la base de datos.');
})
.catch(err => {
  console.error('Error al sincronizar la base de datos:', err);
});

module.exports = sequelize;
