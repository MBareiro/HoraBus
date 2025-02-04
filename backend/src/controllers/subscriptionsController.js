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

exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    const subscription = await Subscription.create({ email });
    return res.status(201).json({ message: 'Suscripción exitosa', subscription });
  } catch (error) {
    return res.status(500).json({ error: 'Error al suscribirse' });
  }
};

exports.notifySubscribers = async (req, res) => {
  const { message } = req.body; 
  if (!message) {
    return res.status(400).json({ error: "El mensaje es requerido." });
  }

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

    res.status(200).json({ message: "Notificaciones enviadas exitosamente." });
  } catch (error) {
    console.error('Error enviando notificaciones', error);
    res.status(500).json({ error: "Error al enviar notificaciones." });
  }
};

