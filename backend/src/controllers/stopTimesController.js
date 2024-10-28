const db = require('../../db/models');
const StopTime = db.stop_times;

// Obtener todos los stop times
exports.getAllStopTimes = async (req, res) => {
    try {
        const stopTimes = await StopTime.findAll();
        res.status(200).json(stopTimes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los tiempos de parada.', details: error.message });
    }
};

// Obtener un stop time por ID
exports.getStopTimeById = async (req, res) => {
    try {
        const stopTime = await StopTime.findByPk(req.params.id);
        if (stopTime) {
            res.status(200).json(stopTime);
        } else {
            res.status(404).json({ error: 'Tiempo de parada no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el tiempo de parada.', details: error.message });
    }
};

// Crear un nuevo stop time
exports.createStopTime = async (req, res) => {
    const { schedule_id, stop_id, arrival_time } = req.body;
    try {
        const newStopTime = await StopTime.create({ schedule_id, stop_id, arrival_time });
        res.status(201).json(newStopTime);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el tiempo de parada.', details: error.message });
    }
};

// Actualizar un stop time existente
exports.updateStopTime = async (req, res) => {
    const { schedule_id, stop_id, arrival_time } = req.body;
    try {
        const [updated] = await StopTime.update({ schedule_id, stop_id, arrival_time }, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedStopTime = await StopTime.findByPk(req.params.id);
            res.status(200).json(updatedStopTime);
        } else {
            res.status(404).json({ error: 'Tiempo de parada no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el tiempo de parada.', details: error.message });
    }
};

// Eliminar un stop time
exports.deleteStopTime = async (req, res) => {
    try {
        const deleted = await StopTime.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Tiempo de parada no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el tiempo de parada.', details: error.message });
    }
};
