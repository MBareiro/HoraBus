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
    const { observations, departure_time, origin, destination, company_id, bus_id } =
      req.body;

    // Validar datos obligatorios
    if (
      !observations ||
      !departure_time ||
      !origin ||
      !destination ||
      !company_id ||
      !bus_id
    ) {
      return res.status(400).json({ message: "Faltan datos obligatorios." });
    }
    const routeExist = await routes.findOne({
      where: { company_id: company_id, origin: origin, destination: destination, bus_id: bus_id },
    });

    if (routeExist) {
      return res
        .status(409)
        .json({ message: "La ruta ya existe." });
    }
    // Buscar las paradas de origen y destino
    const originStop = await stops.findOne({ where: { id: origin } });
    const destinationStop = await stops.findOne({
      where: { id: destination },
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
      observations,
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
  const { observations, departure_time } = req.body;
  try {
    const [updated] = await Schedule.update(
      { observations, departure_time },
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
  console.log(req.query);
  
  try {
    const { from, to, company } = req.query;

    // Buscar las paradas de origen y destino
    const fromStop = await stops.findOne({ where: { id: from } });
    const toStop = await stops.findOne({ where: { id: to } });

    if (!fromStop || !toStop) {
      return res.status(404).json({ message: "Las paradas no se encontraron." });
    }

    // Obtener las rutas, colectivos y horarios asociados
    const schedulesData = await Schedule.findAll({
      attributes: ["id", "departure_time", "observation"],     
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
              attributes: ["name"],  // Origen de la ruta
            },
            {
              model: stops,
              as: "destinationStop",
              attributes: ["name"],  // Destino de la ruta
            },
            {
              model: companies,
              as: "company",
              attributes: ["name"],  // Compañía de la ruta
            },
          ],
        },
      ],
    });

    if (schedulesData.length === 0) {
      return res.status(404).json({
        message: "No se encontraron horarios para los filtros proporcionados.",
      });
    }

    res.json(schedulesData);
  } catch (error) {
    console.error("Error al obtener los horarios:", error);
    res.status(500).json({ message: "Error al obtener los horarios." });
  }
};

