const express = require('express');
const http = require('http');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const { authenticateDB, syncDB } = require('../config/db');
const swaggerDocs = require('../config/swaggerConfig');
const routes = require('./routes');
const setupMiddlewares = require('./middleware/security');
const limiter = require('../config/rateLimit');
const { setupWebSocket } = require('./controllers/gpsController');
const { setGlobalTimeouts } = require('./services/timeoutService');
const { limitPayloadSize } = require('./services/payloadSizeService');

const app = express();
const server = http.createServer(app);

// Tiempo de espera para mantener la conexión abierta
server.keepAliveTimeout = 30 * 1000;  // 30 segundos (keep-alive)
server.headersTimeout = 35 * 1000;    // 35 segundos para recibir los encabezados completos

// Configuración de middlewares
setupMiddlewares(app);
app.use(limiter);
app.use(morgan('dev'));
app.use(limitPayloadSize); // Limitar tamaño de payload

// Configuración de rutas y documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', routes);

// Configuración de timeouts globales para todas las solicitudes
setGlobalTimeouts(app);

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
