const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('../config/db'); // conexión de Sequelize
const db = require('../db/models');

const routes = require('./routes'); 

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/api', routes); // Prefijo para las rutas de la API

// Iniciar la conexión a la base de datos y el servidor
const PORT = process.env.PORT || 3000;
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida correctamente.');
        app.listen(PORT, () => {
            console.log(`Servidor en ejecución en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('No se pudo conectar a la base de datos:', err);
    });

    db.sequelize.sync({ force: false }) // Cambia a true si quieres eliminar las tablas y recrearlas
  .then(() => {
    console.log('Base de datos sincronizada.');
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });


module.exports = app; // Exportar la aplicación para pruebas
