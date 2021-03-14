module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('sessions', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        token: {
          allowNull: false,
          type: Sequelize.STRING,
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
        queryInterface.addConstraint('sessions', {
          fields: ['user_id'],
          type: 'FOREIGN KEY',
          name: 'FK_sessions_user', // useful if using queryInterface.removeConstraint
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
    await queryInterface.dropTable('sessions');
  },
};
