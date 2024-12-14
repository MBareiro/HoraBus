const { body, param } = require('express-validator');

module.exports = {
  // Validaciones para crear un horario
  createScheduleValidator: [
    body('route_id')
      .isInt({ gt: 0 }).withMessage('El ID de la ruta debe ser un número entero mayor que 0.')
      .notEmpty().withMessage('El ID de la ruta es obligatorio.'),
    body('departure_time')
      .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('La hora de salida debe tener el formato HH:MM:SS.')
      .notEmpty().withMessage('La hora de salida es obligatoria.'),
    body('arrival_time')
      .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('La hora de llegada debe tener el formato HH:MM:SS.')
      .notEmpty().withMessage('La hora de llegada es obligatoria.'),
    body('frequency')
      .optional()
      .isString().withMessage('La frecuencia debe ser una cadena de texto.')
      .isLength({ max: 255 }).withMessage('La frecuencia no debe superar los 255 caracteres.')
  ],

  // Validaciones para actualizar un horario
  updateScheduleValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del horario debe ser un número entero mayor que 0.'),
    body('route_id')
      .optional()
      .isInt({ gt: 0 }).withMessage('El ID de la ruta debe ser un número entero mayor que 0.'),
    body('departure_time')
      .optional()
      .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('La hora de salida debe tener el formato HH:MM:SS.'),
    body('arrival_time')
      .optional()
      .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('La hora de llegada debe tener el formato HH:MM:SS.'),
    body('frequency')
      .optional()
      .isString().withMessage('La frecuencia debe ser una cadena de texto.')
      .isLength({ max: 255 }).withMessage('La frecuencia no debe superar los 255 caracteres.')
  ],

  // Validaciones para obtener un horario por ID
  getScheduleByIdValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del horario debe ser un número entero mayor que 0.')
  ],

  // Validaciones para eliminar un horario
  deleteScheduleValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del horario debe ser un número entero mayor que 0.')
  ]
};
