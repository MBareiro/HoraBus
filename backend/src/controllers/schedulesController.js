const db = require("../../db/models");
const { Op } = require("sequelize");
const { schedules, routes, stops, companies, frequencies } = db;
const moment = require("moment");

exports.getSchedules = async (req, res) => {
  const { from, to, horaMin, horaMax, frequency, company, status, enabled } = req.query;

  try {
    if (from === to) {
      return res.status(400).json({ message: "El origen y el destino no pueden ser iguales." });
    }
    const [fromStop, toStop] = await Promise.all([
      stops.findOne({ where: { name: from } }),
      stops.findOne({ where: { name: to } })
    ]);

    if (!fromStop || !toStop) {
      return res.status(404).json({ message: "Las paradas no se encontraron." });
    }

    let frequencyIds = [];
    if (frequency) {
      if (Array.isArray(frequency)) {
        const frequencyRecords = await frequencies.findAll({
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
        const frequencyRecord = await frequencies.findOne({ where: { name: frequency } });
        if (!frequencyRecord) {
          return res.status(404).json({ message: `La frecuencia "${frequency}" no existe.` });
        }
        frequencyIds = [frequencyRecord.id];
      }
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

    if (status) {
      scheduleConditions.status = status;
    }

    if (enabled !== undefined) {
      scheduleConditions.enabled = enabled === "true";
    }

    const schedulesData = await schedules.findAll({
      attributes: ["id", "departure_time", "arrival_time", "frequency_id", "status", "enabled"],
      where: scheduleConditions,
      include: [
        {
          model: routes,
          as: "route",
          attributes: ["id", "origin", "destination"],
          where: {
            origin: fromStop.id,
            destination: toStop.id
          }
        },
        {
          model: companies,
          as: "company",
          attributes: ["name"],
          where: company ? { id: company } : undefined
        },
        {
          model: frequencies,
          as: "frequency",
          attributes: ["name"],
        },
      ],
    });

    const formattedSchedules = schedulesData.map(schedule => ({
      id: schedule.id,
      departure_time: schedule.departure_time
        ? moment(schedule.departure_time, "HH:mm:ss").format("HH:mm")
        : null,
      arrival_time: schedule.arrival_time
        ? moment(schedule.arrival_time, "HH:mm:ss").format("HH:mm")
        : null,
      frequency: schedule.frequency?.name,
      company: schedule.company?.name,
      status: schedule.status,
      enabled: schedule.enabled,
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


exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await schedules.findByPk(req.params.id, {
      attributes: ['departure_time', 'arrival_time', 'status', 'enabled'],
      include: [
        {
          model: frequencies,
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

    // Formatear la respuesta de forma eficiente
    const formattedSchedule = {
      departure_time: schedule.departure_time,
      arrival_time: schedule.arrival_time,
      status: schedule.status, // Incluyendo el estado
      enabled: schedule.enabled, // Incluyendo el estado de habilitación
      frequency: schedule.frequency ? schedule.frequency.name : null,
      origin: schedule.route?.originStop?.name ?? null,
      destination: schedule.route?.destinationStop?.name ?? null,
      company: schedule.company?.name ?? null,
    };

    res.status(200).json(formattedSchedule);
  } catch (error) {
    console.error("Error al obtener el horario:", error);
    res.status(500).json({ error: "Error al obtener el horario." });
  }
};


exports.createSchedule = async (req, res) => {
  const { frequency, departure_time, arrival_time, origin, destination, company_id, status, enabled } = req.body;

  try {
    // Verificar que se han enviado los datos obligatorios
    if (!frequency || !departure_time || !arrival_time || !origin || !destination || !company_id) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }

    // Verificar que el origen y el destino no sean iguales
    if (origin === destination) {
      return res.status(400).json({ message: "El origen y el destino no pueden ser iguales." });
    }

    // Obtener las paradas por nombre
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
    const frequencyRecord = await frequencies.findOne({ where: { name: frequency } });

    if (!frequencyRecord) {
      return res.status(400).json({ message: `La frecuencia '${frequency}' no es válida.` });
    }

    // Verificar si la empresa existe
    const companyExists = await companies.findOne({ where: { id: company_id } });

    if (!companyExists) {
      return res.status(400).json({ message: "La empresa con el ID proporcionado no existe." });
    }

    // Crear el nuevo horario
    const newSchedule = await schedules.create({
      frequency_id: frequencyRecord.id,
      departure_time,
      arrival_time,
      route_id: route.id,
      company_id,
      status: status || 'on_time',
      enabled: enabled !== undefined ? enabled : false,
    });

    // Responder con la información, incluyendo el nombre de la frecuencia
    res.status(201).json({
      message: "Horario y ruta creados exitosamente.",
      schedule: {
        id: newSchedule.id,
        departure_time: newSchedule.departure_time,
        arrival_time: newSchedule.arrival_time,
        frequency: frequencyRecord.name,  // Se devuelve el nombre en lugar del ID
        company_id: newSchedule.company_id,
        status: newSchedule.status,
        enabled: newSchedule.enabled
      }
    });

  } catch (error) {
    console.error("Error al crear el horario o la ruta:", error);
    res.status(500).json({ message: "Error al crear el horario o la ruta." });
  }
};


exports.updateSchedule = async (req, res) => {
  try {
    const { frequency, departure_time, arrival_time, origin, destination, status, enabled } = req.body;
    const scheduleId = req.params.id;

    // Buscar el horario existente
    const schedule = await schedules.findByPk(scheduleId, {
      include: [{ model: routes, as: "route" }],
    });

    if (!schedule) {
      return res.status(404).json({ error: "Horario no encontrado." });
    }

    let routeId = schedule.route_id; // Mantener la ruta actual si no se cambia el origen o destino
    let newOriginId = schedule.route?.origin;
    let newDestinationId = schedule.route?.destination;

    // Actualizar solo el origen si se proporciona
    if (origin) {
      const originStop = await stops.findOne({ where: { name: origin } });
      if (!originStop) {
        return res.status(400).json({ error: "Origen no válido." });
      }
      newOriginId = originStop.id;
    }

    // Actualizar solo el destino si se proporciona
    if (destination) {
      const destinationStop = await stops.findOne({ where: { name: destination } });
      if (!destinationStop) {
        return res.status(400).json({ error: "Destino no válido." });
      }
      newDestinationId = destinationStop.id;
    }

    // Verificar si la nueva ruta existe
    if (origin || destination) {
      let route = await routes.findOne({
        where: {
          origin: newOriginId,
          destination: newDestinationId,
        },
      });

      // Si no existe, crear la nueva ruta
      if (!route) {
        route = await routes.create({
          origin: newOriginId,
          destination: newDestinationId,
        });
      }

      routeId = route.id;
    }

    // Validar frecuencia si está presente
    let frequencyRecord = null;
    if (frequency) {
      frequencyRecord = await frequencies.findOne({ where: { name: frequency } });
      if (!frequencyRecord) {
        return res.status(400).json({ error: "Frecuencia no válida." });
      }
    }

    // Crear objeto con solo los campos enviados
    const updateData = {};
    if (departure_time) updateData.departure_time = departure_time;
    if (arrival_time) updateData.arrival_time = arrival_time;
    if (frequencyRecord) updateData.frequency_id = frequencyRecord.id;
    if (routeId) updateData.route_id = routeId;
    if (status !== undefined) updateData.status = status; // Agregado para actualizar el estado
    if (enabled !== undefined) updateData.enabled = enabled; // Agregado para actualizar el estado habilitado

    // Actualizar el horario
    const [updated] = await schedules.update(updateData, { where: { id: scheduleId } });

    if (!updated) {
      return res.status(404).json({ error: "No se pudo actualizar el horario." });
    }

    // Obtener el horario actualizado con sus relaciones
    const updatedSchedule = await schedules.findOne({
      where: { id: scheduleId },
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
          model: frequencies,
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
      id: updatedSchedule.id,
      departure_time: updatedSchedule.departure_time,
      arrival_time: updatedSchedule.arrival_time,
      frequency: updatedSchedule.frequency?.name || null,
      origin: updatedSchedule.route?.originStop?.name || null,
      destination: updatedSchedule.route?.destinationStop?.name || null,
      company: updatedSchedule.company?.name || null,
      status: updatedSchedule.status,
      enabled: updatedSchedule.enabled,
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
