const express = require('express');
const router = express.Router();
const subscriptionsController = require('../controllers/subscriptionsController');

/**
 * @swagger
 * /api/subscriptions/subscribe:
 *   post:
 *     summary: Suscribirse a notificaciones de cambios de horario
 *     description: Permite a los usuarios suscribirse proporcionando su correo electrónico.
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@example.com
 *     responses:
 *       201:
 *         description: Suscripción creada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post('/subscribe', subscriptionsController.subscribe);

/**
 * @swagger
 * /api/subscriptions/notify:
 *   post:
 *     summary: Notificar a los suscriptores sobre cambios en los horarios
 *     description: Envía correos electrónicos a todos los usuarios suscritos notificándoles sobre cambios en los horarios.
 *     tags: [Subscriptions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: Mensaje que se enviará a los suscriptores.
 *                 example: "Se han actualizado los horarios de los colectivos."
 *     responses:
 *       200:
 *         description: Notificaciones enviadas exitosamente
 *       400:
 *         description: El mensaje es requerido
 *       500:
 *         description: Error interno del servidor
 */
router.post('/notify', subscriptionsController.notifySubscribers);

module.exports = router;
