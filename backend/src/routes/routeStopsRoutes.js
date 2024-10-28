const express = require('express');
const router = express.Router();
const routeStopsController = require('../controllers/routeStopsController'); // Ajusta la ruta según tu estructura de carpetas

// Rutas para 'route_stops'
router.get('/', routeStopsController.getAllRouteStops); // Obtener todas las paradas de rutas
router.get('/:id', routeStopsController.getRouteStopById); // Obtener una parada de ruta por ID
router.post('/', routeStopsController.createRouteStop); // Crear una nueva parada de ruta
router.put('/:id', routeStopsController.updateRouteStop); // Actualizar una parada de ruta
router.delete('/:id', routeStopsController.deleteRouteStop); // Eliminar una parada de ruta

module.exports = router;
