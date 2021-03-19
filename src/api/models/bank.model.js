'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bank extends Model {
    static associate(models) {
      // define association here
    }
  };
  Bank.init({
    // colunas modificáveis pelo usuário
    bank_name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Bank',
    tableName: 'banks',
    underscored: true
  });
  return Bank;
};


