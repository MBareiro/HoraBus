const companyService = require('../services/companyService');

class CompanyController {
  async create(req, res) {
    try {
      const company = await companyService.registerCompany(req.body);
      res.status(201).json(company);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async get(req, res) {
    try {
      const company = await companyService.getCompany(req.params.id);
      if (company) {
        res.json(company);
      } else {
        res.status(404).json({ error: 'Company not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }  


    async update(req, res) {
    try {
      const company = await companyService.updateCompany(req.params.id, req.body);
      if (company) {
        res.json(company);
      } else {
        res.status(404).json({ error: 'Company not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await companyService.deleteCompany(req.params.id);
      if (deleted) {
        res.status(204).send(); // Sin contenido
      } else {
        res.status(404).json({ error: 'Company not found' });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async list(req, res) {
    try {
      const companys = await companyService.getAllCompanies();
      res.json(companys);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}


module.exports = new CompanyController();
