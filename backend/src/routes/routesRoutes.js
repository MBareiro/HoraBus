const express = require('express');
const router = express.Router();
const routesController = require('../controllers/routesController');
const routeValidator = require('../validators/routeValidators');
const validationErrorHandler = require('../middleware/validationErrorHandler');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken(['Administrator']), routesController.getAllRoutes);
router.get('/:id', verifyToken(['Administrator']), routeValidator.getRouteByIdValidator , validationErrorHandler, routesController.getRouteById);
router.post('/', verifyToken(['Administrator']), routeValidator.createRouteValidator , validationErrorHandler, routesController.createRoute);
router.put('/:id', verifyToken(['Administrator']), routeValidator.updateRouteValidator , validationErrorHandler, routesController.updateRoute);
router.delete('/:id', verifyToken(['Administrator']), routeValidator.deleteRouteValidator , validationErrorHandler, routesController.deleteRoute);

module.exports = router;
