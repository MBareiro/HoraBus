const express = require('express');
const morgan = require('morgan');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../config/swaggerConfig');
const { authenticateDB, syncDB } = require('../config/db');
const routes = require('./routes');
const setupMiddlewares = require('./middleware/security');
const limiter = require('../config/rateLimit');
const { setupWebSocket } = require('./controllers/gpsController');

const app = express();
const server = http.createServer(app);

// Configuración de middlewares
setupMiddlewares(app);
app.use(limiter);
app.use(morgan('dev'));

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas
app.use('/api', routes);

// WebSocket
setupWebSocket(server);

// Conexión a la base de datos
const PORT = process.env.PORT || 3000;

authenticateDB()
  .then(syncDB)
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Servidor en ejecución en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al conectar o sincronizar la base de datos:', err);
    process.exit(1);
  });

module.exports = app;
