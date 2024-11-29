const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

// Ruta de inicio de sesión
router.post('/login', authController.loginUser);

// Ruta protegida de ejemplo (requiere autenticación)
router.get('/profile', verifyToken, (req, res) => {
  res.status(200).json({ message: 'Acceso permitido', user: req.user });
});

module.exports = router;


