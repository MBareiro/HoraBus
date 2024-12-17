const { body, param } = require('express-validator');

module.exports = {
  // Validaciones para crear un horario
  createScheduleValidator: [
    body('route_id')
      .isInt({ gt: 0 }).withMessage('El ID de la ruta debe ser un número entero mayor que 0.')
      .notEmpty().withMessage('El ID de la ruta es obligatorio.')
      .toInt(), // Convierte el valor a entero
    body('from')
      .isInt({ gt: 0 }).withMessage('El origen debe ser un ID válido y mayor que 0.')
      .notEmpty().withMessage('El campo origen es obligatorio.')
      .toInt(), // Convierte el valor a entero
    body('to')
      .isInt({ gt: 0 }).withMessage('El destino debe ser un ID válido y mayor que 0.')
      .notEmpty().withMessage('El campo destino es obligatorio.')
      .toInt() // Convierte el valor a entero
      .custom((value, { req }) => {
        if (value === req.body.origin) {
          throw new Error('El origen y el destino no pueden ser iguales.');
        }
        return true;
      }),
    body('departure_time')
      .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('La hora de salida debe tener el formato HH:MM:SS.')
      .notEmpty().withMessage('La hora de salida es obligatoria.')
      .trim(), // Elimina espacios innecesarios
    body('arrival_time')
      .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('La hora de llegada debe tener el formato HH:MM:SS.')
      .notEmpty().withMessage('La hora de llegada es obligatoria.')
      .trim(), // Elimina espacios innecesarios
    body('frequency')
      .optional()
      .isString().withMessage('La frecuencia debe ser una cadena de texto.')
      .isLength({ max: 255 }).withMessage('La frecuencia no debe superar los 255 caracteres.')
      .trim().escape() // Sanitiza y elimina espacios
  ],

  // Validaciones para actualizar un horario
  updateScheduleValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del horario debe ser un número entero mayor que 0.')
      .toInt(), // Convierte el valor a entero
    body('route_id')
      .optional()
      .isInt({ gt: 0 }).withMessage('El ID de la ruta debe ser un número entero mayor que 0.')
      .toInt(), // Convierte el valor a entero
    body('departure_time')
      .optional()
      .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('La hora de salida debe tener el formato HH:MM:SS.')
      .trim(), // Elimina espacios innecesarios
    body('arrival_time')
      .optional()
      .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('La hora de llegada debe tener el formato HH:MM:SS.')
      .trim(), // Elimina espacios innecesarios
    body('frequency')
      .optional()
      .isString().withMessage('La frecuencia debe ser una cadena de texto.')
      .isLength({ max: 255 }).withMessage('La frecuencia no debe superar los 255 caracteres.')
      .trim().escape() // Sanitiza y elimina espacios
  ],

  // Validaciones para obtener un horario por ID
  getScheduleByIdValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del horario debe ser un número entero mayor que 0.')
      .toInt() // Convierte el valor a entero
  ],

  // Validaciones para eliminar un horario
  deleteScheduleValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del horario debe ser un número entero mayor que 0.')
      .toInt() // Convierte el valor a entero
  ]
};
