
const db = require('../../db/models'); // Ajusta la ruta según tu estructura de carpetas
const Company = db.companies; // Accede al modelo 'companies'

// Obtener todas las compañías
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.findAll();
        res.status(200).json(companies);
    } catch (error) {
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
        res.status(500).json({ error: 'Error al obtener la compañía.' });
    }
};

// Crear una nueva compañía
exports.createCompany = async (req, res) => {
    const { name } = req.body;
    console.log(name);
    try {
        const newCompany = await Company.create({ name });
        res.status(201).json(newCompany);
    } catch (error) {
        console.error('Error al crear la compañía:', error); // Log del error en la consola
        res.status(500).json({ error: 'Error al crear la compañía.', details: error.message });
    }
};


// Actualizar una compañía existente
exports.updateCompany = async (req, res) => {
    const { name } = req.body;
    try {
        const [updated] = await Company.update({ name }, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedCompany = await Company.findByPk(req.params.id);
            res.status(200).json(updatedCompany);
        } else {
            res.status(404).json({ error: 'Compañía no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la compañía.' });
    }
};

// Eliminar una compañía
exports.deleteCompany = async (req, res) => {
    try {
        const deleted = await Company.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Compañía no encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la compañía.' });
    }
};
