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
     return queryInterface.bulkInsert('contact_types', [{
      contact_type_description: 'Home Phone',
      created_at: new Date(),
      updated_at: new Date()
    },{
      contact_type_description: 'Mobile Phone',
      created_at: new Date(),
      updated_at: new Date()
    },{
      contact_type_description: 'Work E-mail',
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

     return queryInterface.bulkDelete('contact_types', null, {});
  }
};
