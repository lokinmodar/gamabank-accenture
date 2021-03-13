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
      user_id: {
        type: Sequelize.INTEGER
      },
      transaction_date: {
        type: Sequelize.DATE
      },
      transaction_type: {
        type: Sequelize.INTEGER
      },
      transaction_value: {
        type: Sequelize.DECIMAL
      },
      target_bank_code: {
        type: Sequelize.INTEGER
      },
      target_agency: {
        type: Sequelize.STRING
      },
      target_account: {
        type: Sequelize.STRING
      },
      target_cpf: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transactions');
  }
};
