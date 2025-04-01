const { body, param } = require('express-validator');

module.exports = {
  // Validaciones para crear un nuevo rol
  createRoleValidator: [
    body('name')
      .isString().withMessage('El nombre debe ser una cadena de texto.')
      .notEmpty().withMessage('El nombre es obligatorio.')
      .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres.')
      .trim().escape()
  ],

  // Validaciones para actualizar un rol
  updateRoleValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del rol debe ser un número entero mayor que 0.')
      .toInt(),
    body('name')
      .isString().withMessage('El nombre debe ser una cadena de texto.')
      .notEmpty().withMessage('El nombre es obligatorio.')
      .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres.')
      .trim().escape()
  ],

  // Validaciones para obtener un rol por ID
  getRoleByIdValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del rol debe ser un número entero mayor que 0.')
      .toInt()
  ],

  // Validaciones para eliminar un rol
  deleteRoleValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del rol debe ser un número entero mayor que 0.')
      .toInt()
  ]
};
