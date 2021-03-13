'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      account_type: {
        type: Sequelize.INTEGER
      },
      balance: {
        type: Sequelize.DECIMAL
      },
      credit_limit: {
        type: Sequelize.DECIMAL
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addConstraint('accounts', {
      fields: ['account_type'],
      type: 'FOREIGN KEY',
      name: 'FK_accountType_account', // useful if using queryInterface.removeConstraint
      references: {
        table: 'account_types',
        field: 'id'
        },
      onDelete: 'no action',
      onUpdate: 'no action',
    })).then(() => queryInterface.addConstraint('accounts', {
      fields: ['user_id'],
      type: 'FOREIGN KEY',
      name: 'FK_accountType_user', // useful if using queryInterface.removeConstraint
      references: {
        table: 'users',
        field: 'id'
        },
      onDelete: 'no action',
      onUpdate: 'no action',
    }));
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts');
  }
};
