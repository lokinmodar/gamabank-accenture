'use strict';
const { Sequelize, DataTypes, Model } = require('sequelize');
// rotinas de criptografia
const { encryptPassword, comparePassword } = require('../../helpers/crypto.helper');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    checkPassword(password, salt) {
      // console.log();
      // compara informação inserida na senha de login com hash do cadastro
      return comparePassword(password, salt, this.password_hash);
    }

    static associate(models) {
      // define association here
      this.hasMany(models.Account);
    }
  };
  User.init({
    // colunas modificáveis pelo usuário
    full_name: {type: DataTypes.STRING},
    user_name: {type: DataTypes.STRING},
    user_email: {type: DataTypes.STRING},
    password: {type: DataTypes.VIRTUAL}, // campo não-refletido na tabela do BD
    password_hash: {type: DataTypes.STRING},
    salt: {type: DataTypes.STRING},
    cpf: {type: DataTypes.STRING},
    telephone: {type: DataTypes.STRING},
  }, {
    hooks:{ beforeSave: async (user) => {
      // assíncrono
      if (user.password) {

        const { encryptedPassword, salt } = await encryptPassword(
          user.password,
          user.salt
        );

        user.password_hash = encryptedPassword;
        user.salt = salt;
        // geração do hash de senha
      }

    }},
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true
  });
  return User;
};


