const { body, param } = require('express-validator');

module.exports = {
  // Validaciones para crear una compañía
  createCompanyValidator: [
    body('name')
      .trim().escape() // Sanitiza el campo para eliminar espacios y evitar inyecciones
      .isString().withMessage('El nombre de la compañía debe ser una cadena de texto.')
      .notEmpty().withMessage('El nombre de la compañía es obligatorio.')
      .isLength({ min: 3 }).withMessage('El nombre de la compañía debe tener al menos 3 caracteres.')
  ],

  // Validaciones para actualizar una compañía
  updateCompanyValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID debe ser un número entero mayor que 0.'),
    body('name')
      .trim().escape() // Sanitiza el campo para eliminar espacios y evitar inyecciones
      .isString().withMessage('El nombre de la compañía debe ser una cadena de texto.')
      .notEmpty().withMessage('El nombre de la compañía es obligatorio.')
      .isLength({ min: 3 }).withMessage('El nombre de la compañía debe tener al menos 3 caracteres.')
  ],

  // Validaciones para obtener una compañía por ID
  getCompanyByIdValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID debe ser un número entero mayor que 0.')
  ],

  // Validaciones para eliminar una compañía
  deleteCompanyValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID debe ser un número entero mayor que 0.')
  ]
};
