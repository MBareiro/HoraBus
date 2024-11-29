const jwt = require('jsonwebtoken');

// Middleware para verificar el JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Obtener el token del header Authorization

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado.' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificamos el token con el secreto
    req.user = decoded; // Almacenar la información decodificada en la solicitud (req.user)
    next(); // Continuar con la ejecución de la siguiente función/middleware
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ error: 'Token inválido o expirado.' });
  }
};

module.exports = verifyToken;
