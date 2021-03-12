'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name: {
        allowNull: false,
        type:  Sequelize.STRING
      },
      user_name:{
        allowNull: false,
        type:   Sequelize.STRING
      },
      user_type: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      gender: {
        allowNull: false,
        type:  Sequelize.STRING
      },
      rg: {
        type:  Sequelize.STRING
      },
      cpf:{
        allowNull: false,
        unique: true,
        type:   Sequelize.STRING
      },
      user_email:{
        allowNull: false,
        unique: true,
        type:   Sequelize.STRING
      },
      password_hash:{
        allowNull: false,
        type:   Sequelize.STRING
      },
      salt: {
        allowNull: false,
        type:  Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addConstraint('users', {
      fields: ['user_type'],
      type: 'FOREIGN KEY',
      name: 'FK_userType_user', // useful if using queryInterface.removeConstraint
      references: {
        table: 'user_types',
        field: 'id'
        },
      onDelete: 'no action',
      onUpdate: 'no action',
    }));
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     await queryInterface.dropTable('users');
  }
};

