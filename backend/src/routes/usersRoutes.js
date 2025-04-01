const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const userValidator = require('../validators/userValidators');
const validationErrorHandler = require('../middleware/validationErrorHandler');
const verifyToken = require('../middleware/verifyToken');

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Endpoints para gestionar usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Nombre del usuario
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del usuario
 *                   password:
 *                     type: string
 *                     description: Contraseña del usuario
 *                   role_id:
 *                     type: integer
 *                     description: ID del rol del usuario
 *                   company_id:
 *                     type: integer
 *                     description: ID de la compañía
 *       500:
 *         description: Error en el servidor
 */
router.get('/', usersController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtiene un usuario específico
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: Nombre del usuario
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                 password:
 *                   type: string
 *                   description: Contraseña del usuario
 *                 role_id:
 *                   type: integer
 *                   description: ID del rol del usuario
 *                 company_id:
 *                   type: integer
 *                   description: ID de la compañía
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', userValidator.getUserByIdValidator, validationErrorHandler, usersController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - dni
 *               - email
 *               - password
 *               - role_id
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               dni:
 *                 type: string
 *                 description: D.N.I del usuario
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               role_id:
 *                 type: integer
 *                 description: ID del rol del usuario
 *               company_id:
 *                 type: integer
 *                 description: ID de la compañía
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 *       500:
 *         description: Error en el servidor
 */
router.post('/', userValidator.createUserValidator, validationErrorHandler, usersController.createUser);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualiza los datos generales de un usuario existente (sin contraseña)
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del usuario
 *               dni:
 *                 type: string
 *                 description: D.N.I del usuario
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               role_id:
 *                 type: integer
 *                 description: ID del rol del usuario
 *               company_id:
 *                 type: integer
 *                 description: ID de la compañía
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', userValidator.updateUserValidator, validationErrorHandler, usersController.updateUser);

/**
 * @swagger
 * /api/users/{id}/update-password:
 *   put:
 *     summary: Actualiza la contraseña de un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 description: Contraseña actual del usuario
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *       400:
 *         description: Contraseña actual incorrecta o datos inválidos
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id/update-password', userValidator.updatePasswordValidator, validationErrorHandler, usersController.updatePassword);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Elimina un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', userValidator.deleteUserValidator, validationErrorHandler, usersController.deleteUser);

module.exports = router;
