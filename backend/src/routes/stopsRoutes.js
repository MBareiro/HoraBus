const express = require('express');
const router = express.Router();
const stopsController = require('../controllers/stopsController');

// Rutas para las paradas
router.get('/', stopsController.getAllStops);
router.get('/:id', stopsController.getStopById);
router.post('/', stopsController.createStop);
router.put('/:id', stopsController.updateStop);
router.delete('/:id', stopsController.deleteStop);

module.exports = router;
