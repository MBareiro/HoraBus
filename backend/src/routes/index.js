// src/routes/index.js
const express = require('express');
const router = express.Router();

const busesRoutes = require('./busesRoutes');
const companiesRoutes = require('./companiesRoutes');

//const routesRoutes = require('./routes');
//const stopsRoutes = require('./stops');

router.use('/buses', busesRoutes);
router.use('/companies', companiesRoutes);

module.exports = router;
