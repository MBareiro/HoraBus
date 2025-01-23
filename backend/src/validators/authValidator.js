const { body, param } = require('express-validator');

module.exports = {
  loginUserValidator: [
    body('dni')
      .isString().withMessage('El DNI debe ser una cadena de texto.')
      .notEmpty().withMessage('El DNI es obligatorio.')
      .isLength({ min: 8, max: 20 }).withMessage('El DNI debe tener entre 8 y 20 caracteres.')
      .matches(/^[0-9]+$/).withMessage('El DNI debe contener solo números.'), 
    body('password')
      .isString().withMessage('La contraseña debe ser una cadena de texto.')
      .notEmpty().withMessage('La contraseña es obligatoria.')
      .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres.')
      .isLength({ max: 20 }).withMessage('La contraseña debe tener hasta 20 caracteres.')
  ],

  forgotPasswordValidator: [
    body('dni')
      .isString().withMessage('El DNI debe ser una cadena de texto.')
      .notEmpty().withMessage('El DNI es obligatorio.')
      .isLength({ min: 8, max: 20 }).withMessage('El DNI debe tener entre 8 y 20 caracteres.')
      .matches(/^[0-9]+$/).withMessage('El DNI debe contener solo números.')
  ],

  resetPasswordValidator: [
    body('token')
      .isString().withMessage('El token debe ser una cadena de texto.')
      .notEmpty().withMessage('El token es obligatorio.'),
    body('newPassword')
      .isString().withMessage('La nueva contraseña debe ser una cadena de texto.')
      .notEmpty().withMessage('La nueva contraseña es obligatoria.')
      .isLength({ min: 8 }).withMessage('La nueva contraseña debe tener al menos 8 caracteres.')
  ],

  // Validaciones para la renovación del token
  refreshTokenValidator: [
    body('refreshToken')
      .isString().withMessage('El refresh token debe ser una cadena de texto.')
      .notEmpty().withMessage('El refresh token es obligatorio.')
  ]
};
