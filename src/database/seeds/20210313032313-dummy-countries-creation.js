'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     return queryInterface.bulkInsert('countries', [{
      country_name: 'United States of America',
      country_phone_code: '1',
      created_at: new Date(),
      updated_at: new Date()
    },{
      country_name: 'Brasil',
      country_phone_code: '55',
      created_at: new Date(),
      updated_at: new Date()
    },{
      country_name: 'United Kingdom',
      country_phone_code: '44',
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

     return queryInterface.bulkDelete('countries', null, {});
  }
};
