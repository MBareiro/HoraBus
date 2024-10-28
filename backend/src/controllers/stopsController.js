const db = require('../../db/models');
const Stop = db.stops; // Accede al modelo 'stops'

// Obtener todas las paradas
exports.getAllStops = async (req, res) => {
    try {
        const stops = await Stop.findAll();
        res.status(200).json(stops);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las paradas.' });
    }
};

// Obtener una parada por ID
exports.getStopById = async (req, res) => {
    try {
        const stop = await Stop.findByPk(req.params.id);
        if (stop) {
            res.status(200).json(stop);
        } else {
            res.status(404).json({ error: 'Parada no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la parada.' });
    }
};

// Crear una nueva parada
exports.createStop = async (req, res) => {
    const { name } = req.body;
    try {
        const newStop = await Stop.create({ name });
        res.status(201).json(newStop);
    } catch (error) {
        console.error('Error al crear la parada:', error);
        res.status(500).json({ error: 'Error al crear la parada.', details: error.message });
    }
};

// Actualizar una parada existente
exports.updateStop = async (req, res) => {
    const { name } = req.body;
    try {
        const [updated] = await Stop.update({ name }, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedStop = await Stop.findByPk(req.params.id);
            res.status(200).json(updatedStop);
        } else {
            res.status(404).json({ error: 'Parada no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la parada.' });
    }
};

// Eliminar una parada
exports.deleteStop = async (req, res) => {
    try {
        const deleted = await Stop.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Parada no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la parada.' });
    }
};
