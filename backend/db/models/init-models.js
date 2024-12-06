var DataTypes = require("sequelize").DataTypes;
var _buses = require("./buses");
var _companies = require("./companies");
var _routes = require("./routes");
var _schedules = require("./schedules");
var _stops = require("./stops");
var _users = require("./users");

function initModels(sequelize) {
  var buses = _buses(sequelize, DataTypes);
  var companies = _companies(sequelize, DataTypes);
  var routes = _routes(sequelize, DataTypes);
  var schedules = _schedules(sequelize, DataTypes);
  var stops = _stops(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  buses.belongsTo(companies, { as: "company", foreignKey: "company_id"});
  companies.hasMany(buses, { as: "buses", foreignKey: "company_id"});
  routes.belongsTo(companies, { as: "company", foreignKey: "company_id"});
  companies.hasMany(routes, { as: "routes", foreignKey: "company_id"});
  schedules.belongsTo(routes, { as: "route", foreignKey: "route_id"});
  routes.hasMany(schedules, { as: "schedules", foreignKey: "route_id"});

  return {
    buses,
    companies,
    routes,
    schedules,
    stops,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
