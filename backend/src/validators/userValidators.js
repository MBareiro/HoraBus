const { body, param } = require('express-validator');
const db = require('../../db/models');
const Role = db.roles;
const Company = db.companies;

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
    body('role_id')
      .isInt({ gt: 0 }).withMessage('El ID de rol debe ser un número entero mayor que 0.')
      .notEmpty().withMessage('El ID de rol es obligatorio.')
      .custom(async (role_id) => {
        // Validar que el role_id exista en la tabla 'role'
        const roleExists = await Role.findByPk(role_id);
        if (!roleExists) {
          throw new Error('El rol con ese ID no existe.');
        }
        return true;
      }),
    body('company_id')
      .optional({ nullable: true })  // Permite que company_id sea opcional
      .isInt({ gt: 0 }).withMessage('El ID de la compañía debe ser un número entero mayor que 0.')
      .custom(async (company_id) => {
        if (company_id) {
          // Solo valida si company_id está presente en la solicitud
          const companyExists = await Company.findByPk(company_id);
          if (!companyExists) {
            throw new Error('La compañía con ese ID no existe.');
          }
        }
        return true;
      }),
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
    body('role_id')
      .optional()
      .isInt({ gt: 0 }).withMessage('El ID de rol debe ser un número entero mayor que 0.')
      .custom(async (role_id) => {
        // Validar que el role_id exista en la tabla 'role'
        const roleExists = await Role.findByPk(role_id);
        if (!roleExists) {
          throw new Error('El rol con ese ID no existe.');
        }
        return true;
      }),
    body('company_id')
      .optional()
      .isInt({ gt: 0 }).withMessage('El ID de la compañía debe ser un número entero mayor que 0.')
      .custom(async (company_id) => {
        if (company_id) {
          // Validar que el company_id exista en la tabla 'company'
          const companyExists = await Company.findByPk(company_id);
          if (!companyExists) {
            throw new Error('La compañía con ese ID no existe.');
          }
        }
        return true;
      }),
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
