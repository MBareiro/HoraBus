const db = require('../../db/models');
const Company = db.companies; // Accede al modelo 'companies'

// Obtener todas las compañías
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.findAll();
    res.status(200).json(companies);
  } catch (error) {
    console.error('Error al obtener las compañías:', error);
    res.status(500).json({ error: 'Error al obtener las compañías.' });
  }
};

// Obtener una compañía por ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (company) {
      res.status(200).json(company);
    } else {
      res.status(404).json({ error: 'Compañía no encontrada.' });
    }
  } catch (error) {
    console.error('Error al obtener la compañía:', error);
    res.status(500).json({ error: 'Error al obtener la compañía.' });
  }
};

// Crear una nueva compañía
exports.createCompany = async (req, res) => {
  const { name } = req.body;

  try {
    // Verificar si la compañía ya existe
    const existingCompany = await Company.findOne({ where: { name } });
    if (existingCompany) {
      return res.status(409).json({ message: 'La compañía ya existe.' }); 
    }

    // Crear la nueva compañía
    const newCompany = await Company.create({ name });
    res.status(201).json(newCompany);
  } catch (error) {
    console.error('Error al crear la compañía:', error);
    res.status(500).json({ error: 'Error al crear la compañía.' });
  }
};


// Actualizar una compañía existente
exports.updateCompany = async (req, res) => {
  const { name } = req.body;
  
  try {
    const [updated] = await Company.update({ name }, { where: { id: req.params.id } });
    if (updated) {
      const updatedCompany = await Company.findByPk(req.params.id);
      res.status(200).json(updatedCompany);
    } else {
      res.status(404).json({ error: 'Compañía no encontrada.' });
    }
  } catch (error) {
    console.error('Error al actualizar la compañía:', error);
    res.status(500).json({ error: 'Error al actualizar la compañía.' });
  }
};

// Eliminar una compañía
exports.deleteCompany = async (req, res) => {
  try {
    const deleted = await Company.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Compañía no encontrada.' });
    }
  } catch (error) {
    console.error('Error al eliminar la compañía:', error);
    res.status(500).json({ error: 'Error al eliminar la compañía.' });
  }
};
