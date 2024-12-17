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

// Tiempo de espera para mantener la conexión abierta
server.keepAliveTimeout = 30 * 1000;  // 30 segundos (keep-alive)
server.headersTimeout = 35 * 1000;    // 35 segundos para recibir los encabezados completos

// Configuración de middlewares
setupMiddlewares(app);
app.use(limiter);
app.use(morgan('dev'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', routes);

// Middleware para configurar el timeout general para todas las solicitudes entrantes
app.use((req, res, next) => {
  // Establecer un timeout global para las solicitudes entrantes (por ejemplo, 5 segundos)
  req.setTimeout(5000, () => {
    console.log('La solicitud ha superado el tiempo de espera');
    res.status(408).send('Timeout de la solicitud');  // 408: Request Timeout
  });
  // Establecer un timeout global para las respuestas del servidor (por ejemplo, 5 segundos)
  res.setTimeout(5000, () => {
    console.log('La respuesta ha superado el tiempo de espera');
    res.status(504).send('Timeout de la respuesta');  // 504: Gateway Timeout
  });
  next();  
});

const limitPayloadSize = (req, res, next) => {
  const MAX_PAYLOAD_SIZE = 1024 * 1024; // 1MB
  if (req.headers['content-length'] && parseInt(req.headers['content-length']) > MAX_PAYLOAD_SIZE) {
    return res.status(413).json({ error: 'Payload size exceeds the limit' });
  }
  next();
}

app.use(limitPayloadSize);

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
