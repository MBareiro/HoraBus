// src/routes/busesRoutes.js
const express = require('express');
const router = express.Router();
const busesController = require('../controllers/busesController');

// Rutas para los buses
router.post('/', busesController.createBus); // Crear un bus
router.get('/', busesController.getAllBuses); // Obtener todos los buses
router.get('/:id', busesController.getBusById); // Obtener un bus por ID
router.put('/:id', busesController.updateBus); // Actualizar un bus
router.delete('/:id', busesController.deleteBus); // Eliminar un bus

module.exports = router;
