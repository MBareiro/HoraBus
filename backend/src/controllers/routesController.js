const db = require('../../db/models');
const Route = db.routes;
const Stop = db.stops;
const Schedule = db.schedules;

// Obtener todas las rutas
exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.findAll();
    res.status(200).json(routes);
  } catch (error) {
    console.error('Error al obtener las rutas:', error);
    res.status(500).json({ error: 'Error al obtener las rutas.' });
  }
};

// Obtener una ruta por ID
exports.getRouteById = async (req, res) => {
  try {
    const route = await Route.findByPk(req.params.id);
    if (route) {
      res.status(200).json(route);
    } else {
      res.status(404).json({ error: 'Ruta no encontrada.' });
    }
  } catch (error) {
    console.error('Error al obtener la ruta:', error);
    res.status(500).json({ error: 'Error al obtener la ruta.' });
  }
};

// Crear una nueva ruta
exports.createRoute = async (req, res) => {
  const { company_id, origin, destination } = req.body;

  try {
    const newRoute = await Route.create({ company_id, origin, destination });
    res.status(201).json(newRoute);
  } catch (error) {
    console.error('Error al crear la ruta:', error);
    res.status(500).json({ error: 'Error al crear la ruta.', details: error.message });
  }
};

// Actualizar una ruta existente
exports.updateRoute = async (req, res) => {
  const { company_id, origin, destination } = req.body;

  try {
    const [updated] = await Route.update({ company_id, origin, destination }, {
      where: { id: req.params.id }
    });

    if (updated) {
      const updatedRoute = await Route.findByPk(req.params.id);
      res.status(200).json(updatedRoute);
    } else {
      res.status(404).json({ error: 'Ruta no encontrada.' });
    }
  } catch (error) {
    console.error('Error al actualizar la ruta:', error);
    res.status(500).json({ error: 'Error al actualizar la ruta.' });
  }
};

// Eliminar una ruta
exports.deleteRoute = async (req, res) => {
  try {
    const deleted = await Route.destroy({
      where: { id: req.params.id }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Ruta no encontrada.' });
    }
  } catch (error) {
    console.error('Error al eliminar la ruta:', error);
    res.status(500).json({ error: 'Error al eliminar la ruta.' });
  }
};

exports.with_transfers = async (req, res) => {
  try {
    const { origin, destination } = req.query;

    // Buscar las paradas por nombre
    const [fromStop, toStop] = await Promise.all([
      Stop.findOne({ where: { name: origin } }),
      Stop.findOne({ where: { name: destination } }),
    ]);

    if (!fromStop || !toStop) {
      return res.status(404).json({ message: "Las paradas no se encontraron." });
    }

    // Buscar rutas desde la parada de origen
    const routes = await Route.findAll({
      where: { origin: fromStop.id },
      include: [
        {
          model: Stop,
          as: 'originStop',
          attributes: ['name'],
        },
        {
          model: Stop,
          as: 'destinationStop',
          attributes: ['id', 'name'],
        },
        {
          model: Schedule, // Incluir los horarios de las rutas
          as: 'schedule',
          attributes: ['departure_time', 'arrival_time'],
        },
      ],
    });

    if (routes.length === 0) {
      return res.status(404).json({ message: `No se encontraron rutas desde la parada ${fromStop.name}` });
    }

    // Vamos a almacenar todas las rutas válidas (con transbordos)
    let allRoutes = [];

    // Iteramos sobre las rutas para encontrar posibles transbordos a otras paradas
    for (const route of routes) {
      // Buscar rutas desde la parada de destino de la ruta actual hacia la parada final (Posadas)
      const connectingRoutes = await Route.findAll({
        where: { origin: route.destinationStop.id, destination: toStop.id },
        include: [
          {
            model: Stop,
            as: 'originStop',
            attributes: ['name'],
          },
          {
            model: Stop,
            as: 'destinationStop',
            attributes: ['name'],
          },
          {
            model: Schedule, // Incluir los horarios de las rutas adicionales
            as: 'schedule',
            attributes: ['departure_time', 'arrival_time'],
          },
        ],
      });

      // Si hay rutas conectando, las agregamos a las respuestas
      if (connectingRoutes.length > 0) {
        connectingRoutes.forEach(connectingRoute => {
          // Filtrar los horarios de la segunda ruta (scheduleSecondRoute)
          const validSecondRouteSchedules = connectingRoute.schedule.filter(secondSchedule => {
            // Comparar el horario de salida de la segunda ruta con la llegada de la primera ruta
            const firstRouteArrival = route.schedule[0].arrival_time; // Tomamos solo el primer horario de la primera ruta
            return secondSchedule.departure_time > firstRouteArrival; // Aseguramos que el horario de salida del segundo tramo sea posterior a la llegada del primero
          });

          // Si no hay rutas válidas para el segundo tramo, no continuar
          if (validSecondRouteSchedules.length === 0) return;

          // Asegurarse de que ambas rutas (primera y segunda) tengan la misma cantidad de horarios
          const scheduleCount = route.schedule.length;

          // Si la primera ruta tiene solo un horario, ajustamos la segunda para que tenga solo un horario correspondiente
          if (scheduleCount === 1) {
            // Asegurar que scheduleSecondRoute tenga solo 1 par de horarios
            validSecondRouteSchedules.length = 1;
          }

          // Si ambas rutas tienen más de un horario, mantenemos la cantidad original
          // O sea, no es necesario ajustar nada si scheduleFirstRoute tiene más de un horario

          allRoutes.push({
            from: route.originStop.name,
            to: connectingRoute.destinationStop.name,
            via: route.destinationStop.name, // Indicar la parada intermedia
            companyId: route.company_id,
            createdAt: route.createdAt,
            routeId: route.id,
            // Incluyendo los horarios de la primera ruta
            scheduleFirstRoute: route.schedule.map(schedule => ({
              departure_time: schedule.departure_time,
              arrival_time: schedule.arrival_time,
            })),
            // Incluyendo los horarios de la ruta de transbordo (conectando), solo los válidos
            scheduleSecondRoute: validSecondRouteSchedules.map(schedule => ({
              departure_time: schedule.departure_time,
              arrival_time: schedule.arrival_time,
            })),
          });
        });
      }
    }

    // Si no hay rutas válidas encontradas
    if (allRoutes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron rutas válidas que conecten las paradas.' });
    }

    // Devolver todas las rutas encontradas
    return res.status(200).json(allRoutes);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};






