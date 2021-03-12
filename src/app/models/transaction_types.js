'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  transaction_types.init({
    transaction_description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'transaction_types',
  });
  return transaction_types;
};