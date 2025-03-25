const express = require('express');
const router = express.Router();
const stopsController = require('../controllers/stopsController');

/**
 * @swagger
 * tags:
 *   name: Stops
 *   description: Endpoints para la gestión de paradas
 */

/**
 * @swagger
 * /api/stops:
 *   get:
 *     summary: Obtener todas las paradas
 *     tags: [Stops]
 *     responses:
 *       200:
 *         description: Lista de todas las paradas
 */
router.get('/', stopsController.getAllStops);

/**
 * @swagger
 * /api/stops/{id}:
 *   get:
 *     summary: Obtener una parada por ID
 *     tags: [Stops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la parada
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles de la parada
 *       404:
 *         description: Parada no encontrada
 */
router.get('/:id', stopsController.getStopById);

/**
 * @swagger
 * /api/stops:
 *   post:
 *     summary: Crear una nueva parada
 *     tags: [Stops]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: object
 *                 properties:
 *                   latitude:
 *                     type: number
 *                   longitude:
 *                     type: number
 *               state:
 *                 type: string
 *                 enum: [enabled, disabled, PENDING]
 *     responses:
 *       201:
 *         description: Parada creada exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', stopsController.createStop);

/**
 * @swagger
 * /api/stops/{id}:
 *   put:
 *     summary: Actualizar una parada
 *     tags: [Stops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la parada
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               state:
 *                 type: string
 *                 enum: [enabled, disabled]
 *     responses:
 *       200:
 *         description: Parada actualizada correctamente
 *       404:
 *         description: Parada no encontrada
 */
router.put('/:id', stopsController.updateStop);

/**
 * @swagger
 * /api/stops/{id}:
 *   delete:
 *     summary: Eliminar una parada
 *     tags: [Stops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la parada
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Parada eliminada exitosamente
 *       404:
 *         description: Parada no encontrada
 */
router.delete('/:id', stopsController.deleteStop);

/**
 * @swagger
 * /api/stops/{id}/state:
 *   patch:
 *     summary: Actualizar el estado de una parada
 *     tags: [Stops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la parada
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
 *                 enum: [enabled, disabled]
 *     responses:
 *       200:
 *         description: Estado actualizado correctamente
 *       400:
 *         description: Estado inválido
 */
router.patch('/:id/state', stopsController.updateStopState);

/**
 * @swagger
 * /api/stops/origins:
 *   get:
 *     summary: Obtener paradas de origen disponibles
 *     tags: [Stops]
 *     responses:
 *       200:
 *         description: Lista de paradas de origen disponibles
 */
router.get('/origins', stopsController.getAvailableOrigins);

/**
 * @swagger
 * /api/stops/destinations/{originId}:
 *   get:
 *     summary: Obtener destinos desde un origen específico
 *     tags: [Stops]
 *     parameters:
 *       - in: path
 *         name: originId
 *         required: true
 *         description: ID del origen
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de destinos disponibles
 */
router.get('/destinations/:originId', stopsController.getDestinationsByOrigin);

/**
 * @swagger
 * /api/stops/company:
 *   get:
 *     summary: Obtener paradas asociadas a la empresa del usuario
 *     tags: [Stops]
 *     responses:
 *       200:
 *         description: Lista de paradas de la empresa
 */
router.get('/company', stopsController.getCompanyStops);

module.exports = router;