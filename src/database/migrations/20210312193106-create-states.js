'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('states', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      state_name: {
        type: Sequelize.STRING
      },
      country_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addConstraint('states', {
      fields: ['country_id'],
      type: 'FOREIGN KEY',
      name: 'FK_statesCountryId_countries', // useful if using queryInterface.removeConstraint
      references: {
        table: 'countries',
        field: 'id'
        },
      onDelete: 'no action',
      onUpdate: 'no action',
    }));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('states');
  }
};
