const { body, param } = require('express-validator');

module.exports = {
  // Validaciones para crear una parada
  createStopValidator: [
    body('name')
      .isString().withMessage('El nombre de la parada debe ser una cadena de texto.')
      .notEmpty().withMessage('El nombre de la parada es obligatorio.')
      .isLength({ min: 3 }).withMessage('El nombre de la parada debe tener al menos 3 caracteres.'),
    body('latitude')
      .optional()
      .isFloat().withMessage('La latitud debe ser un número válido.')
      .isFloat({ min: -90, max: 90 }).withMessage('La latitud debe estar entre -90 y 90.'),
    body('longitude')
      .optional()
      .isFloat().withMessage('La longitud debe ser un número válido.')
      .isFloat({ min: -180, max: 180 }).withMessage('La longitud debe estar entre -180 y 180.')
  ],

  // Validaciones para actualizar una parada
  updateStopValidator: [
    param('id').isInt({ gt: 0 }).withMessage('El ID debe ser un número entero mayor que 0.'),
    body('name')
      .isString().withMessage('El nombre de la parada debe ser una cadena de texto.')
      .notEmpty().withMessage('El nombre de la parada es obligatorio.')
      .isLength({ min: 3 }).withMessage('El nombre de la parada debe tener al menos 3 caracteres.'),
    body('latitude')
      .optional()
      .isFloat().withMessage('La latitud debe ser un número válido.')
      .isFloat({ min: -90, max: 90 }).withMessage('La latitud debe estar entre -90 y 90.'),
    body('longitude')
      .optional()
      .isFloat().withMessage('La longitud debe ser un número válido.')
      .isFloat({ min: -180, max: 180 }).withMessage('La longitud debe estar entre -180 y 180.')
  ],

  // Validaciones para obtener una parada por ID
  getStopByIdValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID debe ser un número entero mayor que 0.')
  ],

  // Validaciones para eliminar una parada
  deleteStopValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID debe ser un número entero mayor que 0.')
  ]
};
