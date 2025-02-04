const { Subscription } = require('../../db/models');
const nodemailer = require('nodemailer');

// Configurar transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Suscribirse
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    const subscription = await Subscription.create({ email });
    return res.status(201).json({ message: 'Suscripción exitosa', subscription });
  } catch (error) {
    return res.status(500).json({ error: 'Error al suscribirse' });
  }
};

// Enviar notificación a todos los suscriptores
exports.notifySubscribers = async (message) => {
  try {
    const subscribers = await Subscription.findAll();
    const emails = subscribers.map((s) => s.email);

    if (emails.length > 0) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: emails,
        subject: 'Actualización en Horarios de Buses',
        text: message
      });
    }
  } catch (error) {
    console.error('Error enviando notificaciones', error);
  }
};
