'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      // define association here
    }
  };
  Session.init({
    // colunas modificáveis pelo usuário
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Session',
    tableName: 'sessions',
    underscored: true
  });
  return Session;
};




