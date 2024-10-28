const express = require('express');
const router = express.Router();
const routesController = require('../controllers/routesController');

router.get('/', routesController.getAllRoutes);
router.get('/:id', routesController.getRouteById);
router.post('/', routesController.createRoute);
router.put('/:id', routesController.updateRoute);
router.delete('/:id', routesController.deleteRoute);

module.exports = router;
