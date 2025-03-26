const { body, param } = require('express-validator');

module.exports = {
  // Validaciones para crear un horario
  createScheduleValidator: [
    body('origin')
      .notEmpty().withMessage('El campo origen es obligatorio.'),

    body('destination')
      .notEmpty().withMessage('El campo destino es obligatorio.')
      .custom((value, { req }) => {
        if (value === req.body.origin) {
          throw new Error('El origen y el destino no pueden ser iguales.');
        }
        return true;
      }),

    body('departure_time')
      .matches(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/).withMessage('La hora de salida debe tener el formato HH:MM o HH:MM:SS.')
      .notEmpty().withMessage('La hora de salida es obligatoria.')
      .trim(),

    body('arrival_time')
      .matches(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/).withMessage('La hora de llegada debe tener el formato HH:MM o HH:MM:SS.')
      .notEmpty().withMessage('La hora de llegada es obligatoria.')
      .trim(),

    body('departure_time').custom((value, { req }) => {
      if (value >= req.body.arrival_time) {
        throw new Error('La hora de salida no puede ser igual o posterior a la hora de llegada.');
      }
      return true;
    }),

    body('status')
      .isIn(['on_time', 'delayed', 'canceled']).withMessage('El estado debe ser uno de los siguientes: on_time, delayed, canceled.')
      .optional()
      .trim(),

    body('enabled')
      .isBoolean().withMessage('El campo enabled debe ser un valor booleano.')
      .optional(),

    body('frequency')
      .optional()
      .custom((value) => {
        if (typeof value === 'string') {
          if (value.length > 255) {
            throw new Error('La frecuencia no debe superar los 255 caracteres.');
          }
        } else if (Array.isArray(value)) {
          value.forEach((item) => {
            if (typeof item !== 'string') {
              throw new Error('Cada elemento en el array de frecuencias debe ser una cadena de texto.');
            }
            if (item.length > 255) {
              throw new Error('Cada frecuencia no debe superar los 255 caracteres.');
            }
          });
        } else {
          throw new Error('La frecuencia debe ser una cadena de texto o un array de cadenas.');
        }
        return true;
      })
      .trim()
      .escape()
  ],

  // Validaciones para actualizar un horario
  updateScheduleValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del horario debe ser un número entero mayor que 0.')
      .toInt(),

    body('departure_time')
      .optional()
      .matches(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/).withMessage('La hora de salida debe tener el formato HH:MM o HH:MM:SS.')
      .trim(),

    body('arrival_time')
      .optional()
      .matches(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/).withMessage('La hora de llegada debe tener el formato HH:MM o HH:MM:SS.')
      .trim(),

    body('departure_time').optional().custom((value, { req }) => {
      if (value && req.body.arrival_time && value >= req.body.arrival_time) {
        throw new Error('La hora de salida no puede ser igual o posterior a la hora de llegada.');
      }
      return true;
    }),

    body('status')
      .optional()
      .isIn(['on_time', 'delayed', 'canceled']).withMessage('El estado debe ser uno de los siguientes: on_time, delayed, canceled.')
      .trim(),

    body('enabled')
      .optional()
      .isBoolean().withMessage('El campo enabled debe ser un valor booleano.'),

    body('frequency')
      .optional()
      .isString().withMessage('La frecuencia debe ser una cadena de texto.')
      .isLength({ max: 255 }).withMessage('La frecuencia no debe superar los 255 caracteres.')
      .trim().escape(),

    body('origin')
      .optional()
      .isString().withMessage('El campo origen debe ser una cadena de texto.')
      .trim(),

    body('destination')
      .optional()
      .isString().withMessage('El campo destino debe ser una cadena de texto.')
      .trim()
      .custom((value, { req }) => {
        if (value && value === req.body.origin) {
          throw new Error('El origen y el destino no pueden ser iguales.');
        }
        return true;
      }),
  ],

  // Validaciones para obtener un horario por ID
  getScheduleByIdValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del horario debe ser un número entero mayor que 0.')
      .toInt()
  ],

  // Validaciones para eliminar un horario
  deleteScheduleValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del horario debe ser un número entero mayor que 0.')
      .toInt()
  ]
};
