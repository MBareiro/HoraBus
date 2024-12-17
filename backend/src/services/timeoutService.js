const setGlobalTimeouts = (app) => {
    // Middleware para configurar el timeout general para todas las solicitudes entrantes
    app.use((req, res, next) => {
      req.setTimeout(5000, () => {
        console.log('La solicitud ha superado el tiempo de espera');
        res.status(408).send('Timeout de la solicitud');
      });
  
      res.setTimeout(5000, () => {
        console.log('La respuesta ha superado el tiempo de espera');
        res.status(504).send('Timeout de la respuesta');
      });
  
      next();
    });
  };
  
module.exports = { setGlobalTimeouts };
  