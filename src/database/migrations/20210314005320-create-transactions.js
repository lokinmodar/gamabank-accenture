'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      account_id: {
        type: Sequelize.INTEGER
      },
      transaction_type_id: {
        type: Sequelize.INTEGER
      },
      transaction_value: {
        type: Sequelize.DECIMAL
      },
      target_bank_id: {
        type: Sequelize.INTEGER
      },
      target_user_name: {
        type: Sequelize.STRING
      },
      target_cpf: {
        type: Sequelize.STRING
      },
      transaction_due_date: {
        type: Sequelize.DATE
      },
      transaction_pay_date: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transactions');
  }
};