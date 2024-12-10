const db = require('../../db/models');
const User = db.users;
const bcrypt = require('bcryptjs');

// Obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
};

// Obtener un usuario por ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado.' });
    }
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario.' });
  }
};

// Crear un nuevo usuario

exports.createUser = async (req, res) => {
  const { name, email, password, role, company_id } = req.body;

  if (!name || !email || !password || !role || !company_id) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const validRoles = ['Administrator', 'Operator', 'Driver', 'User'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: `El rol debe ser uno de los siguientes: ${validRoles.join(', ')}.` });
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    return res.status(400).json({ error: passwordError });
  }

  try {
    // Verificar si el correo electrónico ya está registrado
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
    }

    // Crear el nuevo usuario
    const newUser = await User.create({ name, email, password, role, company_id });

    res.status(201).json({
      message: 'Usuario creado exitosamente.',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        company_id: newUser.company_id,
      },
    });
  } catch (error) {
    console.error('Error al crear el usuario:', error);

    // Manejar errores específicos de Sequelize, como violaciones de claves foráneas
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return res.status(400).json({ error: 'La empresa especificada no existe.' });
    }

    res.status(500).json({ error: 'Error interno al crear el usuario.', details: error.message });
  }
};


// Actualizar un usuario existente
exports.updateUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const [updated] = await User.update({ name, email, password, role, company_id }, {
      where: { id: req.params.id }
    });

    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado.' });
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ error: 'Error al actualizar el usuario.' });
  }
};

// Eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Usuario no encontrado.' });
    }
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ error: 'Error al eliminar el usuario.' });
  }
};

const validatePassword = (password) => {
  const minLength = 8;
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (password.length < minLength) {
    return `La contraseña debe tener al menos ${minLength} caracteres.`;
  }
  /* if (!regex.test(password)) {
    return 'La contraseña debe incluir al menos una letra mayúscula, una minúscula, un número y un carácter especial.';
  } */

  return null; 
};
