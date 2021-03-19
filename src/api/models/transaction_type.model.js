'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionType extends Model {
    static associate(models) {
      // define association here
    }
  };
  TransactionType.init({
    // colunas modificáveis pelo usuário
    transaction_description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'TransactionType',
    tableName: 'transaction_types',
    underscored: true
  });
  return TransactionType;
};


