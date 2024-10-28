const express = require('express');
const router = express.Router();
const busesRoutes = require('./busesRoutes');
const companiesRoutes = require('./companiesRoutes');
const stopsRoutes = require('./stopsRoutes'); // Importa las rutas de paradas

router.use('/buses', busesRoutes);
router.use('/companies', companiesRoutes);
router.use('/stops', stopsRoutes); // Agrega las rutas de paradas

module.exports = router;
