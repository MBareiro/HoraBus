const express = require('express');
const router = express.Router();
const routesController = require('../controllers/routesController');
const routeValidator = require('../validators/routeValidators');
const validationErrorHandler = require('../middleware/validationErrorHandler');

router.get('/', routesController.getAllRoutes);
router.get('/:id', routeValidator.getRouteByIdValidator , validationErrorHandler, routesController.getRouteById);
router.post('/', routeValidator.createRouteValidator , validationErrorHandler, routesController.createRoute);
router.put('/:id', routeValidator.updateRouteValidator , validationErrorHandler, routesController.updateRoute);
router.delete('/:id', routeValidator.deleteRouteValidator , validationErrorHandler, routesController.deleteRoute);

module.exports = router;
