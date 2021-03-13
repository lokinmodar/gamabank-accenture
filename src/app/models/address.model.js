'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  address.init({
    user_id: DataTypes.INTEGER,
    address_description: DataTypes.STRING,
    complemento: DataTypes.STRING,
    zip_code: DataTypes.STRING,
    neighboorhood: DataTypes.STRING,
    city_id: DataTypes.INTEGER,
    state_id: DataTypes.INTEGER,
    country_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'address',
  });
  return address;
};