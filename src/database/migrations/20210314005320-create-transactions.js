module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('transactions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        account_id: {
          type: Sequelize.INTEGER,
        },
        transaction_type_id: {
          type: Sequelize.INTEGER,
        },
        operation: {
          type: Sequelize.STRING,
        },
        transaction_value: {
          type: Sequelize.DECIMAL(10, 2),
        },
        operation: {
          type: Sequelize.STRING,
        },
        incoming_cpf: {
          type: Sequelize.STRING,
        },
        target_bank_id: {
          // código do banco
          type: Sequelize.INTEGER,
        },
        target_user_name: {
          // user de destino
          type: Sequelize.STRING,
        },
        target_account_id: {
          // cpf de destino
          type: Sequelize.INTEGER,
        },
        target_cpf: {
          // cpf de destino
          type: Sequelize.STRING,
        },
        transaction_due_date: {
          // data de verncimento da transação
          type: Sequelize.DATE,
        },
        transaction_pay_date: {
          // data de pagamento/processamento da transação
          type: Sequelize.DATE,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
      .then(() =>
        queryInterface.addConstraint('transactions', {
          fields: ['target_bank_id'],
          type: 'FOREIGN KEY',
          name: 'FK_transactions_banks', // useful if using queryInterface.removeConstraint
          references: {
            table: 'banks',
            field: 'id',
          },
          onDelete: 'no action',
          onUpdate: 'no action',
        })
      )
      .then(() =>
        queryInterface.addConstraint('transactions', {
          fields: ['transaction_type_id'],
          type: 'FOREIGN KEY',
          name: 'FK_transactions_transaction_types', // useful if using queryInterface.removeConstraint
          references: {
            table: 'transaction_types',
            field: 'id',
          },
          onDelete: 'no action',
          onUpdate: 'no action',
        })
      )
      .then(() =>
        queryInterface.addConstraint('transactions', {
          fields: ['account_id'],
          type: 'FOREIGN KEY',
          name: 'FK_transactions_accounts', // useful if using queryInterface.removeConstraint
          references: {
            table: 'accounts',
            field: 'id',
          },
          onDelete: 'no action',
          onUpdate: 'no action',
        })
      );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('transactions');
  },
};
