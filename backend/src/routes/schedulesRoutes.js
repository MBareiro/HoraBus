const express = require('express');
const router = express.Router();
const schedulesController = require('../controllers/schedulesController');

/**
 * @swagger
 * tags:
 *   - name: Schedules
 *     description: Endpoints para gestionar horarios de colectivos
 */

/**
 * @swagger
 * /schedules:
 *   get:
 *     summary: Obtiene todos los horarios
 *     tags: [Schedules]
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *         description: Origen del horario
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *         description: Destino del horario
 *       - in: query
 *         name: day
 *         schema:
 *           type: string
 *         description: Día de la semana
 *       - in: query
 *         name: company
 *         schema:
 *           type: integer
 *         description: ID de la empresa
 *     responses:
 *       200:
 *         description: Lista de horarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   observations:
 *                     type: string
 *                   departure_time:
 *                     type: string
 *       404:
 *         description: No se encontraron horarios
 */
router.get('/', schedulesController.getSchedules);

/**
 * @swagger
 * /schedules/{id}:
 *   get:
 *     summary: Obtiene un horario específico
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del horario
 *     responses:
 *       200:
 *         description: Horario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 observations:
 *                   type: string
 *                 departure_time:
 *                   type: string
 *       404:
 *         description: Horario no encontrado
 */
router.get('/:id', schedulesController.getScheduleById);

/**
 * @swagger
 * /schedules:
 *   post:
 *     summary: Crea un nuevo horario y, si es necesario, una ruta asociada
 *     tags: [Schedules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - observations
 *               - departure_time
 *               - origin
 *               - destination
 *               - company_id
 *             properties:
 *               observations:
 *                 type: string
 *                 description: Observación sobre el horario (e.g., "Todos los días", "Fines de semana").
 *                 example: "Todos los días"
 *               departure_time:
 *                 type: string
 *                 description: Hora de salida en formato HH:MM (24 horas).
 *                 example: "08:30"
 *               origin:
 *                 type: string
 *                 description: Nombre de la parada de origen.
 *                 example: "Terminal A"
 *               destination:
 *                 type: string
 *                 description: Nombre de la parada de destino.
 *                 example: "Terminal B"
 *               company_id:
 *                 type: integer
 *                 description: ID de la compañía que opera la ruta.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Horario y ruta creados exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Horario y ruta creados exitosamente.
 *                 schedule:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: ID del horario recién creado.
 *                       example: 101
 *                     observations:
 *                       type: string
 *                       description: Observación del horario.
 *                       example: "Todos los días"
 *                     departure_time:
 *                       type: string
 *                       description: Hora de salida del horario.
 *                       example: "08:30"
 *                     route_id:
 *                       type: integer
 *                       description: ID de la ruta asociada al horario.
 *                       example: 50
 *       400:
 *         description: Faltan datos obligatorios o datos inválidos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Faltan datos obligatorios.
 *       404:
 *         description: Paradas no encontradas (origen o destino).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Parada de origen 'Terminal A' no encontrada.
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error al crear el horario o la ruta.
 */
router.post('/', schedulesController.createSchedule);

/**
 * @swagger
 * /schedules/{id}:
 *   put:
 *     summary: Actualiza un horario existente
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del horario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               observations:
 *                 type: string
 *               departure_time:
 *                 type: string
 *               route_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Horario actualizado exitosamente
 *       404:
 *         description: Horario no encontrado
 */
router.put('/:id', schedulesController.updateSchedule);

/**
 * @swagger
 * /schedules/{id}:
 *   delete:
 *     summary: Elimina un horario existente
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del horario a eliminar
 *     responses:
 *       200:
 *         description: Horario eliminado exitosamente
 *       404:
 *         description: Horario no encontrado
 */
router.delete('/:id', schedulesController.deleteSchedule);

module.exports = router;
