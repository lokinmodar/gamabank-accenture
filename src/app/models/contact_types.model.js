'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact_types extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Contact_types.init({
    contact_type_description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contact_types',
  });
  return Contact_types;
};