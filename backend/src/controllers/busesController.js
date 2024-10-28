
const db = require('../../db/models'); // Ajusta la ruta según tu estructura de carpetas
const Buses = db.buses; // Accede al modelo 'companies'
// Crear un nuevo bus
exports.createBus = async (req, res) => {
  
  try {
    const newBus = await Buses.create(req.body);
    return res.status(201).json(newBus);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obtener todos los buses
exports.getAllBuses = async (req, res) => {
  try {
    const allBuses = await Buses.findAll();
    return res.status(200).json(allBuses);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Obtener un bus por ID
exports.getBusById = async (req, res) => {
  try {
    const bus = await Buses.findByPk(req.params.id);
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
    return res.status(204).send(); // No content
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
