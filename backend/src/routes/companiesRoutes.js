const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companiesController');

/**
 * @swagger
 * tags:
 *   - name: Companies
 *     description: Endpoints para gestionar las compañías
 */

/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Obtiene todas las compañías
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: Lista de compañías obtenida exitosamente
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
router.get('/', companiesController.getAllCompanies);

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Obtiene una compañía específica por ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la compañía
 *     responses:
 *       200:
 *         description: Compañía encontrada
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
 *         description: Compañía no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', companiesController.getCompanyById);

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Crea una nueva compañía
 *     tags: [Companies]
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
 *                 description: Nombre de la compañía
 *     responses:
 *       201:
 *         description: Compañía creada exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 *       500:
 *         description: Error en el servidor
 */
router.post('/', companiesController.createCompany);

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Actualiza una compañía específica por ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la compañía
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
 *                 description: Nombre de la compañía
 *     responses:
 *       200:
 *         description: Compañía actualizada exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 *       404:
 *         description: Compañía no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.put('/:id', companiesController.updateCompany);

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Elimina una compañía específica por ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la compañía
 *     responses:
 *       200:
 *         description: Compañía eliminada exitosamente
 *       404:
 *         description: Compañía no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/:id', companiesController.deleteCompany);

module.exports = router;
