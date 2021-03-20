module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable('users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    full_name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    user_name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    user_email: {
      allowNull: false,
      unique: true,
      type: Sequelize.STRING,
    },
    password_hash: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    salt: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    telephone: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    cpf: {
      allowNull: false,
      unique: true,
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
  });
},
down: async (queryInterface, Sequelize) => {
  await queryInterface.dropTable('users');
},
};
