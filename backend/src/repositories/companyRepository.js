const Company = require('../models/company');

class CompanyRepository {
  async createCompany(userData) {
    const user = await Company.create(userData);
    return user;
  }

  async getCompanyById(id) {
    const user = await Company.findByPk(id);
    return user;
  }

  async updateCompany(id, userData) {
    await Company.update(userData, {
      where: { id }
    });
    return this.getCompanyById(id);
  }

  async deleteCompany(id) {
    const user = await Company.destroy({
      where: { id }
    });
    return user;
  }

  async getAllCompanys() {
    const users = await Company.findAll();
    return users;
  }
}

module.exports = new CompanyRepository();
