const db = require("../../db/models");
const { Op } = require("sequelize");
const { schedules, routes, stops, companies } = db;

// Obtener todos los horarios
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await schedules.findAll();
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error al obtener los horarios:", error);
    res.status(500).json({ error: "Error al obtener los horarios." });
  }
};

// Obtener un horario por ID
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await schedules.findByPk(req.params.id);
    if (schedule) {
      res.status(200).json(schedule);
    } else {
      res.status(404).json({ error: "Horario no encontrado." });
    }
  } catch (error) {
    console.error("Error al obtener el horario:", error);
    res.status(500).json({ error: "Error al obtener el horario." });
  }
};

// Validar la existencia de una parada
const getStopByName = async (name) => {
  return await stops.findOne({ where: { name } });
};

// Crear un horario
exports.createSchedule = async (req, res) => {
  const { frequency, departure_time, arrival_time, origin, destination, company_id } = req.body;
  try {
    // Validación de campos obligatorios
    if (!frequency || !departure_time || !arrival_time || !origin || !destination || !company_id) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }

    if (origin === destination) {
      return res
        .status(400)
        .json({ message: "El origen y el destino no pueden ser iguales." });
    }

    // Verificar si las paradas de origen y destino existen
    const [originStop, destinationStop] = await Promise.all([
      getStopByName(origin),
      getStopByName(destination),
    ]);

    if (!originStop || !destinationStop) {
      return res.status(404).json({ message: "Las paradas no se encontraron." });
    }

    // Verificar si la ruta ya existe o crearla si no
    let route = await routes.findOne({
      where: { origin: originStop.id, destination: destinationStop.id, company_id }
    });

    if (!route) {
      route = await routes.create({
        origin: originStop.id,
        destination: destinationStop.id,
        company_id,
      });
    }

    // Crear el horario
    const newSchedule = await schedules.create({
      frequency,
      departure_time,
      arrival_time,
      route_id: route.id,
    });

    res.status(201).json({ message: "Horario y ruta creados exitosamente.", schedule: newSchedule });
  } catch (error) {
    console.error("Error al crear el horario o la ruta:", error);
    res.status(500).json({ message: "Error al crear el horario o la ruta." });
  }
};

// Actualizar un horario
exports.updateSchedule = async (req, res) => {
  const { frequency, departure_time, arrival_time } = req.body;
  try {
    const [updated] = await schedules.update(
      { frequency, departure_time, arrival_time },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedSchedule = await schedules.findByPk(req.params.id);
      res.status(200).json(updatedSchedule);
    } else {
      res.status(404).json({ error: "Horario no encontrado." });
    }
  } catch (error) {
    console.error("Error al actualizar el horario:", error);
    res.status(500).json({ error: "Error al actualizar el horario." });
  }
};

// Eliminar un horario
exports.deleteSchedule = async (req, res) => {
  try {
    const deleted = await schedules.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Horario no encontrado." });
    }
  } catch (error) {
    console.error("Error al eliminar el horario:", error);
    res.status(500).json({ error: "Error al eliminar el horario." });
  }
};

// Obtener horarios filtrados por origen, destino y compañía
exports.getSchedules = async (req, res) => {
  const { from, to, frequency, company } = req.query;

  try {
    if (from === to) {
      return res
        .status(400)
        .json({ message: "El origen y el destino no pueden ser iguales." });
    }

    // Buscar paradas de origen y destino
    const [fromStop, toStop] = await Promise.all([
      getStopByName(from),
      getStopByName(to),
    ]);

    if (!fromStop || !toStop) {
      return res.status(404).json({ message: "Las paradas no se encontraron." });
    }

    // Construir las condiciones dinámicas para las rutas
    const routeConditions = {
      origin: fromStop.id,
      destination: toStop.id,
    };

    if (company) {
      routeConditions.company_id = company;
    }

    // Construir condiciones dinámicas para los horarios
    const scheduleConditions = {};
    if (frequency) {
      scheduleConditions.frequency = frequency;
    }

    // Obtener horarios con rutas y compañías
    const schedulesData = await schedules.findAll({
      attributes: ["id", "departure_time", "arrival_time", "frequency"],
      where: scheduleConditions, // Filtro dinámico de frecuencia
      include: [{
        model: routes,
        as: "route",
        attributes: ["id", "company_id"],
        where: routeConditions, // Filtro dinámico de rutas
        include: [{
          model: companies,
          as: "company",
          attributes: ["name"],
        }],
      }],
    });

    // Reestructurar los horarios para mover la compañía al nivel superior
    const formattedSchedules = schedulesData.map(schedule => ({
      id: schedule.id,
      departure_time: schedule.departure_time,
      arrival_time: schedule.arrival_time,
      frequency: schedule.frequency,
      company: schedule.route?.company,
    }));

    if (formattedSchedules.length === 0) {
      return res.status(404).json({ message: "No se encontraron horarios para los filtros proporcionados." });
    }

    res.status(200).json(formattedSchedules);
  } catch (error) {
    console.error("Error al obtener los horarios:", error);
    res.status(500).json({ message: "Error al obtener los horarios." });
  }
};