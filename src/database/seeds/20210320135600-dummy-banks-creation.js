module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'banks',
      [
        {
          id: 001,
          bank_name: 'Banco do Brasil',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 033,
          bank_name: 'Santander',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 237,
          bank_name: 'Bradesco',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 341,
          bank_name: 'Itaú Unibanco',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('banks', null, {});
  },
};
