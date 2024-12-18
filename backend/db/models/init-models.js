var DataTypes = require("sequelize").DataTypes;
var _buses = require("./buses");
var _companies = require("./companies");
var _routes = require("./routes");
var _schedules = require("./schedules");
var _stops = require("./stops");
var _users = require("./users");
var _frequencies = require("./frequencies"); // Importa el modelo de frecuencias

function initModels(sequelize) {
  var buses = _buses(sequelize, DataTypes);
  var companies = _companies(sequelize, DataTypes);
  var routes = _routes(sequelize, DataTypes);
  var schedules = _schedules(sequelize, DataTypes);
  var stops = _stops(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var frequencies = _frequencies(sequelize, DataTypes); // Inicializa el modelo de frecuencias

  // Definir asociaciones
  buses.belongsTo(companies, { as: "company", foreignKey: "company_id"});
  companies.hasMany(buses, { as: "buses", foreignKey: "company_id"});
  routes.belongsTo(companies, { as: "company", foreignKey: "company_id"});
  companies.hasMany(routes, { as: "routes", foreignKey: "company_id"});
  schedules.belongsTo(routes, { as: "route", foreignKey: "route_id"});
  routes.hasMany(schedules, { as: "schedules", foreignKey: "route_id"});
  frequencies.hasMany(schedules, { as: "schedules", foreignKey: "frequency_id" }); // Asociación entre Frequency y Schedule

  return {
    buses,
    companies,
    routes,
    schedules,
    stops,
    users,
    frequencies, // Asegúrate de exportar el modelo de frecuencias
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
