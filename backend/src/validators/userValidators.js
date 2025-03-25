const { body, param } = require('express-validator');

module.exports = {
  // Validaciones para crear un usuario
  createUserValidator: [
    body('name')
      .isString().withMessage('El nombre debe ser una cadena de texto.')
      .notEmpty().withMessage('El nombre es obligatorio.')
      .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.')
      .trim().escape(),
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
      .notEmpty().withMessage('El ID de la compañía es obligatorio.'),
    body('dni')
      .isString().withMessage('El DNI debe ser una cadena de texto.')
      .notEmpty().withMessage('El DNI es obligatorio.')
      .isLength({ min: 8, max: 20 }).withMessage('El DNI debe tener entre 8 y 20 caracteres.')
      .matches(/^[0-9]+$/).withMessage('El DNI debe contener solo números.')
  ],

  // Validaciones para actualizar un usuario (sin actualizar la contraseña)
  updateUserValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del usuario debe ser un número entero mayor que 0.')
      .toInt(),
    body('name')
      .optional()
      .isString().withMessage('El nombre debe ser una cadena de texto.')
      .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.')
      .trim().escape(),
    body('email')
      .optional()
      .isEmail().withMessage('El email debe tener un formato válido.'),
    // Se elimina la validación de 'password' ya que se actualiza en un endpoint separado
    body('role')
      .optional()
      .isIn(['Administrator', 'Operator', 'Driver', 'User']).withMessage('El rol no es válido.'),
    body('company_id')
      .optional()
      .isInt({ gt: 0 }).withMessage('El ID de la compañía debe ser un número entero mayor que 0.'),
    body('dni')
      .optional()
      .isString().withMessage('El DNI debe ser una cadena de texto.')
      .notEmpty().withMessage('El DNI no puede estar vacío.')
      .isLength({ min: 8, max: 20 }).withMessage('El DNI debe tener entre 8 y 20 caracteres.')
      .matches(/^[0-9]+$/).withMessage('El DNI debe contener solo números.')
  ],

  // Validaciones para actualizar la contraseña del usuario
  updatePasswordValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del usuario debe ser un número entero mayor que 0.')
      .toInt(),
    body('currentPassword')
      .exists().withMessage('La contraseña actual es obligatoria.')
      .isString().withMessage('La contraseña actual debe ser una cadena de texto.')
      .notEmpty().withMessage('La contraseña actual no puede estar vacía.'),
    body('newPassword')
      .exists().withMessage('La nueva contraseña es obligatoria.')
      .isString().withMessage('La nueva contraseña debe ser una cadena de texto.')
      .isLength({ min: 8 }).withMessage('La nueva contraseña debe tener al menos 8 caracteres.')
      .notEmpty().withMessage('La nueva contraseña no puede estar vacía.')
  ],

  // Validaciones para obtener un usuario por ID
  getUserByIdValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del usuario debe ser un número entero mayor que 0.')
      .toInt()
  ],

  // Validaciones para eliminar un usuario
  deleteUserValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID del usuario debe ser un número entero mayor que 0.')
      .toInt()
  ]
};
