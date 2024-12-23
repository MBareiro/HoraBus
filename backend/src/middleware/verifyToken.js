const jwt = require('jsonwebtoken');

// Middleware para verificar el JWT y roles
const verifyToken = (requiredRoles = []) => {
  return (req, res, next) => {
   
    
    const token = req.headers['authorization']?.split(' ')[1]; 
    console.log(token);
    if (!token) {
      return res.status(403).json({ error: 'Token no proporcionado.' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      req.user = decoded;       
      if (requiredRoles.length > 0 && !requiredRoles.includes(req.user.role)) {
        return res.status(403).json({ error: 'No tienes los permisos necesarios.' });
      }
      next(); 
    } catch (error) {
      console.error('Error al verificar el token:', error);
      res.status(401).json({ error: 'Token inválido o expirado.' });
    }
  };
};

module.exports = verifyToken;
