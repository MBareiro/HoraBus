const db = require('../../db/models');
const Schedule = db.schedules;
const { schedules, routes, stops, companies } = require('../../db/models'); // Asegúrate de que estas tablas estén importadas

// Obtener todos los horarios
exports.getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.findAll();
        res.status(200).json(schedules);
    } catch (error) {
        console.error('Error al obtener los horarios:', error);
        res.status(500).json({ error: 'Error al obtener los horarios.' });
    }
}; 

// Obtener un horario por ID
exports.getScheduleById = async (req, res) => {
    try {
        const schedule = await Schedule.findByPk(req.params.id);
        if (schedule) {
            res.status(200).json(schedule);
        } else {
            res.status(404).json({ error: 'Horario no encontrado.' });
        }
    } catch (error) {
        console.error('Error al obtener el horario:', error);
        res.status(500).json({ error: 'Error al obtener el horario.' });
    }
};

// Crear un nuevo horario
exports.createSchedule = async (req, res) => {
    const { route_id, day_of_week, departure_time } = req.body;
    try {
        const newSchedule = await Schedule.create({ route_id, day_of_week, departure_time });
        res.status(201).json(newSchedule);
    } catch (error) {
        console.error('Error al crear el horario:', error);
        res.status(500).json({ error: 'Error al crear el horario.', details: error.message });
    }
};

// Actualizar un horario existente
exports.updateSchedule = async (req, res) => {
    const { day_of_week, departure_time } = req.body;
    try {
        const [updated] = await Schedule.update({ day_of_week, departure_time }, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedSchedule = await Schedule.findByPk(req.params.id);
            res.status(200).json(updatedSchedule);
        } else {
            res.status(404).json({ error: 'Horario no encontrado.' });
        }
    } catch (error) {
        console.error('Error al actualizar el horario:', error);
        res.status(500).json({ error: 'Error al actualizar el horario.' });
    }
};

// Eliminar un horario
exports.deleteSchedule = async (req, res) => {
    try {
        const deleted = await Schedule.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Horario no encontrado.' });
        }
    } catch (error) {
        console.error('Error al eliminar el horario:', error);
        res.status(500).json({ error: 'Error al eliminar el horario.' });
    }
};

const { Op } = require('sequelize');

exports.getSchedules = async (req, res) => {
  try {
    const { from, to, day, company } = req.query;

    // Buscar los IDs de las paradas (origin y destination)
    const fromStop = await stops.findOne({ where: { name: from } });
    const toStop = await stops.findOne({ where: { name: to } });

    if (!fromStop || !toStop) {
      return res.status(404).json({ message: 'Las paradas no se encontraron.' });
    }

    // Realizar la consulta a la tabla schedules, filtrando por los parámetros
    const schedulesData = await schedules.findAll({
      where: {
        day_of_week: day,
      },
      include: [
        {
          model: routes,
          as: 'route', // Usar el alias correcto 'route'
          where: {
            origin: fromStop.id,
            destination: toStop.id,
            company_id: company ? company : { [Op.ne]: null }, // Filtra por la compañía si está presente
          },
          include: [
            {
              model: stops,
              as: 'originStop',
            },
            {
              model: stops,
              as: 'destinationStop',
            },
            {
              model: companies,
              as: 'company', // Usar el alias correcto 'company'
            },
          ],
        },
      ],
    });

    if (schedulesData.length === 0) {
      return res.status(404).json({ message: 'No se encontraron horarios para los filtros proporcionados.' });
    }

    res.json(schedulesData);
  } catch (error) {
    console.error('Error al obtener los horarios:', error);
    res.status(500).json({ message: 'Error al obtener los horarios.' });
  }
}


