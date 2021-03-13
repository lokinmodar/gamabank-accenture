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
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      contact_value: {
        type: Sequelize.STRING
      },
      user_id: {
        allowNull: false,
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
    })).then(() => queryInterface.addConstraint('contacts', {
      fields: ['contact_type'],
      type: 'FOREIGN KEY',
      name: 'FK_contactType_contact', // useful if using queryInterface.removeConstraint
      references: {
        table: 'contact_types',
        field: 'id'
        },
      onDelete: 'no action',
      onUpdate: 'no action',
    }));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('contacts');
  }
};
