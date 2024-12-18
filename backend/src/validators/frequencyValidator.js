const { body, param } = require('express-validator');

module.exports = {
  // Validaciones para crear una frecuencia
  createFrequencyValidator: [
    body('name')
      .isString().withMessage('El nombre de la frecuencia debe ser una cadena de texto.')
      .notEmpty().withMessage('El nombre de la frecuencia es obligatorio.')
      .isLength({ min: 3 }).withMessage('El nombre de la frecuencia debe tener al menos 3 caracteres.')
      .trim().escape(), 
  ],

  // Validaciones para actualizar una frecuencia
  updateFrequencyValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID debe ser un número entero mayor que 0.')
      .toInt(), // Convierte el valor a entero
    body('name')
      .isString().withMessage('El nombre de la frecuencia debe ser una cadena de texto.')
      .notEmpty().withMessage('El nombre de la frecuencia es obligatorio.')
      .isLength({ min: 3 }).withMessage('El nombre de la frecuencia debe tener al menos 3 caracteres.')
      .trim().escape(), 
  ],

  // Validaciones para obtener una frecuencia por ID
  getFrequencyByIdValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID debe ser un número entero mayor que 0.')
      .toInt() // Convierte el valor a entero
  ],

  // Validaciones para eliminar una frecuencia
  deleteFrequencyValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID debe ser un número entero mayor que 0.')
      .toInt() // Convierte el valor a entero
  ]
};
