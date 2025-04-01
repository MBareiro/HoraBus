const express = require('express');
const roleController = require('../controllers/roleController');
const roleValidator = require('../validators/roleValidators');
const validationErrorHandler = require('../middleware/validationErrorHandler');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Roles
 *     description: Endpoints para gestionar roles de usuario
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtiene todos los roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del rol
 *                   name:
 *                     type: string
 *                     description: Nombre del rol
 *       500:
 *         description: Error en el servidor
 */
router.get('/', roleController.getAllRoles);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Obtiene un rol específico
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID del rol
 *                 name:
 *                   type: string
 *                   description: Nombre del rol
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', roleValidator.getRoleByIdValidator, validationErrorHandler, roleController.getRoleById);

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Crea un nuevo rol
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del rol
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 *       500:
 *         description: Error en el servidor
 */
router.post('/', roleValidator.createRoleValidator, validationErrorHandler, roleController.createRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Actualiza un rol existente
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nuevo nombre del rol
 *     responses:
 *       200:
 *         description: Rol actualizado exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', roleValidator.updateRoleValidator, validationErrorHandler, roleController.updateRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Elimina un rol existente
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *       404:
 *         description: Rol no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', roleValidator.deleteRoleValidator, validationErrorHandler, roleController.deleteRole);

module.exports = router;
