const db = require('../../db/models');
const Route = db.routes;
const Stop = db.stops;

// Obtener todas las rutas
exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.findAll();
    res.status(200).json(routes);
  } catch (error) {
    console.error('Error al obtener las rutas:', error);
    res.status(500).json({ error: 'Error al obtener las rutas.' });
  }
};

// Obtener una ruta por ID
exports.getRouteById = async (req, res) => {
  try {
    const route = await Route.findByPk(req.params.id);
    if (route) {
      res.status(200).json(route);
    } else {
      res.status(404).json({ error: 'Ruta no encontrada.' });
    }
  } catch (error) {
    console.error('Error al obtener la ruta:', error);
    res.status(500).json({ error: 'Error al obtener la ruta.' });
  }
};

// Crear una nueva ruta
exports.createRoute = async (req, res) => {
  const { company_id, origin, destination } = req.body;

  try {
    const newRoute = await Route.create({ company_id, origin, destination });
    res.status(201).json(newRoute);
  } catch (error) {
    console.error('Error al crear la ruta:', error);
    res.status(500).json({ error: 'Error al crear la ruta.', details: error.message });
  }
};

// Actualizar una ruta existente
exports.updateRoute = async (req, res) => {
  const { company_id, origin, destination } = req.body;

  try {
    const [updated] = await Route.update({ company_id, origin, destination }, {
      where: { id: req.params.id }
    });

    if (updated) {
      const updatedRoute = await Route.findByPk(req.params.id);
      res.status(200).json(updatedRoute);
    } else {
      res.status(404).json({ error: 'Ruta no encontrada.' });
    }
  } catch (error) {
    console.error('Error al actualizar la ruta:', error);
    res.status(500).json({ error: 'Error al actualizar la ruta.' });
  }
};

// Eliminar una ruta
exports.deleteRoute = async (req, res) => {
  try {
    const deleted = await Route.destroy({
      where: { id: req.params.id }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Ruta no encontrada.' });
    }
  } catch (error) {
    console.error('Error al eliminar la ruta:', error);
    res.status(500).json({ error: 'Error al eliminar la ruta.' });
  }
};

// Obtener las rutas donde el ID de la parada es el origen
exports.getRoutesFromStop = async (req, res) => {
  try {
    const stopId = req.params.id; 
    const stop = await Stop.findByPk(stopId);

    if (!stop) {
      return res.status(404).json({ message: `Parada con ID ${stopId} no encontrada` });
    }
    const routes = await Route.findAll({
      where: { origin: stopId },
      include: [
        {
          model: Stop,
          as: 'originStop'
        },
        {
          model: Stop,
          as: 'destinationStop'
        }
      ]
    });

    if (routes.length === 0) {
      return res.status(404).json({ message: `No se encontraron rutas desde la parada con ID ${stopId}` });
    }

    return res.status(200).json(routes);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};
