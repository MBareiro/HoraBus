const db = require("../../db/models");
const { Op } = require("sequelize");
const { schedules, routes, stops, companies } = db;
const { Sequelize } = require("sequelize");
const { frequency: Frequency } = db; 

exports.getSchedules = async (req, res) => {
  const { from, to, horaMin, horaMax, frequency, company } = req.query;
  try {
    // Validar que el origen y destino no sean iguales
    if (from === to) {
      return res.status(400).json({ message: "El origen y el destino no pueden ser iguales." });
    }

    // Buscar las paradas de origen y destino
    const [fromStop, toStop] = await Promise.all([
      stops.findOne({ where: { name: from } }),
      stops.findOne({ where: { name: to } })
    ]);

    if (!fromStop || !toStop) {
      return res.status(404).json({ message: "Las paradas no se encontraron." });
    }

    let frequencyIds = [];
    if (frequency) {
      // Manejo de frecuencias en caso de que se envíen múltiples
      if (Array.isArray(frequency)) {
        const frequencyRecords = await Frequency.findAll({
          where: { name: { [Op.in]: frequency } },
        });

        if (frequencyRecords.length !== frequency.length) {
          const foundFrequencies = frequencyRecords.map(f => f.name);
          const missingFrequencies = frequency.filter(f => !foundFrequencies.includes(f));
          return res.status(404).json({
            message: `Las frecuencias no existen: ${missingFrequencies.join(", ")}`,
          });
        }

        frequencyIds = frequencyRecords.map(f => f.id);
      } else {
        const frequencyRecord = await Frequency.findOne({ where: { name: frequency } });
        if (!frequencyRecord) {
          return res.status(404).json({ message: `La frecuencia "${frequency}" no existe.` });
        }
        frequencyIds = [frequencyRecord.id];
      }
    }

    // Condiciones para la ruta
    const routeConditions = {
      origin: fromStop.id,
      destination: toStop.id,
    };

    // Si se especifica la empresa, añadir la condición correspondiente
    if (company) {
      routeConditions.company_id = company;
    }

    // Condiciones para los horarios
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

    // Obtener los horarios con los filtros aplicados
    const schedulesData = await schedules.findAll({
      attributes: ["id", "departure_time", "arrival_time", "frequency_id"],
      where: scheduleConditions,
      include: [
        {
          model: routes,
          as: "route",
          attributes: ["id", "origin", "destination"], // Asegurarse de que las rutas sean correctas
        },
        {
          model: companies, // Se trae la compañía desde la relación en Schedule
          as: "company", // Relación definida en Schedule
          attributes: ["name"],
        },
        {
          model: Frequency, // Relación definida en Schedule
          as: "frequency",
          attributes: ["name"],
        },
      ],
    });

    // Formatear los horarios para la respuesta
    const formattedSchedules = schedulesData.map(schedule => ({
      id: schedule.id,
      departure_time: schedule.departure_time,
      arrival_time: schedule.arrival_time,
      frequency: schedule.frequency?.name,
      company: schedule.route?.company?.name,
    }));

    // Si no se encuentran horarios, devolver un mensaje
    if (formattedSchedules.length === 0) {
      return res.status(404).json({
        message: "No se encontraron horarios para los filtros proporcionados.",
      });
    }

    // Responder con los horarios encontrados
    res.status(200).json(formattedSchedules);
  } catch (error) {
    console.error("Error al obtener los horarios:", error);
    res.status(500).json({ message: "Error al obtener los horarios." });
  }
};
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
          ],
        },
        {
          model: companies,
          as: 'company',
          attributes: ['name'],
        },
      ],
    });

    if (!schedule) {
      return res.status(404).json({ error: "Horario no encontrado." });
    }

    console.log('Datos de schedule:', schedule);

    const formattedSchedule = {
      departure_time: schedule.departure_time,
      arrival_time: schedule.arrival_time,
      frequency: schedule.frequency?.name || null,
      origin: schedule.route?.originStop?.name || null,
      destination: schedule.route?.destinationStop?.name || null,
      company: schedule.company?.name || null,
    };

    res.status(200).json(formattedSchedule);
  } catch (error) {
    console.error("Error al obtener el horario:", error);
    res.status(500).json({ error: "Error al obtener el horario." });
  }
};

