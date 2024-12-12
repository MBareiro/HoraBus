// src/routes/gpsRoutes.js
const express = require('express');
const router = express.Router();
const { receiveCoordinates } = require('../controllers/gpsController');

/**
 * @swagger
 * tags:
 *   name: GPS
 *   description: Rutas para gestionar las coordenadas del GPS
 */

/**
 * @swagger
 * /gps:
 *   post:
 *     summary: Recibir coordenadas del GPS
 *     tags: [GPS]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               latitude:
 *                 type: number
 *                 format: float
 *                 description: Latitud del colectivo
 *               longitude:
 *                 type: number
 *                 format: float
 *                 description: Longitud del colectivo
 *               timestamp:
 *                 type: string
 *                 description: Marca de tiempo cuando se registran las coordenadas
 *             example:
 *               latitude: 40.7128
 *               longitude: -74.0060
 *               timestamp: '2024-12-12T10:30:00Z'
 *     responses:
 *       200:
 *         description: Coordenadas recibidas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Coordenadas recibidas exitosamente.
 *       400:
 *         description: Petición inválida, faltan parámetros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Parámetros incorrectos en la petición.
 *       500:
 *         description: Error interno al procesar las coordenadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al procesar las coordenadas.
 */
router.post('/', receiveCoordinates);

module.exports = router;
