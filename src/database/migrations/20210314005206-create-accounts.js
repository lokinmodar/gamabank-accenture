module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('accounts', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
        },
        balance: {
          type: Sequelize.DECIMAL(10, 2),
        },
        credit_limit: {
          type: Sequelize.DECIMAL(10, 2),
        },
        card_due_day: {
          // dia de vencimento da fatura do cartão
          type: Sequelize.INTEGER,
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
        queryInterface.addConstraint('accounts', {
          fields: ['user_id'],
          type: 'FOREIGN KEY',
          name: 'FK_accounts_user', // useful if using queryInterface.removeConstraint
          references: {
            table: 'users',
            field: 'id',
          },
          onDelete: 'no action',
          onUpdate: 'no action',
        })
      );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('accounts');
  },
};
