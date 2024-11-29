const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../../db/models');
const User = db.users;

// El secreto para firmar el JWT (esto debe estar en un archivo de configuración)
const JWT_SECRET = process.env.JWT_SECRET || 'tu-secreto-super-seguro'; // Asegúrate de usar algo seguro

// Login de usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por correo electrónico
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Verificar si la contraseña es correcta
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Contraseña incorrecta.' });
    }

    // Crear un token JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email }, // Información del usuario a incluir en el token
      JWT_SECRET, // El secreto utilizado para firmar el token
      { expiresIn: '1h' } // El tiempo de expiración del token (1 hora)
    );

    // Enviar el token al cliente
    res.status(200).json({ message: 'Inicio de sesión exitoso.', token });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error interno al iniciar sesión.' });
  }
};
