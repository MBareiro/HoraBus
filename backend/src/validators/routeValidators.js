const { body, param } = require('express-validator');

module.exports = {
  // Validaciones para crear una ruta
  createRouteValidator: [
    body('origin')
      .isInt({ gt: 0 }).withMessage('El origen debe ser un ID válido y mayor que 0.')
      .notEmpty().withMessage('El campo origen es obligatorio.')
      .toInt(), 
    body('destination')
      .isInt({ gt: 0 }).withMessage('El destino debe ser un ID válido y mayor que 0.')
      .notEmpty().withMessage('El campo destino es obligatorio.')
      .toInt() 
      .custom((value, { req }) => {
        if (value === req.body.origin) {
          throw new Error('El origen y el destino no pueden ser iguales.');
        }
        return true;
      }),
    body('company_id')
      .isInt({ gt: 0 }).withMessage('El ID de la compañía debe ser un número entero válido y mayor que 0.')
      .notEmpty().withMessage('El campo de compañía es obligatorio.')
      .toInt() 
  ],

  // Validaciones para actualizar una ruta
  updateRouteValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID de la ruta debe ser un número entero válido y mayor que 0.')
      .toInt(), 
    body('origin')
      .optional()
      .isInt({ gt: 0 }).withMessage('El origen debe ser un ID válido y mayor que 0.')
      .toInt(), 
    body('destination')
      .optional()
      .isInt({ gt: 0 }).withMessage('El destino debe ser un ID válido y mayor que 0.')
      .toInt() 
      .custom((value, { req }) => {
        if (value === req.body.origin) {
          throw new Error('El origen y el destino no pueden ser iguales.');
        }
        return true;
      }),
    body('company_id')
      .optional()
      .isInt({ gt: 0 }).withMessage('El ID de la compañía debe ser un número entero válido y mayor que 0.')
      .toInt() 
  ],

  // Validaciones para obtener una ruta por ID
  getRouteByIdValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID de la ruta debe ser un número entero válido y mayor que 0.')
      .toInt() 
  ],

  // Validaciones para eliminar una ruta
  deleteRouteValidator: [
    param('id')
      .isInt({ gt: 0 }).withMessage('El ID de la ruta debe ser un número entero válido y mayor que 0.')
      .toInt() 
  ],

  getRoutesFromStopValidator: [
    param('name')
      .isString().withMessage('El nombre de la parada debe ser una cadena de texto válida.')
      .notEmpty().withMessage('El nombre de la parada no puede estar vacío.')
  ],
};
