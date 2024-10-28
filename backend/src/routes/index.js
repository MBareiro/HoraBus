const express = require('express');
const router = express.Router();
const busesRoutes = require('./busesRoutes');
const companiesRoutes = require('./companiesRoutes');
const stopsRoutes = require('./stopsRoutes');
const routesRoutes = require('./routesRoutes');

router.use('/buses', busesRoutes);
router.use('/companies', companiesRoutes);
router.use('/stops', stopsRoutes);
router.use('/routes', routesRoutes);

module.exports = router;
