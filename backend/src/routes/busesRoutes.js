const express = require('express');
const router = express.Router();
const busesController = require('../controllers/busesController');

/**
 * @swagger
 * tags:
 *   - name: Buses
 *     description: Endpoints para gestionar los buses
 */

/**
 * @swagger
 * /buses:
 *   post:
 *     summary: Crea un nuevo bus
 *     tags: [Buses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - company_id
 *               - line
 *               - bus_type
 *               - route_id
 *             properties:
 *               company_id:
 *                 type: integer
 *                 description: ID de la compañía propietaria del bus
 *               line:
 *                 type: string
 *                 description: Número o nombre de la línea del bus
 *               bus_type:
 *                 type: string
 *                 description: Tipo de bus (Ej. urbano, interurbano)
 *               route_id:
 *                 type: integer
 *                 description: ID de la ruta a la que pertenece el bus
 *     responses:
 *       201:
 *         description: Bus creado exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 *       500:
 *         description: Error en el servidor
 */
router.post('/', busesController.createBus);

/**
 * @swagger
 * /buses:
 *   get:
 *     summary: Obtiene todos los buses
 *     tags: [Buses]
 *     responses:
 *       200:
 *         description: Lista de buses obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   company_id:
 *                     type: integer
 *                   line:
 *                     type: string
 *                   bus_type:
 *                     type: string
 *                   route_id:
 *                     type: integer
 *       500:
 *         description: Error en el servidor
 */
router.get('/', busesController.getAllBuses);

/**
 * @swagger
 * /buses/{id}:
 *   get:
 *     summary: Obtiene un bus específico por ID
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del bus
 *     responses:
 *       200:
 *         description: Bus encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 company_id:
 *                   type: integer
 *                 line:
 *                   type: string
 *                 bus_type:
 *                   type: string
 *                 route_id:
 *                   type: integer
 *       404:
 *         description: Bus no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', busesController.getBusById);

/**
 * @swagger
 * /buses/{id}:
 *   delete:
 *     summary: Elimina un bus específico por ID
 *     tags: [Buses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del bus
 *     responses:
 *       200:
 *         description: Bus eliminado exitosamente
 *       404:
 *         description: Bus no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', busesController.deleteBus);

/**
 * 
 * /buses/buses-by-route:
 *   get:
 *     summary: Obtiene los buses por ruta
 *     tags: [Buses]
 *     parameters:
 *       - in: query
 *         name: route_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ruta por la que se filtran los buses
 *     responses:
 *       200:
 *         description: Lista de buses por ruta obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   company_id:
 *                     type: integer
 *                   line:
 *                     type: string
 *                   bus_type:
 *                     type: string
 *                   route_id:
 *                     type: integer
 *       400:
 *         description: Ruta no válida
 *       500:
 *         description: Error en el servidor
 */
router.get('/buses-by-route', busesController.getBusesByRoute);

module.exports = router;
