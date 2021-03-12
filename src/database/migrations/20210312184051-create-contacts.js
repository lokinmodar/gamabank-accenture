'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contact_type: {
        type: Sequelize.INTEGER
      },
      contact_value: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addConstraint('contacts', {
      fields: ['user_id'],
      type: 'FOREIGN KEY',
      name: 'FK_userId_user', // useful if using queryInterface.removeConstraint
      references: {
        table: 'users',
        field: 'id'
        },
      onDelete: 'no action',
      onUpdate: 'no action',
    }));;
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contacts');
  }
};
