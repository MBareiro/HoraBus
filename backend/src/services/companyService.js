const companyRepository = require('../repositories/companyRepository');

class CompanyService {
    
  async registerCompany(companyData) {
    // Aquí puedes agregar validaciones antes de crear el usuario
    return await companyRepository.createCompany(companyData);
  }

  async getCompany(id) {
    return await companyRepository.getCompanyById(id);
  }

  async updateCompany(id, companyData) {
    return await companyRepository.updateCompany(id, companyData);
  }

  async deleteCompany(id) {
    return await companyRepository.deleteCompany(id);
  }

  async listCompanies() {
    return await companyRepository.getAllCompanys();
  }
}

module.exports = new CompanyService();
