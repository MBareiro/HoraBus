// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../config/swaggerConfig');
const { authenticateDB, syncDB } = require('../config/db');
const routes = require('./routes');
const http = require('http'); 
const WebSocket = require('ws');
const { setupWebSocket } = require('./controllers/gpsController'); 
const app = express();
const server = http.createServer(app);
setupWebSocket(server);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { explorer: true }));
app.use('/api', routes);

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
