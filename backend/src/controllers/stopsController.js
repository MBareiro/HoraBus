const db = require('../../db/models');
const Stop = db.stops; 
const { stops, routes, schedules, companies } = db;


exports.getAllStops = async (req, res) => {
  try {
    const stopsList = await stops.findAll({
      attributes: ['id', 'name', 'location', 'state']
    });

    return res.status(200).json({ stops: stopsList });
  } catch (error) {
    console.error('Error al obtener todas las paradas:', error);
    return res.status(500).json({ message: 'Error al obtener las paradas.' });
  }
};

exports.getStopById = async (req, res) => {
  console.log("abbbbb");
  
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

exports.createStop = async (req, res) => {
  const { name, location, state } = req.body;

  // Validar que el objeto location y sus propiedades existan
  if (!location || typeof location.latitude === 'undefined' || typeof location.longitude === 'undefined') {
    return res.status(400).json({ error: 'El objeto "location" con propiedades "latitude" y "longitude" es requerido.' });
  }

  // Validar el estado
  const validStates = ["enabled", "disabled"];
  if (state && !validStates.includes(state)) {
    return res.status(400).json({ error: 'Estado inválido. Use "enabled" o "disabled".' });
  }

  const { latitude, longitude } = location;

  try {
    // Verificar si ya existe una parada con el mismo nombre
    const existingStopByName = await Stop.findOne({ where: { name } });
    if (existingStopByName) {
      return res.status(409).json({ message: 'La parada ya existe con este nombre.' });
    }

    // Verificar si ya existe una parada con las mismas coordenadas
    const existingStopByCoords = await Stop.findOne({
      where: db.sequelize.where(
        db.sequelize.fn('ST_Equals', db.sequelize.col('location'), db.sequelize.fn('ST_GeomFromText', `POINT(${longitude} ${latitude})`)),
        true
      ),
    });

    if (existingStopByCoords) {
      return res.status(409).json({ message: 'Ya existe una parada en estas coordenadas.' });
    }

    // Crear el nuevo objeto GEOGRAPHY utilizando el formato WKT: "POINT(longitude latitude)"
    const newStop = await Stop.create({
      name,
      location: db.sequelize.fn('ST_GeomFromText', `POINT(${longitude} ${latitude})`),
      state: state || "enabled", // Establecer el estado a "enabled" por defecto
    });

    res.status(201).json(newStop);
  } catch (error) {
    console.error('Error al crear la parada:', error);
    res.status(500).json({ error: 'Error al crear la parada.', details: error.message });
  }
};


exports.updateStop = async (req, res) => {
  const { name, latitude, longitude, state } = req.body; 

  // Validar el estado si se proporciona
  const validStates = ["enabled", "disabled"];
  if (state && !validStates.includes(state)) {
    return res.status(400).json({ error: 'Estado inválido. Use "enabled" o "disabled".' });
  }

  if (latitude && longitude) {
    try {
      // Actualizar las coordenadas y el estado si se proporcionan
      const [updated] = await Stop.update(
        { 
          name, 
          location: db.sequelize.fn('ST_GeomFromText', `POINT(${longitude} ${latitude})`),
          state: state || undefined  // Actualizar el estado si se proporciona
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
      // Solo actualizar el nombre y el estado si no hay nuevas coordenadas
      const [updated] = await Stop.update(
        { name, state: state || undefined },
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

exports.updateStopState = async (req, res) => {
  const { id } = req.params;
  const { state } = req.body;

  // Validar que el estado sea válido
  const validStates = ["enabled", "disabled"];
  if (!validStates.includes(state)) {
    return res.status(400).json({ error: "Estado inválido. Use 'enabled' o 'disabled'." });
  }

  try {
    const stop = await Stop.findByPk(id);
    if (!stop) {
      return res.status(404).json({ error: "Parada no encontrada." });
    }

    stop.state = state;
    await stop.save();

    res.status(200).json({ message: "Estado actualizado correctamente.", stop });
  } catch (error) {
    console.error("Error al actualizar el estado de la parada:", error);
    res.status(500).json({ error: "Error en el servidor.", details: error.message });
  }
};

exports.getAvailableOrigins = async (req, res) => {
  try {
    const origins = await stops.findAll({
      attributes: ['id', 'name'],
      include: [
        {
          model: routes,
          as: 'originRoutes', // 🔹 Alias de la relación con stops
          required: true,
          attributes: [],
          include: [
            {
              model: schedules,
              as: 'schedules', // 🔹 Usa el alias correcto de la relación en routes.js
              required: true,
              where: { enabled: true },
              attributes: []
            }
          ]
        }
      ],
      distinct: true
    });

    return res.status(200).json({ origins });
  } catch (error) {
    console.error('Error al obtener paradas de origen:', error);
    return res.status(500).json({ message: 'Error al obtener las paradas de origen.' });
  }
};



exports.getDestinationsByOrigin = async (req, res) => {
  const { originId } = req.params;

  try {
    const destinations = await stops.findAll({
      include: [
        {
          model: routes,
          as: 'destinationRoutes',
          where: { origin: originId }, 
          include: [
            {
              model: schedules,
              as: 'schedules',
              where: { enabled: true },
              attributes: ['id']
            }
          ]
        }
      ],
      distinct: true,      
      attributes: ['id', 'name'],
      group: ['stops.id']
    });

    return res.status(200).json({ destinations });
  } catch (error) {
    console.error('Error al obtener destinos:', error);
    return res.status(500).json({ message: 'Error al obtener los destinos.' });
  }
};

exports.getCompanyStops = async (req, res) => {
  const { companyId } = req.user; 
  try {
    const stopsList = await stops.findAll({
      include: [
        {
          model: companies,
          as: 'companies',
          where: { id: companyId },
          through: { attributes: [] } 
        }
      ],
      attributes: ['id', 'name']
    });

    return res.status(200).json({ stops: stopsList });
  } catch (error) {
    console.error('Error al obtener paradas de la empresa:', error);
    return res.status(500).json({ message: 'Error al obtener paradas de la empresa.' });
  }
};

