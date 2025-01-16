const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rutas de autenticación
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *                 description: DNI del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *             example:
 *               dni: 11222333
 *               password: contraseña123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Inicio de sesión exitoso.
 *                 token:
 *                   type: string
 *                   description: Token JWT generado
 *       401:
 *         description: Contraseña incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Contraseña incorrecta.
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Usuario no encontrado.
 *       500:
 *         description: Error interno
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error interno al iniciar sesión.
 */
router.post('/login', authController.loginUser);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Solicitar recuperación de contraseña
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *             example:
 *               email: usuario@example.com
 *     responses:
 *       200:
 *         description: Enlace de recuperación enviado al correo
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error interno
 */
router.post('/forgot-password', authController.forgotPassword);

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Restablecer la contraseña
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de recuperación recibido por correo
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña del usuario
 *             example:
 *               token: 'abc123xyz'
 *               newPassword: 'nuevaContraseña123'
 *     responses:
 *       200:
 *         description: Contraseña actualizada exitosamente
 *       400:
 *         description: Token inválido o expirado
 *       500:
 *         description: Error interno
 */
router.post('/reset-password', authController.resetPassword);

/**
 * @swagger
 * /auth/refresh_token:
 *   post:
 *     summary: Refrescar el token de acceso usando un refresh token válido
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: El refresh token del usuario que se utilizará para obtener un nuevo access token.
 *             example:
 *               refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNjEzMjg0NzM2LCJleHBpcmVkIjoxNjE4NTI3ODIwfQ._7nZqXQ0bDPHST1O0AqRUdd3Hs4yMNfFT5wYwks0X5M'
 *     responses:
 *       200:
 *         description: Token refrescado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token refrescado exitosamente.
 *                 token:
 *                   type: string
 *                   description: El nuevo access token generado.
 *       400:
 *         description: Refresh token necesario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Refresh token es necesario.
 *       403:
 *         description: Refresh token no válido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Refresh token no válido.
 *       500:
 *         description: Error interno al procesar el refresh token.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error al procesar el refresh token.
 */
router.post('/refresh_token', authController.refreshToken);


module.exports = router;
