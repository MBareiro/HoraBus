// src/controllers/gpsController.js
const WebSocket = require('ws');
let wss; // WebSocket server instance

// Establecer WebSocket server
const setupWebSocket = (server) => {
  wss = new WebSocket.Server({ server });

  // Escuchar nuevas conexiones WebSocket
  wss.on('connection', (ws) => {
    console.log('Nuevo cliente conectado');
    ws.send(JSON.stringify({ message: 'Conectado al servidor WebSocket' }));
  });
};

// Endpoint para recibir coordenadas del GPS y enviarlas a los clientes WebSocket
const receiveCoordinates = (req, res) => {
  const { latitude, longitude } = req.body;
  
  // Validar que las coordenadas estén presentes
  if (!latitude || !longitude) {
    return res.status(400).send({ message: 'Faltan coordenadas' });
  }

  // Enviar las coordenadas a todos los clientes conectados
  if (wss && wss.clients) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify({ latitude, longitude }));
      }
    });
  }

  // Responder que las coordenadas fueron recibidas
  res.status(200).send({ message: 'Coordenadas enviadas a los clientes' });
};

module.exports = {
  setupWebSocket,
  receiveCoordinates,
};
