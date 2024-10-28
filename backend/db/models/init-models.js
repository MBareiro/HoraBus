var DataTypes = require("sequelize").DataTypes;
var _buses = require("./buses");
var _companies = require("./companies");
var _route_stops = require("./route_stops");
var _routes = require("./routes");
var _schedules = require("./schedules");
var _stop_times = require("./stop_times");
var _stops = require("./stops");
var _users = require("./users");

function initModels(sequelize) {
  var buses = _buses(sequelize, DataTypes);
  var companies = _companies(sequelize, DataTypes);
  var route_stops = _route_stops(sequelize, DataTypes);
  var routes = _routes(sequelize, DataTypes);
  var schedules = _schedules(sequelize, DataTypes);
  var stop_times = _stop_times(sequelize, DataTypes);
  var stops = _stops(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  buses.belongsTo(companies, { as: "company", foreignKey: "company_id"});
  companies.hasMany(buses, { as: "buses", foreignKey: "company_id"});
  routes.belongsTo(companies, { as: "company", foreignKey: "company_id"});
  companies.hasMany(routes, { as: "routes", foreignKey: "company_id"});
  route_stops.belongsTo(routes, { as: "route", foreignKey: "route_id"});
  routes.hasMany(route_stops, { as: "route_stops", foreignKey: "route_id"});
  schedules.belongsTo(routes, { as: "route", foreignKey: "route_id"});
  routes.hasMany(schedules, { as: "schedules", foreignKey: "route_id"});
  stop_times.belongsTo(schedules, { as: "schedule", foreignKey: "schedule_id"});
  schedules.hasMany(stop_times, { as: "stop_times", foreignKey: "schedule_id"});
  route_stops.belongsTo(stops, { as: "stop", foreignKey: "stop_id"});
  stops.hasMany(route_stops, { as: "route_stops", foreignKey: "stop_id"});
  stop_times.belongsTo(stops, { as: "stop", foreignKey: "stop_id"});
  stops.hasMany(stop_times, { as: "stop_times", foreignKey: "stop_id"});

  return {
    buses,
    companies,
    route_stops,
    routes,
    schedules,
    stop_times,
    stops,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
