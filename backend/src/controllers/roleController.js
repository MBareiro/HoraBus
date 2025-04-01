const db = require('../../db/models');
const Role = db.roles; 

const roleController = {
  // Obtener todos los roles
  async getAllRoles(req, res) {
    try {
      const roles = await Role.findAll();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los roles', details: error.message });
    }
  },

  // Obtener un rol por ID
  async getRoleById(req, res) {
    try {
      const { id } = req.params;
      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el rol', details: error.message });
    }
  },

  // Crear un nuevo rol
  async createRole(req, res) {
    try {
      const { name } = req.body;

      // Verificar si el rol ya existe
      const existingRole = await Role.findOne({ where: { name } });
      if (existingRole) {
        return res.status(400).json({ error: 'El rol ya existe' });
      }

      const role = await Role.create({ name });
      res.status(201).json(role);
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el rol', details: error.message });
    }
  },

  // Actualizar un rol
  async updateRole(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }

      // Verificar si el nombre ya está en uso por otro rol
      const existingRole = await Role.findOne({ where: { name } });
      if (existingRole && existingRole.id !== role.id) {
        return res.status(400).json({ error: 'El nombre del rol ya está en uso' });
      }

      role.name = name;
      await role.save();

      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el rol', details: error.message });
    }
  },

  // Eliminar un rol
  async deleteRole(req, res) {
    try {
      const { id } = req.params;

      const role = await Role.findByPk(id);
      if (!role) {
        return res.status(404).json({ error: 'Rol no encontrado' });
      }

      await role.destroy();
      res.status(200).json({ message: 'Rol eliminado correctamente' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el rol', details: error.message });
    }
  },
};

module.exports = roleController;
