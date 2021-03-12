'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  transactions.init({
    account_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    transaction_date: DataTypes.DATE,
    transaction_type: DataTypes.INTEGER,
    transaction_value: DataTypes.DECIMAL,
    target_bank_code: DataTypes.INTEGER,
    target_agency: DataTypes.STRING,
    target_account: DataTypes.STRING,
    target_cpf: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transactions',
  });
  return transactions;
};