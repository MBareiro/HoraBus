const db = require("../../db/models");
const { Op } = require("sequelize");
const Schedule = db.schedules;
const { routes, stops, companies } = require("../../db/models"); // Asegúrate de que estas tablas estén importadas

// Obtener todos los horarios
exports.getAllSchedules = async (req, res) => {
  try {
    console.log("asdasd");
    const schedules = await Schedule.findAll();
    res.status(200).json(schedules);
  } catch (error) {
    console.error("Error al obtener los horarios:", error);
    res.status(500).json({ error: "Error al obtener los horarios." });
  }
};

// Obtener un horario por ID
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findByPk(req.params.id);
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

exports.createSchedule = async (req, res) => {
  try {
    const { day_of_week, departure_time, origin, destination, company_id } =
      req.body;

    // Validar datos obligatorios
    if (
      !day_of_week ||
      !departure_time ||
      !origin ||
      !destination ||
      !company_id
    ) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }

    // Buscar las paradas de origen y destino
    const originStop = await stops.findOne({ where: { name: origin } });
    const destinationStop = await stops.findOne({
      where: { name: destination },
    });

    if (!originStop || !destinationStop) {
      return res
        .status(404)
        .json({ message: "Las paradas no se encontraron." });
    }

    // Verificar si existe una ruta para las paradas y la compañía
    let route = await routes.findOne({
      where: {
        origin: originStop.id,
        destination: destinationStop.id,
        company_id: company_id,
      },
    });

    // Si la ruta no existe, crearla
    if (!route) {
      route = await routes.create({
        origin: originStop.id,
        destination: destinationStop.id,
        company_id: company_id,
      });
    }

    // Crear el nuevo horario asociado a la ruta
    const newSchedule = await Schedule.create({
      day_of_week,
      departure_time,
      route_id: route.id,
    });

    res.status(201).json({
      message: "Horario y ruta creados exitosamente.",
      schedule: newSchedule,
    });
  } catch (error) {
    console.error("Error al crear el horario o la ruta:", error);
    res.status(500).json({ message: "Error al crear el horario o la ruta." });
  }
};

// Actualizar un horario existente
exports.updateSchedule = async (req, res) => {
  const { day_of_week, departure_time } = req.body;
  try {
    const [updated] = await Schedule.update(
      { day_of_week, departure_time },
      {
        where: { id: req.params.id },
      }
    );
    if (updated) {
      const updatedSchedule = await Schedule.findByPk(req.params.id);
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
    const deleted = await Schedule.destroy({
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

exports.getSchedules = async (req, res) => {
  try {
    const { from, to, day, company } = req.query;

    // Buscar los IDs de las paradas (origin y destination)
    const fromStop = await stops.findOne({ where: { id: from } });
    const toStop = await stops.findOne({ where: { id: to } });

    if (!fromStop || !toStop) {
      return res
        .status(404)
        .json({ message: "Las paradas no se encontraron." });
    }

    // Realizar la consulta a la tabla schedules, filtrando por los parámetros y seleccionando solo ciertos campos
    const schedulesData = await Schedule.findAll({
      attributes: ["id", "day_of_week", "departure_time"], // Define solo los campos necesarios de Schedule
      where: {
        day_of_week: day,
      },
      include: [
        {
          model: routes,
          as: "route",
          attributes: ["id"],
          where: {
            origin: fromStop.id,
            destination: toStop.id,
            company_id: company ? company : { [Op.ne]: null },
          },
          include: [
            {
              model: stops,
              as: "originStop",
              attributes: ["name"], // Campos específicos de la parada de origen
            },
            {
              model: stops,
              as: "destinationStop",
              attributes: ["name"], // Campos específicos de la parada de destino
            },
            {
              model: companies,
              as: "company",
              attributes: ["name"], // Campos específicos de la compañía
            },
          ],
        },
      ],
    });

    if (schedulesData.length === 0) {
      return res
        .status(404)
        .json({
          message:
            "No se encontraron horarios para los filtros proporcionados.",
        });
    }

    res.json(schedulesData);
  } catch (error) {
    console.error("Error al obtener los horarios:", error);
    res.status(500).json({ message: "Error al obtener los horarios." });
  }
};
