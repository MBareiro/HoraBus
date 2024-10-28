const db = require('../../db/models'); // Ajusta la ruta según tu estructura de carpetas
const RouteStop = db.route_stops; // Accede al modelo 'route_stops'

// Obtener todas las paradas de rutas
exports.getAllRouteStops = async (req, res) => {
    try {
        const routeStops = await RouteStop.findAll();
        res.status(200).json(routeStops);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las paradas de rutas.' });
    }
};

// Obtener una parada de ruta por ID
exports.getRouteStopById = async (req, res) => {
    try {
        const routeStop = await RouteStop.findByPk(req.params.id);
        if (routeStop) {
            res.status(200).json(routeStop);
        } else {
            res.status(404).json({ error: 'Parada de ruta no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la parada de ruta.' });
    }
};

// Crear una nueva parada de ruta
exports.createRouteStop = async (req, res) => {
    const { route_id, stop_id, stop_order } = req.body;
    try {
        const newRouteStop = await RouteStop.create({ route_id, stop_id, stop_order });
        res.status(201).json(newRouteStop);
    } catch (error) {
        console.error('Error al crear la parada de ruta:', error); // Log del error en la consola
        res.status(500).json({ error: 'Error al crear la parada de ruta.', details: error.message });
    }
};

// Actualizar una parada de ruta existente
exports.updateRouteStop = async (req, res) => {
    const { route_id, stop_id, stop_order } = req.body;
    try {
        const [updated] = await RouteStop.update({ route_id, stop_id, stop_order }, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedRouteStop = await RouteStop.findByPk(req.params.id);
            res.status(200).json(updatedRouteStop);
        } else {
            res.status(404).json({ error: 'Parada de ruta no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la parada de ruta.' });
    }
};

// Eliminar una parada de ruta
exports.deleteRouteStop = async (req, res) => {
    try {
        const deleted = await RouteStop.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Parada de ruta no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la parada de ruta.' });
    }
};
