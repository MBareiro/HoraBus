const db = require("../../db/models");
const { Op } = require("sequelize");
const { schedules, routes, stops, companies } = db;
const { Sequelize } = require("sequelize");
const { frequency: Frequency } = db; 

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
    const schedule = await schedules.findByPk(req.params.id, {
      attributes: ['departure_time', 'arrival_time'],
      include: [
        {
          model: Frequency,
          as: 'frequency',
          attributes: ['name'],
        },
        {
          model: routes,
          as: 'route',
          include: [
            { model: stops, as: 'originStop', attributes: ['name'] },
            { model: stops, as: 'destinationStop', attributes: ['name'] },
            { model: companies, as: 'company', attributes: ['name'] },
          ],
        },
      ],
    });

    if (!schedule) {
      return res.status(404).json({ error: "Horario no encontrado." });
    }

    console.log('Datos de schedule.route:', schedule.route);

    const formattedSchedule = {
      departure_time: schedule.departure_time,
      arrival_time: schedule.arrival_time,
      frequency: schedule.frequency ? [schedule.frequency.name] : [],
      origin: schedule.route?.originStop?.name || null,
      destination: schedule.route?.destinationStop?.name || null,
      company: schedule.route?.company?.name || null,
    };

    res.status(200).json(formattedSchedule);
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
      return res.status(400).json({ message: "El origen y el destino no pueden ser iguales." });
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

    // Buscar el ID de la frecuencia en la tabla de frecuencias
    const frequencyRecord = await Frequency.findOne({
      where: { name: frequency }
    });

    // Si la frecuencia no existe, devolver un error
    if (!frequencyRecord) {
      return res.status(400).json({ message: `La frecuencia '${frequency}' no es válida.` });
    }

    // Verificar si el horario ya existe (misma frecuencia, hora de salida, hora de llegada y ruta)
    const existingSchedule = await schedules.findOne({
      where: {
        frequency_id: frequencyRecord.id, // Usar el ID de la frecuencia
        departure_time,
        arrival_time,
        route_id: route.id,
      }
    });

    if (existingSchedule) {
      return res.status(400).json({ message: "Ya existe un horario con la misma frecuencia, hora de salida y hora de llegada." });
    }

    // Crear el horario con el frequency_id en lugar de frequency
    const newSchedule = await schedules.create({
      frequency_id: frequencyRecord.id, // Guardar el ID de la frecuencia
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
  const { frequency, departure_time, arrival_time, origin, destination } = req.body;

  try {
    // Validar que se proporcionen origen y destino
    if (!origin || !destination) {
      return res.status(400).json({ error: "Origen y destino son obligatorios." });
    }
    
    // Buscar los stops para el origen y destino
    const originStop = await stops.findOne({ where: { name: origin } });
    const destinationStop = await stops.findOne({ where: { name: destination } });

    if (!originStop || !destinationStop) {
      return res.status(400).json({ error: "Origen o destino no válidos." });
    }

    // Buscar una ruta existente con el origen y destino proporcionados
    let route = await routes.findOne({
      where: {
        origin: originStop.id,
        destination: destinationStop.id,
      },
    });

    // Si la ruta no existe, crearla
    if (!route) {
      route = await routes.create({
        origin: originStop.id,
        destination: destinationStop.id,
      });
    }

    // Actualizar el horario con la información proporcionada
    const [updated] = await schedules.update(
      {
        frequency,
        departure_time,
        arrival_time,
        route_id: route.id,
      },
      { where: { id: req.params.id } }
    );

    if (updated) {
      // Obtener el horario actualizado con relaciones
      const updatedSchedule = await schedules.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: routes,
            as: "route",
            include: [
              { model: stops, as: "originStop", attributes: ["name"] },
              { model: stops, as: "destinationStop", attributes: ["name"] },
            ],
          },
        ],
      });

      // Formatear la respuesta
      const response = {
        departure_time: updatedSchedule.departure_time,
        arrival_time: updatedSchedule.arrival_time,
        frequency,
        origin: updatedSchedule.route?.originStop?.name || null,
        destination: updatedSchedule.route?.destinationStop?.name || null,
      };

      res.status(200).json(response);
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

// Obtener horarios filtrados por origen, destino, frecuencias, compañía y hora
exports.getSchedules = async (req, res) => {
  console.log(req.query);
  
  const { from, to, horaMin, horaMax, frequency, company } = req.query;
  try {
    if (from === to) {
      return res
        .status(400)
        .json({ message: "El origen y el destino no pueden ser iguales." });
    }

    // Obtener las paradas por nombre
    const [fromStop, toStop] = await Promise.all([
      stops.findOne({ where: { name: from } }),
      stops.findOne({ where: { name: to } }),
    ]);

    if (!fromStop || !toStop) {
      return res.status(404).json({ message: "Las paradas no se encontraron." });
    }

    let frequencyIds = [];
    if (frequency) {
      if (Array.isArray(frequency)) {
        const frequencyRecords = await Frequency.findAll({
          where: { name: { [Op.in]: frequency } },
        });

        if (frequencyRecords.length !== frequency.length) {
          const foundFrequencies = frequencyRecords.map(f => f.name);
          const missingFrequencies = frequency.filter(
            f => !foundFrequencies.includes(f)
          );
          return res.status(404).json({
            message: `Las frecuencias no existen: ${missingFrequencies.join(", ")}`,
          });
        }

        frequencyIds = frequencyRecords.map(f => f.id);
      } else {
        const frequencyRecord = await Frequency.findOne({
          where: { name: frequency },
        });
        if (!frequencyRecord) {
          return res.status(404).json({
            message: `La frecuencia "${frequency}" no existe.`,
          });
        }
        frequencyIds = [frequencyRecord.id];
      }
    }

    const routeConditions = {
      origin: fromStop.id,
      destination: toStop.id,
    };

    if (company) {
      routeConditions.company_id = company;
    }

    const scheduleConditions = {};

    if (frequencyIds.length > 0) {
      scheduleConditions.frequency_id = { [Op.in]: frequencyIds };
    }

    if (horaMin && horaMax) {
      scheduleConditions.departure_time = {
        [Op.between]: [horaMin, horaMax],
      };
    } else if (horaMin) {
      scheduleConditions.departure_time = { [Op.gte]: horaMin };
    } else if (horaMax) {
      scheduleConditions.departure_time = { [Op.lte]: horaMax };
    }

    const schedulesData = await schedules.findAll({
      attributes: ["id", "departure_time", "arrival_time", "frequency_id"],
      where: scheduleConditions,
      include: [
        {
          model: routes,
          as: "route",
          attributes: ["id", "company_id"],
          where: routeConditions,
          include: [
            {
              model: companies,
              as: "company",
              attributes: ["name"],
            },
          ],
        },
        {
          model: Frequency,
          as: "frequency",
          attributes: ["name"],
        },
      ],
    });

    // Formatear la respuesta
    const formattedSchedules = schedulesData.map(schedule => ({
      id: schedule.id,
      departure_time: schedule.departure_time,
      arrival_time: schedule.arrival_time,
      frequency: schedule.frequency?.name,
      company: schedule.route?.company?.name,
    }));

    if (formattedSchedules.length === 0) {
      return res.status(404).json({
        message: "No se encontraron horarios para los filtros proporcionados.",
      });
    }

    res.status(200).json(formattedSchedules);
  } catch (error) {
    console.error("Error al obtener los horarios:", error);
    res.status(500).json({ message: "Error al obtener los horarios." });
  }
};

