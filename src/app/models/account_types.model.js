'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class account_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  account_types.init({
    account_description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'account_types',
  });
  return account_types;
};