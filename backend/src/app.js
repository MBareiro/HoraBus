// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../config/swaggerConfig');
const { authenticateDB, syncDB } = require('../config/db');
const routes = require('./routes');
const http = require('http'); // Necesario para usar WebSockets
const WebSocket = require('ws');
const { setupWebSocket } = require('./controllers/gpsController'); // Importar configuración WebSocket

// Crear una instancia de Express
const app = express();

// Crear servidor HTTP a partir de Express (para WebSocket)
const server = http.createServer(app);

// Configurar WebSocket
setupWebSocket(server); // Asegúrate de configurar WebSocket con el servidor

// Middleware para configurar CORS y el parseo de JSON
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar la documentación de la API (Swagger)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));

// Usar las rutas de la API
app.use('/api', routes);

// Definir el puerto
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos y sincronización
authenticateDB()
  .then(() => syncDB()) // Sincronización de los modelos
  .then(() => {
    // Inicia el servidor HTTP (y WebSocket)
    server.listen(PORT, () => {
      console.log(`Servidor en ejecución en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar o sincronizar la base de datos:', err);
    process.exit(1); // Terminar el proceso si hay error
  });

module.exports = app;
