// src/routes/busesRoutes.js
const express = require('express');
const router = express.Router();
const busesController = require('../controllers/busesController');

/**
 * @swagger
 * /buses:
 *   post:
 *     summary: Crea un nuevo bus.
 *     description: Permite crear un nuevo bus proporcionando los detalles del bus.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       201:
 *         description: Bus creado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       500:
 *         description: Error al crear el bus.
 */
router.post('/', busesController.createBus); // Crear un bus

/**
 * @swagger
 * /buses:
 *   get:
 *     summary: Obtiene todos los buses.
 *     description: Retorna una lista con todos los buses registrados.
 *     responses:
 *       200:
 *         description: Lista de buses.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bus'
 *       500:
 *         description: Error al obtener los buses.
 */
router.get('/', busesController.getAllBuses); // Obtener todos los buses

/**
 * @swagger
 * /buses/{id}:
 *   get:
 *     summary: Obtiene un bus por su ID.
 *     description: Retorna los detalles de un bus específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del bus.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles del bus.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       404:
 *         description: Bus no encontrado.
 *       500:
 *         description: Error al obtener el bus.
 */
router.get('/:id', busesController.getBusById); // Obtener un bus por ID

/**
 * @swagger
 * /buses/{id}:
 *   put:
 *     summary: Actualiza los detalles de un bus.
 *     description: Actualiza los detalles de un bus específico mediante su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del bus a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bus'
 *     responses:
 *       200:
 *         description: Bus actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bus'
 *       404:
 *         description: Bus no encontrado.
 *       500:
 *         description: Error al actualizar el bus.
 */
router.put('/:id', busesController.updateBus); // Actualizar un bus

/**
 * @swagger
 * /buses/{id}:
 *   delete:
 *     summary: Elimina un bus.
 *     description: Elimina el bus especificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del bus a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Bus eliminado exitosamente.
 *       404:
 *         description: Bus no encontrado.
 *       500:
 *         description: Error al eliminar el bus.
 */
router.delete('/:id', busesController.deleteBus); // Eliminar un bus

/**
 * @swagger
 * /buses/buses-by-route:
 *   get:
 *     summary: Obtiene buses por una combinación específica de origen y destino.
 *     description: Permite consultar los buses de una ruta específica, buscando por las paradas de origen y destino.
 *     parameters:
 *       - in: query
 *         name: origin
 *         required: true
 *         description: Nombre de la parada de origen.
 *       - in: query
 *         name: destination
 *         required: true
 *         description: Nombre de la parada de destino.
 *     responses:
 *       200:
 *         description: Lista de buses encontrados en la ruta especificada.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bus'
 *       404:
 *         description: No se encontraron rutas para la combinación de origen y destino.
 *       500:
 *         description: Error al obtener los buses por ruta.
 */
router.get('/buses-by-route', busesController.getBusesByRoute); // Obtener buses por ruta

module.exports = router;
