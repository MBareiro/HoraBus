const express = require('express');
const router = express.Router();
const companiesController = require('../controllers/companiesController');
/**
 * @swagger
 * /companies:
 *   get:
 *     summary: Obtiene todas las compañías.
 *     description: Retorna una lista con todas las compañías registradas.
 *     responses:
 *       200:
 *         description: Lista de compañías.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company' 
 *       500:
 *         description: Error al obtener las compañías.
 */
router.get('/', companiesController.getAllCompanies);

/**
 * @swagger
 * /companies/{id}:
 *   get:
 *     summary: Obtiene una compañía por su ID.
 *     description: Retorna los detalles de una compañía específica.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la compañía.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalles de la compañía.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'  
 *       404:
 *         description: Compañía no encontrada.
 *       500:
 *         description: Error al obtener la compañía.
 */
router.get('/:id', companiesController.getCompanyById);

/**
 * @swagger
 * /companies:
 *   post:
 *     summary: Crea una nueva compañía.
 *     description: Permite crear una nueva compañía proporcionando su nombre.
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
 *                 description: Nombre de la compañía.
 *     responses:
 *       201:
 *         description: Compañía creada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       500:
 *         description: Error al crear la compañía.
 */
router.post('/', companiesController.createCompany);

/**
 * @swagger
 * /companies/{id}:
 *   put:
 *     summary: Actualiza una compañía existente.
 *     description: Permite actualizar los detalles de una compañía existente por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la compañía a actualizar.
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
 *                 description: Nombre de la compañía.
 *     responses:
 *       200:
 *         description: Compañía actualizada exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: Compañía no encontrada.
 *       500:
 *         description: Error al actualizar la compañía.
 */
router.put('/:id', companiesController.updateCompany);

/**
 * @swagger
 * /companies/{id}:
 *   delete:
 *     summary: Elimina una compañía por su ID.
 *     description: Elimina la compañía especificada por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la compañía a eliminar.
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Compañía eliminada exitosamente.
 *       404:
 *         description: Compañía no encontrada.
 *       500:
 *         description: Error al eliminar la compañía.
 */
router.delete('/:id', companiesController.deleteCompany);

module.exports = router;
