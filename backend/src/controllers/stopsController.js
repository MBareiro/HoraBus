const db = require('../../db/models');
const Stop = db.stops; 

// Obtener todas las paradas
exports.getAllStops = async (req, res) => {
  try {
    const stops = await Stop.findAll();
    res.status(200).json(stops);
  } catch (error) {
    console.error('Error al obtener las paradas:', error);
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
    console.error('Error al obtener la parada:', error);
    res.status(500).json({ error: 'Error al obtener la parada.' });
  }
};

// Crear una nueva parada
exports.createStop = async (req, res) => {
  const { name, latitude, longitude } = req.body; 
  
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitud y longitud son requeridos.' });
  }

  try {
    const existingStop = await Stop.findOne({ where: { name } });
    if (existingStop) {
      return res.status(409).json({ message: 'La parada ya existe.' });
    }

    // Crear el nuevo objeto GEOGRAPHY
    const newStop = await Stop.create({
      name,
      location: db.sequelize.fn('ST_GeomFromText', `POINT(${longitude} ${latitude})`)
    });

    res.status(201).json(newStop);
  } catch (error) {
    console.error('Error al crear la parada:', error);
    res.status(500).json({ error: 'Error al crear la parada.', details: error.message });
  }
};

// Actualizar una parada existente
exports.updateStop = async (req, res) => {
  const { name, latitude, longitude } = req.body; // Obtener latitud y longitud

  if (latitude && longitude) {
    try {
      // Actualizar las coordenadas si están presentes
      const [updated] = await Stop.update(
        { 
          name, 
          location: db.sequelize.fn('ST_GeomFromText', `POINT(${longitude} ${latitude})`)
        },
        { where: { id: req.params.id } }
      );

      if (updated) {
        const updatedStop = await Stop.findByPk(req.params.id);
        res.status(200).json(updatedStop);
      } else {
        res.status(404).json({ error: 'Parada no encontrada.' });
      }
    } catch (error) {
      console.error('Error al actualizar la parada:', error);
      res.status(500).json({ error: 'Error al actualizar la parada.' });
    }
  } else {
    try {
      // Solo actualizar el nombre si no hay nuevas coordenadas
      const [updated] = await Stop.update(
        { name },
        { where: { id: req.params.id } }
      );

      if (updated) {
        const updatedStop = await Stop.findByPk(req.params.id);
        res.status(200).json(updatedStop);
      } else {
        res.status(404).json({ error: 'Parada no encontrada.' });
      }
    } catch (error) {
      console.error('Error al actualizar la parada:', error);
      res.status(500).json({ error: 'Error al actualizar la parada.' });
    }
  }
};

// Eliminar una parada
exports.deleteStop = async (req, res) => {
  try {
    const deleted = await Stop.destroy({ where: { id: req.params.id } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Parada no encontrada.' });
    }
  } catch (error) {
    console.error('Error al eliminar la parada:', error);
    res.status(500).json({ error: 'Error al eliminar la parada.' });
  }
};
