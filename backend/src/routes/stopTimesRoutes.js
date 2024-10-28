const express = require('express');
const router = express.Router();
const stopTimesController = require('../controllers/stopTimesController');

// Rutas para stop times
router.get('/', stopTimesController.getAllStopTimes);
router.get('/:id', stopTimesController.getStopTimeById);
router.post('/', stopTimesController.createStopTime);
router.put('/:id', stopTimesController.updateStopTime);
router.delete('/:id', stopTimesController.deleteStopTime);

module.exports = router;
