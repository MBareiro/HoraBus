var DataTypes = require("sequelize").DataTypes;
var _buses = require("./buses");
var _companies = require("./companies");
var _routes = require("./routes");
var _schedules = require("./schedules");
var _stops = require("./stops");
var _users = require("./users");
var _frequencies = require("./frequencies"); 
var _roles = require("./roles");
var _companiesStops = require("./companiesStops");
var _subscriptions = require("./subscriptions");
var _passwordResets = require("./passwordReset");

function initModels(sequelize) {
  var buses = _buses(sequelize, DataTypes);
  var companies = _companies(sequelize, DataTypes);
  var routes = _routes(sequelize, DataTypes);
  var schedules = _schedules(sequelize, DataTypes);
  var stops = _stops(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var frequencies = _frequencies(sequelize, DataTypes); 
  var roles = _roles(sequelize, DataTypes);
  var companiesStops = _companiesStops(sequelize, DataTypes);
  var subscriptions = _subscriptions(sequelize, DataTypes);
  var passwordResets = _passwordResets(sequelize, DataTypes);

  // Definir asociaciones
  buses.belongsTo(companies, { as: "company", foreignKey: "company_id" });
  companies.hasMany(buses, { as: "buses", foreignKey: "company_id" });

  buses.belongsTo(routes, { as: "route", foreignKey: "route_id" });
  routes.hasMany(buses, { as: "buses", foreignKey: "route_id" });

  companies.belongsToMany(stops, {
    through: 'companies_stops',
    foreignKey: 'company_id',
    otherKey: 'stop_id',
    as: 'stops'
  });
  stops.belongsToMany(companies, {
    through: 'companies_stops',
    foreignKey: 'stop_id',
    otherKey: 'company_id',
    as: 'companies'
  });

  routes.belongsTo(stops, { as: "originStop", foreignKey: "origin" });
  routes.belongsTo(stops, { as: "destinationStop", foreignKey: "destination" });
  stops.hasMany(routes, { as: "originRoutes", foreignKey: "origin" });
  stops.hasMany(routes, { as: "destinationRoutes", foreignKey: "destination" });

  schedules.belongsTo(routes, { as: "route", foreignKey: "route_id" });
  routes.hasMany(schedules, { as: "schedules", foreignKey: "route_id" });

  schedules.belongsTo(frequencies, { as: "frequency", foreignKey: "frequency_id" });
  frequencies.hasMany(schedules, { as: "schedules", foreignKey: "frequency_id" });

  schedules.belongsTo(companies, { as: "company", foreignKey: "company_id" });
  companies.hasMany(schedules, { as: "schedules", foreignKey: "company_id" });

  roles.hasMany(users, { as: "users", foreignKey: "role_id" });
  users.belongsTo(roles, { as: "role", foreignKey: "role_id" });

  companies.hasMany(users, { as: "users", foreignKey: "company_id" });
  users.belongsTo(companies, { as: "company", foreignKey: "company_id" });

  passwordResets.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(passwordResets, { as: "passwordResets", foreignKey: "user_id" });

  return {
    buses,
    companies,
    routes,
    schedules,
    stops,
    users,
    frequencies,
    roles,
    companiesStops,
    subscriptions,
    passwordResets
  };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
