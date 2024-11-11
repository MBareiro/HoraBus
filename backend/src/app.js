// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../config/swaggerConfig');
const { authenticateDB, syncDB } = require('../config/db'); 
const routes = require('./routes'); 

const app = express();

app.use(cors()); // Habilita CORS
app.use(bodyParser.json()); // Parseo de JSON en las peticiones
app.use(bodyParser.urlencoded({ extended: true })); // Parseo de datos urlencoded

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api', routes); // Prefijo para las rutas de la API

const PORT = process.env.PORT || 3000;

// Conexión a la base de datos y sincronización
authenticateDB()
  .then(() => syncDB()) // Sincronización de los modelos
  .then(() => {
    // Inicia el servidor
    app.listen(PORT, () => {
      console.log(`Servidor en ejecución en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar o sincronizar la base de datos:', err);
    process.exit(1); 
  });

module.exports = app; 
