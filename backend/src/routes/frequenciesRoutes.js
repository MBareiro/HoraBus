const express = require('express');
const router = express.Router();
const frequenciesController = require('../controllers/frequenciesController');
const frequencyValidator = require('../validators/frequencyValidator');
const validationErrorHandler = require('../middleware/validationErrorHandler');

/**
 * @swagger
 * tags:
 *   - name: Frequencies
 *     description: Endpoints para gestionar las frecuencias de colectivos
 */

/**
 * @swagger
 * /frequencies:
 *   get:
 *     summary: Obtiene todas las frecuencias
 *     tags: [Frequencies]
 *     responses:
 *       200:
 *         description: Lista de frecuencias obtenida exitosamente
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
 *       500:
 *         description: Error en el servidor
 */
router.get('/', frequenciesController.getAllFrequency);

/**
 * @swagger
 * /frequencies/{id}:
 *   get:
 *     summary: Obtiene una frecuencia específica
 *     tags: [Frequencies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la frecuencia
 *     responses:
 *       200:
 *         description: Frecuencia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       404:
 *         description: Frecuencia no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', frequencyValidator.getFrequencyByIdValidator, validationErrorHandler, frequenciesController.getFrequencyById);

/**
 * @swagger
 * /frequencies:
 *   post:
 *     summary: Crea una nueva frecuencia
 *     tags: [Frequencies]
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
 *                 description: Nombre de la frecuencia
 *     responses:
 *       201:
 *         description: Frecuencia creada exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 *       500:
 *         description: Error en el servidor
 */
router.post('/', frequencyValidator.createFrequencyValidator, validationErrorHandler, frequenciesController.createFrequency );

/**
 * @swagger
 * /frequencies/{id}:
 *   put:
 *     summary: Actualiza una frecuencia existente
 *     tags: [Frequencies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la frecuencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre de la frecuencia
 *     responses:
 *       200:
 *         description: Frecuencia actualizada exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 *       404:
 *         description: Frecuencia no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', frequencyValidator.updateFrequencyValidator, validationErrorHandler, frequenciesController.updateFrequency );

/**
 * @swagger
 * /frequencies/{id}:
 *   delete:
 *     summary: Elimina una frecuencia existente
 *     tags: [Frequencies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la frecuencia
 *     responses:
 *       200:
 *         description: Frecuencia eliminada exitosamente
 *       404:
 *         description: Frecuencia no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', frequencyValidator.deleteFrequencyValidator, validationErrorHandler, frequenciesController.deleteFrequency);

module.exports = router;
