const express = require('express');
const router = express.Router();
const stopsController = require('../controllers/stopsController');

/**
 * @swagger
 * tags:
 *   - name: Stops
 *     description: Endpoints para gestionar las paradas de colectivos
 */

/**
 * @swagger
 * /stops:
 *   get:
 *     summary: Obtiene todas las paradas
 *     tags: [Stops]
 *     responses:
 *       200:
 *         description: Lista de paradas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   latitude:
 *                     type: number
 *                     format: float
 *                   longitude:
 *                     type: number
 *                     format: float
 *       500:
 *         description: Error en el servidor
 */
router.get('/', stopsController.getAllStops);

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
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 latitude:
 *                   type: number
 *                   format: float
 *                 longitude:
 *                   type: number
 *                   format: float
 *       404:
 *         description: Parada no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', stopsController.getStopById);

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
 *               - latitude
 *               - longitude
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la parada
 *               latitude:
 *                 type: number
 *                 format: float
 *                 description: Latitud de la parada
 *               longitude:
 *                 type: number
 *                 format: float
 *                 description: Longitud de la parada
 *     responses:
 *       201:
 *         description: Parada creada exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 *       500:
 *         description: Error en el servidor
 */
router.post('/', stopsController.createStop);

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
 *               latitude:
 *                 type: number
 *                 format: float
 *                 description: Latitud de la parada
 *               longitude:
 *                 type: number
 *                 format: float
 *                 description: Longitud de la parada
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
router.put('/:id', stopsController.updateStop);

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
router.delete('/:id', stopsController.deleteStop);

module.exports = router;
