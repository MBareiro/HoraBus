const express = require('express');
const router = express.Router();
const companiesStopsController = require('../controllers/companiesStopsController');

/**
 * @swagger
 * /api/companies_stops/companies/{company_id}/stops:
 *   post:
 *     summary: Asociar paradas a una empresa
 *     description: Crea una asociación entre una empresa y una o más paradas.
 *     tags:
 *       - Companies Stops
 *     parameters:
 *       - in: path
 *         name: company_id
 *         required: true
 *         description: ID de la empresa a asociar con las paradas
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stop_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Lista de IDs de las paradas a asociar con la empresa
 *     responses:
 *       200:
 *         description: Asociación creada con éxito
 *       400:
 *         description: Solicitud incorrecta
 */
router.post('/companies/:company_id/stops', companiesStopsController.associateStopsToCompany);

/**
 * @swagger
 * /api/companies_stops/companies/{company_id}/stops:
 *   delete:
 *     summary: Eliminar paradas de una empresa
 *     description: Elimina las asociaciones de paradas de una empresa.
 *     tags:
 *       - Companies Stops
 *     parameters:
 *       - in: path
 *         name: company_id
 *         required: true
 *         description: ID de la empresa a la que se le eliminarán las paradas
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stop_ids:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 description: Lista de IDs de las paradas a eliminar de la empresa
 *     responses:
 *       200:
 *         description: Paradas eliminadas con éxito
 *       400:
 *         description: Solicitud incorrecta
 */
router.delete('/companies/:company_id/stops', companiesStopsController.removeStopsFromCompany);

/**
 * @swagger
 * /api/companies_stops/companies/{company_id}/stops:
 *   get:
 *     summary: Obtener paradas asociadas a una empresa
 *     description: Obtiene todas las paradas asociadas a una empresa específica.
 *     tags:
 *       - Companies Stops
 *     parameters:
 *       - in: path
 *         name: company_id
 *         required: true
 *         description: ID de la empresa de la que se desean obtener las paradas
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de paradas asociadas a la empresa
 *       404:
 *         description: Empresa no encontrada
 */
router.get('/companies/:company_id/stops', companiesStopsController.getStopsByCompany);

/**
 * @swagger
 * /api/companies_stops/stops/{stop_id}/companies:
 *   get:
 *     summary: Obtener empresas asociadas a una parada
 *     description: Obtiene todas las empresas asociadas a una parada específica.
 *     tags:
 *       - Companies Stops
 *     parameters:
 *       - in: path
 *         name: stop_id
 *         required: true
 *         description: ID de la parada de la que se desean obtener las empresas asociadas
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de empresas asociadas a la parada
 *       404:
 *         description: Parada no encontrada
 */
router.get('/stops/:stop_id/companies', companiesStopsController.getCompaniesByStop);

module.exports = router;
