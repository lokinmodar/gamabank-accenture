module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'transaction_types',
      [
        {
          transaction_description: 'Depósito Conta Corrente',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          transaction_description: 'Despesa Débito',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          transaction_description: 'Despesa Crédito',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          transaction_description: 'Transferência Interna - Saída',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          transaction_description: 'Transferência Externa',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          transaction_description: 'Pagamento Fatura Crédito',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          transaction_description: 'Transferência Interna - Entrada',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('transaction_types', null, {});
  },
};
