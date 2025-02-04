const express = require('express');
const router = express.Router();
const stopsController = require('../controllers/stopsController');
const stopValidator = require('../validators/stopValidator');
const validationErrorHandler = require('../middleware/validationErrorHandler');
const verifyToken = require('../middleware/verifyToken');

/**
 * @swagger
 * tags:
 *   - name: Stops
 *     description: Endpoints para gestionar las paradas de colectivos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Stop:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID de la parada.
 *         name:
 *           type: string
 *           description: Nombre de la parada.
 *         location:
 *           type: object
 *           description: Ubicación geográfica de la parada.
 *           properties:
 *             latitude:
 *               type: number
 *               format: float
 *               description: Latitud de la ubicación.
 *             longitude:
 *               type: number
 *               format: float
 *               description: Longitud de la ubicación.
 *       required:
 *         - name
 *         - location
 */

/**
 * @swagger
 * /stops/{state}:
 *   get:
 *     summary: Obtiene las paradas filtradas por estado
 *     tags: [Stops]
 *     parameters:
 *       - in: path
 *         name: state
 *         required: true
 *         description: Estado de la parada (ENABLED o DISABLED)
 *         schema:
 *           type: string
 *           enum: [ENABLED, DISABLED]
 *     responses:
 *       200:
 *         description: Lista de paradas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Stop'
 *       500:
 *         description: Error en el servidor
 */
router.get('/:state', stopsController.getAllStops);


/**
 * @swagger
 * /stops/{id}:
 *   get:
 *     summary: Obtiene una parada específica
 *     tags: [Stops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la parada
 *     responses:
 *       200:
 *         description: Parada encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Stop'
 *       404:
 *         description: Parada no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', stopValidator.getStopByIdValidator, validationErrorHandler, stopsController.getStopById);

/**
 * @swagger
 * /stops:
 *   post:
 *     summary: Crea una nueva parada
 *     tags: [Stops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - location
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la parada
 *               location:
 *                 type: object
 *                 description: Ubicación de la parada.
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     format: float
 *                     description: Latitud de la ubicación.
 *                   longitude:
 *                     type: number
 *                     format: float
 *                     description: Longitud de la ubicación.
 *     responses:
 *       201:
 *         description: Parada creada exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 *       500:
 *         description: Error en el servidor
 */
router.post('/', stopValidator.createStopValidator, validationErrorHandler, stopsController.createStop);

/**
 * @swagger
 * /stops/{id}:
 *   put:
 *     summary: Actualiza una parada existente
 *     tags: [Stops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la parada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la parada
 *               location:
 *                 type: object
 *                 description: Ubicación de la parada.
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     format: float
 *                     description: Latitud de la ubicación.
 *                   longitude:
 *                     type: number
 *                     format: float
 *                     description: Longitud de la ubicación.
 *     responses:
 *       200:
 *         description: Parada actualizada exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 *       404:
 *         description: Parada no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', stopValidator.updateStopValidator, validationErrorHandler, stopsController.updateStop);

/**
 * @swagger
 * /stops/{id}:
 *   delete:
 *     summary: Elimina una parada existente
 *     tags: [Stops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la parada
 *     responses:
 *       200:
 *         description: Parada eliminada exitosamente
 *       404:
 *         description: Parada no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', stopValidator.deleteStopValidator, validationErrorHandler, stopsController.deleteStop);

/**
 * @swagger
 * /stops/{id}/state:
 *   patch:
 *     summary: Actualiza el estado de una parada
 *     tags: [Stops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la parada a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               state:
 *                 type: string
 *                 enum: [ENABLED, DISABLED]
 *                 description: Nuevo estado de la parada (ENABLED o DISABLED)
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       400:
 *         description: Estado inválido
 *       404:
 *         description: Parada no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.patch("/:id/state", stopsController.updateStopState);




module.exports = router;
