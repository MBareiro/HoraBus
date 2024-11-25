const db = require('../../db/models');
const Buses = db.buses;
const Routes = db.routes;
const Stops = db.stops;
const Companies = db.companies;

// Crear un nuevo bus
exports.createBus = async (req, res) => {
  try {
    const newBus = await Buses.create(req.body);
    return res.status(201).json(newBus);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obtener todos los buses// Obtener todos los buses
exports.getAllBuses = async (req, res) => {
  try {
    const allBuses = await Buses.findAll({
      include: [
        { model: Companies, as: 'company', attributes: ['name'] },
        { model: Routes, as: 'route', attributes: ['origin', 'destination'] }
      ]
    });
    return res.status(200).json(allBuses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


// Obtener un bus por ID
exports.getBusById = async (req, res) => {
  try {
    const bus = await Buses.findByPk(req.params.id, {
      include: [
        { model: Companies, as: 'company', attributes: ['name'] },
        { model: Routes, as: 'route', attributes: ['origin', 'destination'] }
      ]
    });
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    return res.status(200).json(bus);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Actualizar un bus
exports.updateBus = async (req, res) => {
  try {
    const [updated] = await Buses.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    const updatedBus = await Buses.findByPk(req.params.id);
    return res.status(200).json(updatedBus);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Eliminar un bus
exports.deleteBus = async (req, res) => {
  try {
    const deleted = await Buses.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getBusesByRoute = async (req, res) => {
  const { origin, destination } = req.query;

  try {
    // Buscar IDs de las paradas de origen y destino basados en los parámetros de consulta
    const originStop = await Stops.findOne({ where: { name: origin } });
    const destinationStop = await Stops.findOne({ where: { name: destination } });
    
    if (!originStop || !destinationStop) {
      return res.status(404).json({ message: 'Origen o destino no encontrado' });
    }

    // Consultar rutas que conectan las paradas de origen y destino
    const routes = await Routes.findAll({
      where: {
        origin: originStop.id,
        destination: destinationStop.id
      },
      include: [
        {
          model: Buses, // Relación entre rutas y buses
          as: 'buses', // Aquí se especifica el alias 'buses'
          include: [
            {
              model: Companies,
              as: 'company', // Especifica el alias correcto para la relación
              attributes: ['name']
            }
          ]
        }
      ]
    });

    if (routes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron rutas para esta combinación de origen y destino' });
    }

    // Devolver las rutas encontradas
    res.status(200).json(routes);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};







