const { body, param } = require('express-validator');

module.exports = {
  // Validaciones para crear un usuario
  createUserValidator: [
    body('name')
      .isString().withMessage('El nombre debe ser una cadena de texto.')
      .notEmpty().withMessage('El nombre es obligatorio.')
      .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.'),
    body('email')
      .isEmail().withMessage('El email debe tener un formato válido.')
      .notEmpty().withMessage('El email es obligatorio.'),
    body('password')
      .isString().withMessage('La contraseña debe ser una cadena de texto.')
      .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
      .notEmpty().withMessage('La contraseña es obligatoria.'),
    body('role')
      .isIn(['Administrator', 'Operator', 'Driver', 'User']).withMessage('El rol no es válido.')
      .notEmpty().withMessage('El rol es obligatorio.'),
    body('company_id')
      .isInt({ gt: 0 }).withMessage('El ID de la compañía debe ser un número entero mayor que 0.')
      .notEmpty().withMessage('El ID de la compañía es obligatorio.')
  ],

  // Validaciones para actualizar un usuario
  updateUserValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del usuario debe ser un número entero mayor que 0.'),
    body('name')
      .optional()
      .isString().withMessage('El nombre debe ser una cadena de texto.')
      .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.'),
    body('email')
      .optional()
      .isEmail().withMessage('El email debe tener un formato válido.'),
    body('password')
      .optional()
      .isString().withMessage('La contraseña debe ser una cadena de texto.')
      .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.'),
    body('role')
      .optional()
      .isIn(['Administrator', 'Operator', 'Driver', 'User']).withMessage('El rol no es válido.'),
    body('company_id')
      .optional()
      .isInt({ gt: 0 }).withMessage('El ID de la compañía debe ser un número entero mayor que 0.')
  ],

  // Validaciones para obtener un usuario por ID
  getUserByIdValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del usuario debe ser un número entero mayor que 0.')
  ],

  // Validaciones para eliminar un usuario
  deleteUserValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del usuario debe ser un número entero mayor que 0.')
  ]
};