exports.createSchedule = async (req, res) => {
  const { frequency, departure_time, arrival_time, origin, destination, company_id, status } = req.body;

  try {
    // Verificar que se han enviado los datos obligatorios
    if (!frequency || !departure_time || !arrival_time || !origin || !destination || !company_id) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }

    // Verificar que el origen y el destino no sean iguales
    if (origin === destination) {
      return res.status(400).json({ message: "El origen y el destino no pueden ser iguales." });
    }

    // Obtener las paradas por nombre (deberías tener implementada la función `getStopByName`)
    const [originStop, destinationStop] = await Promise.all([getStopByName(origin), getStopByName(destination)]);

    if (!originStop || !destinationStop) {
      return res.status(404).json({ message: "Las paradas no se encontraron." });
    }

    // Buscar una ruta existente o crear una nueva
    let route = await routes.findOne({
      where: { origin: originStop.id, destination: destinationStop.id }
    });

    if (!route) {
      route = await routes.create({
        origin: originStop.id,
        destination: destinationStop.id,
      });
    }

    // Buscar el registro de frecuencia
    const frequencyRecord = await Frequency.findOne({ where: { name: frequency } });

    if (!frequencyRecord) {
      return res.status(400).json({ message: `La frecuencia '${frequency}' no es válida.` });
    }

    // Verificar si la empresa existe
    const companyExists = await companies.findOne({ where: { id: company_id } });

    if (!companyExists) {
      return res.status(400).json({ message: "La empresa con el ID proporcionado no existe." });
    }

    // Verificar si ya existe un horario con la misma frecuencia, hora de salida y hora de llegada
    const existingSchedule = await schedules.findOne({
      where: {
        frequency_id: frequencyRecord.id,
        departure_time,
        arrival_time,
        route_id: route.id,
      }
    });

    if (existingSchedule) {
      return res.status(400).json({ message: "Ya existe un horario con la misma frecuencia, hora de salida y hora de llegada." });
    }

    // Crear el nuevo horario
    const newSchedule = await schedules.create({
      frequency_id: frequencyRecord.id, 
      departure_time,
      arrival_time,
      route_id: route.id,
      company_id,  // Asegúrate de incluir el company_id aquí
      status: status || 'pending', // Usar el valor recibido o 'pending' por defecto
    });

    res.status(201).json({ message: "Horario y ruta creados exitosamente.", schedule: newSchedule });
  } catch (error) {
    console.error("Error al crear el horario o la ruta:", error);
    res.status(500).json({ message: "Error al crear el horario o la ruta." });
  }
};

exports.updateSchedule = async (req, res) => {
  const { frequency, departure_time, arrival_time, origin, destination } = req.body;

  try {
    if (!origin || !destination) {
      return res.status(400).json({ error: "Origen y destino son obligatorios." });
    }

    const originStop = await stops.findOne({ where: { name: origin } });
    const destinationStop = await stops.findOne({ where: { name: destination } });

    if (!originStop || !destinationStop) {
      return res.status(400).json({ error: "Origen o destino no válidos." });
    }

    // Buscar o crear la ruta
    let route = await routes.findOne({
      where: {
        origin: originStop.id,
        destination: destinationStop.id,
      },
    });

    if (!route) {
      route = await routes.create({
        origin: originStop.id,
        destination: destinationStop.id,
      });
    }

    // Validar la frecuencia si está presente
    let frequencyRecord = null;
    if (frequency) {
      frequencyRecord = await Frequency.findOne({ where: { name: frequency } });
      if (!frequencyRecord) {
        return res.status(400).json({ error: "Frecuencia no válida." });
      }
    }

    // Actualizar el horario
    const [updated] = await schedules.update(
      {
        frequency_id: frequencyRecord ? frequencyRecord.id : null,
        departure_time,
        arrival_time,
        route_id: route.id,
      },
      { where: { id: req.params.id } }
    );

    if (!updated) {
      return res.status(404).json({ error: "Horario no encontrado." });
    }

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
        {
          model: Frequency,
          as: "frequency",
          attributes: ["name"],
        },
        {
          model: companies,
          as: "company",
          attributes: ["name"],
        },
      ],
    });

    // Formatear la respuesta
    const response = {
      departure_time: updatedSchedule.departure_time,
      arrival_time: updatedSchedule.arrival_time,
      frequency: updatedSchedule.frequency?.name || null,
      origin: updatedSchedule.route?.originStop?.name || null,
      destination: updatedSchedule.route?.destinationStop?.name || null,
      company: updatedSchedule.company?.name || null,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error al actualizar el horario:", error);
    res.status(500).json({ error: "Error al actualizar el horario." });
  }
};


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

// Validar la existencia de una parada
const getStopByName = async (name) => {
  return await stops.findOne({ where: { name } });
};
