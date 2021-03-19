'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      // define association here
    }
  };
  Account.init({
    // colunas modificáveis pelo usuário
    user_id: DataTypes.INTEGER,
    balance: DataTypes.DECIMAL,
    credit_limit: DataTypes.DECIMAL,
    card_due_day: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Account',
    tableName: 'accounts',
    underscored: true
  });
  return Account;
};


