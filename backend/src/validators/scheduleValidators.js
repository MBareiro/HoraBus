const { body, param } = require('express-validator');

module.exports = {
  // Validaciones para crear un horario
  createScheduleValidator: [
    body('origin')
      /* .isInt({ gt: 0 }).withMessage('El origen debe ser un ID válido y mayor que 0.') */
      .notEmpty().withMessage('El campo origen es obligatorio.')
      /* .toInt() */,
    body('destination')
      /* .isInt({ gt: 0 }).withMessage('El destino debe ser un ID válido y mayor que 0.') */
      .notEmpty().withMessage('El campo destino es obligatorio.')
      /* .toInt()  */
      .custom((value, { req }) => {
        if (value === req.body.origin) {
          throw new Error('El origen y el destino no pueden ser iguales.');
        }
        return true;
      }),
    body('departure_time')
      .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('La hora de salida debe tener el formato HH:MM:SS.')
      .notEmpty().withMessage('La hora de salida es obligatoria.')
      .trim(), 
    body('arrival_time')
      .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('La hora de llegada debe tener el formato HH:MM:SS.')
      .notEmpty().withMessage('La hora de llegada es obligatoria.')
      .trim(), 

    body('frequency')
      .optional()
      .custom((value) => {
        // Si 'value' es una cadena, se valida
        if (typeof value === 'string') {
          if (value.length > 255) {
            throw new Error('La frecuencia no debe superar los 255 caracteres.');
          }
        }
        // Si 'value' es un array, validamos cada uno de sus elementos
        else if (Array.isArray(value)) {
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
   /*  body('route_id')
      .optional()
      .isInt({ gt: 0 }).withMessage('El ID de la ruta debe ser un número entero mayor que 0.')
      .toInt(), */
    body('departure_time')
      .optional()
      .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('La hora de salida debe tener el formato HH:MM:SS.')
      .trim(), 
    body('arrival_time')
      .optional()
      .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('La hora de llegada debe tener el formato HH:MM:SS.')
      .trim(), 
    body('frequency')
      .optional()
      .isString().withMessage('La frecuencia debe ser una cadena de texto.')
      .isLength({ max: 255 }).withMessage('La frecuencia no debe superar los 255 caracteres.')
      .trim().escape(), 
    body('origin')
      /* .isInt({ gt: 0 }).withMessage('El origen debe ser un ID válido y mayor que 0.') */
      .notEmpty().withMessage('El campo origen es obligatorio.')
      /* .toInt() */,
    body('destination')
      /* .isInt({ gt: 0 }).withMessage('El destino debe ser un ID válido y mayor que 0.') */
      .notEmpty().withMessage('El campo destino es obligatorio.')
      /* .toInt()  */
      .custom((value, { req }) => {
        if (value === req.body.origin) {
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
