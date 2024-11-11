'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('schedules', [
      {
        route_id: 1,
        day_of_week: 'Monday',
        departure_time: '08:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        route_id: 1,
        day_of_week: 'Monday',
        departure_time: '12:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        route_id: 2,
        day_of_week: 'Tuesday',
        departure_time: '10:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        route_id: 3,
        day_of_week: 'Wednesday',
        departure_time: '14:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        route_id: 4,
        day_of_week: 'Thursday',
        departure_time: '16:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        route_id: 5,
        day_of_week: 'Friday',
        departure_time: '18:00:00',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('schedules', null, {});
  }
};
