const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../../db/models");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Op } = require('sequelize');
const User = db.users;
const PasswordReset = db.password_resets;
const transporter = require('../../config/mailer');

// Login de usuario
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta." });
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role, company_id: user.company_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.REFRESH_TOKEN_SECRET, 
      { expiresIn: '7d' }
    );

    res.status(200).json({ 
      message: "Inicio de sesión exitoso.",
      token, 
      refreshToken 
    });
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

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetExpiration = new Date(Date.now() + 3600000); // 1 hora

    await PasswordReset.create({
      user_id: user.id,
      reset_password_token: resetToken,
      reset_password_expiration: resetExpiration,
    });

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
    const passwordReset = await PasswordReset.findOne({
      where: {
        reset_password_token: token,
        reset_password_expiration: { [Op.gt]: new Date() },
      },
    });

    if (!passwordReset) {
      return res.status(400).json({ error: 'Token inválido o expirado.' });
    }

    const user = await User.findByPk(passwordReset.user_id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    await PasswordReset.destroy({ where: { id: passwordReset.id } });

    res.status(200).json({ message: 'Contraseña actualizada exitosamente.' });

  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ error: 'Error interno al restablecer la contraseña.' });
  }
};


exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(400).json({ error: "El refresh token es necesario." });
  }
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "El refresh token es inválido o ha expirado." });
      }

      const user = await User.findOne({ where: { id: decoded.userId } });

      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado." });
      }

      const newToken = jwt.sign(
        { id: user.id, name: user.name, email: user.email, role: user.role, company_id: user.company_id },
        process.env.JWT_SECRET, 
        { expiresIn: "1h" } 
      );
      return res.status(200).json({ message: "Access token renovado.", token: newToken });
    });
  } catch (error) {
    console.error("Error al refrescar el token:", error);
    return res.status(500).json({ error: "Error al intentar refrescar el token." });
  }
};