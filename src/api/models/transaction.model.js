
'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // define association here
    }
  };
  Transaction.init({
    // colunas modificáveis pelo usuário
    account_id: DataTypes.INTEGER,
    transaction_type_id: DataTypes.INTEGER,
    transaction_value: DataTypes.DECIMAL,
    operation: DataTypes.STRING,
    incoming_cpf: DataTypes.STRING,
    target_bank_id: DataTypes.INTEGER,
    target_user_name: DataTypes.STRING,
    target_account_id: DataTypes.INTEGER,
    target_cpf: DataTypes.STRING,
    transaction_due_date: DataTypes.DATE,
    transaction_pay_date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    underscored: true
  });
  return Transaction;
};


