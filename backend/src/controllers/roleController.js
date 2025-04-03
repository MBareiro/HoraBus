const db = require('../../db/models');
const { roles } = db;

// Obtener todos los roles
exports.getAllRoles = async (req, res) => {
  try {
    const Roles = await roles.findAll();
    res.status(200).json(Roles);
  } catch (error) {
    console.error('Error al obtener los roles:', error);
    res.status(500).json({ error: 'Error al obtener los roles.' });
  }
};

// Obtener un rol por ID
exports.getRoleById = async (req, res) => {
  try {
    const role = await roles.findByPk(req.params.id);
    if (role) {
      res.status(200).json(role);
    } else {
      res.status(404).json({ error: 'Rol no encontrado.' });
    }
  } catch (error) {
    console.error('Error al obtener el rol:', error);
    res.status(500).json({ error: 'Error al obtener el rol.' });
  }
};

// Crear un nuevo rol
exports.createRole = async (req, res) => {
  const { name } = req.body;
  try {
    const existingRole = await roles.findOne({ where: { name } });
    if (existingRole) {
      return res.status(409).json({ message: 'El rol ya existe.' });
    }
    const newRole = await roles.create({ name });
    res.status(201).json(newRole);
  } catch (error) {
    console.error('Error al crear el rol:', error);
    res.status(500).json({ error: 'Error al crear el rol.', details: error.message });
  }
};

// Actualizar un rol existente
exports.updateRole = async (req, res) => {
  const { name } = req.body;
  try {
    const [updated] = await roles.update({ name }, { where: { id: req.params.id } });
    if (updated) {
      const updatedRole = await roles.findByPk(req.params.id);
      res.status(200).json(updatedRole);
    } else {
      res.status(404).json({ error: 'Rol no encontrado.' });
    }
  } catch (error) {
    console.error('Error al actualizar el rol:', error);
    res.status(500).json({ error: 'Error al actualizar el rol.' });
  }
};

// Eliminar un rol
exports.deleteRole = async (req, res) => {
  try {
    const deleted = await roles.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Rol no encontrado.' });
    }
  } catch (error) {
    console.error('Error al eliminar el rol:', error);
    res.status(500).json({ error: 'Error al eliminar el rol.' });
  }
};