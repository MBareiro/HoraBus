const express = require('express');
const router = express.Router();
const busesRoutes = require('./busesRoutes');
const companiesRoutes = require('./companiesRoutes');
const stopsRoutes = require('./stopsRoutes');
const routesRoutes = require('./routesRoutes');
const schedulesRoutes = require('./schedulesRoutes');
const usersRoutes = require('./usersRoutes');
const stopTimesRoutes = require('./stopTimesRoutes');
const routeStopsRoutes = require('./routeStopsRoutes');

router.use('/buses', busesRoutes);
router.use('/companies', companiesRoutes);
router.use('/stops', stopsRoutes);
router.use('/routes', routesRoutes);
router.use('/schedules', schedulesRoutes);
router.use('/users', usersRoutes);
router.use('/stop_times', stopTimesRoutes);
router.use('/route_stops', routeStopsRoutes);

module.exports = router;


