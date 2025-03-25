const db = require('../../db/models');
const bcrypt = require('bcryptjs');
const User = db.users;
const Company = db.companies;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (!users || users.length === 0) {
      return res.status(404).json({
        message: 'No se encontraron usuarios.',
      });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
};

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

exports.createUser = async (req, res) => {
  const { name, dni, email, password, role, company_id } = req.body;
  console.log(email);
  
  try {
    const company = await Company.findByPk(company_id);
    if (!company) {
      return res.status(400).json({ error: 'La compañía especificada no existe.' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'El correo electrónico ya está registrado.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, dni, email, password: hashedPassword, role, company_id });

    res.status(201).json({
      message: 'Usuario creado exitosamente.',
      user: {
        id: newUser.id,
        name: newUser.name,
        dni: newUser.dni,
        email: newUser.email,
        role: newUser.role,
        company_id: newUser.company_id,
      },
    });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ error: 'Error interno al crear el usuario.' });
  }
};


exports.updateUser = async (req, res) => {
  const { name, dni, email, role, company_id } = req.body;
  const userId = req.params.id;

  try {
    // Validar que el DNI no se encuentre asignado a otro usuario
    if (dni) {
      const existingUserWithDni = await User.findOne({ where: { dni } });
      if (existingUserWithDni && existingUserWithDni.id !== userId) {
        return res.status(400).json({ error: 'El DNI ya está registrado para otro usuario.' });
      }
    }

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (dni) updatedFields.dni = dni;
    if (email) updatedFields.email = email;
    if (role) updatedFields.role = role;
    if (company_id) updatedFields.company_id = company_id;

    const [updated] = await User.update(updatedFields, { where: { id: userId } });

    if (updated) {
      const updatedUser = await User.findByPk(userId);
      return res.status(200).json(updatedUser);
    } else {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return res.status(500).json({ error: 'Error al actualizar el usuario.' });
  }
};

exports.updatePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const userId = req.params.id;

  try {
    // Buscar el usuario en la base de datos
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Verificar que la contraseña actual proporcionada sea correcta
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'La contraseña actual es incorrecta.' });
    }

    // Cifrar la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña del usuario
    await user.update({ password: hashedPassword });

    res.status(200).json({ message: 'Contraseña actualizada exitosamente.' });
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    return res.status(500).json({ error: 'Error al actualizar la contraseña.' });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });

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
