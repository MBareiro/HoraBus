const express = require('express');
const router = express.Router();
const routesController = require('../controllers/routesController');
const routeValidator = require('../validators/routeValidators');
const validationErrorHandler = require('../middleware/validationErrorHandler');
const verifyToken = require('../middleware/verifyToken');

/**
 * @swagger
 * tags:
 *   - name: Routes
 *     description: Endpoints para gestionar las rutas de colectivos
 */

/**
 * @swagger
 * /routes:
 *   get:
 *     summary: Obtiene todas las rutas
 *     tags: [Routes]
 *     responses:
 *       200:
 *         description: Lista de rutas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   origin:
 *                     type: integer
 *                   destination:
 *                     type: integer
 *                   company_id:
 *                     type: integer
 *       500:
 *         description: Error en el servidor
 */
router.get('/', routesController.getAllRoutes);

/**
 * @swagger
 * /routes/{id}:
 *   get:
 *     summary: Obtiene una ruta específica
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ruta
 *     responses:
 *       200:
 *         description: Ruta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 origin:
 *                   type: integer
 *                 destination:
 *                   type: integer
 *                 company_id:
 *                   type: integer
 *       404:
 *         description: Ruta no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', routeValidator.getRouteByIdValidator , validationErrorHandler, routesController.getRouteById);

/**
 * @swagger
 * /routes:
 *   post:
 *     summary: Crea una nueva ruta
 *     tags: [Routes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - origin
 *               - destination
 *               - company_id
 *             properties:
 *               origin:
 *                 type: integer
 *                 description: ID de la parada de origen
 *               destination:
 *                 type: integer
 *                 description: ID de la parada de destino
 *               company_id:
 *                 type: integer
 *                 description: ID de la empresa responsable de la ruta
 *     responses:
 *       201:
 *         description: Ruta creada exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 *       500:
 *         description: Error en el servidor
 */
router.post('/', routeValidator.createRouteValidator , validationErrorHandler, routesController.createRoute);

/**
 * @swagger
 * /routes/{id}:
 *   put:
 *     summary: Actualiza una ruta existente
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ruta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               origin:
 *                 type: integer
 *                 description: ID de la parada de origen
 *               destination:
 *                 type: integer
 *                 description: ID de la parada de destino
 *               company_id:
 *                 type: integer
 *                 description: ID de la empresa responsable de la ruta
 *     responses:
 *       200:
 *         description: Ruta actualizada exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 *       404:
 *         description: Ruta no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', routeValidator.updateRouteValidator , validationErrorHandler, routesController.updateRoute);

/**
 * @swagger
 * /routes/{id}:
 *   delete:
 *     summary: Elimina una ruta existente
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la ruta
 *     responses:
 *       200:
 *         description: Ruta eliminada exitosamente
 *       404:
 *         description: Ruta no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', routeValidator.deleteRouteValidator , validationErrorHandler, routesController.deleteRoute);

/**
 * @swagger
 * /routes/routes/{id}:
 *   get:
 *     summary: Obtiene todas las rutas donde el ID de la parada es el origen
 *     tags: [Routes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la parada de origen (Ej. 1)
 *     responses:
 *       200:
 *         description: Rutas encontradas desde la parada con el ID especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   origin:
 *                     type: integer
 *                   destination:
 *                     type: integer
 *                   company_id:
 *                     type: integer
 *       404:
 *         description: No se encontraron rutas desde la parada con el ID especificado
 *       500:
 *         description: Error en el servidor
 */
router.get('/routes/:id', routesController.getRoutesFromStop);


module.exports = router;
