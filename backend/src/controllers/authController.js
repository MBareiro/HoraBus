const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db/models");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Op } = require('sequelize');
const User = db.users;
const JWT_SECRET = process.env.JWT_SECRET; 

// Configuración de nodemailer (para enviar correos)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,  
  },
});

// Login de usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario por correo electrónico
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Verificar si la contraseña es correcta
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }

    // Crear un token JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role }, // Incluye el rol en el token
      JWT_SECRET, // El secreto utilizado para firmar el token
      { expiresIn: "1h" } // El tiempo de expiración del token (1 hora)
    );

    // Enviar el token al cliente
    res.status(200).json({ message: "Inicio de sesión exitoso.", token });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error interno al iniciar sesión." });
  }
};

// Recuperación de contraseña - Solicitar enlace
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Generar un token de restablecimiento
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetExpiration = Date.now() + 3600000; // 1 hora

    // Guardar el token y su fecha de expiración en la base de datos
    user.reset_password_token = resetToken;
    user.reset_password_expiration = resetExpiration;
    await user.save();

    // Enviar el correo electrónico con el enlace de restablecimiento
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Recuperación de contraseña',
      text: `Haga clic en el siguiente enlace para restablecer su contraseña: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Enlace de recuperación enviado a su correo electrónico.' });

  } catch (error) {
    console.error('Error al enviar el enlace de recuperación:', error);
    res.status(500).json({ error: 'Error interno al solicitar la recuperación de contraseña.' });
  }
};

// Restablecer la contraseña
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      where: {
        reset_password_token: token,
        reset_password_expiration: { [Op.gt]: Date.now() }, // Usar Op.gt para "mayor que"
      },
    });

    if (!user) {
      return res.status(400).json({ error: 'Token inválido o expirado.' });
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Actualizar la contraseña y limpiar el token
    user.password = hashedPassword;
    user.reset_password_token = null;
    user.reset_password_expiration = null;
    await user.save();
    console.log(user.password);
    res.status(200).json({ message: 'Contraseña actualizada exitosamente.' });

  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ error: 'Error interno al restablecer la contraseña.' });
  }
};