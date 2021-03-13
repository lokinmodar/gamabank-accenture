import Sequelize, { Model } from 'sequelize';
// rotinas de criptografia
import { encryptPassword } from '../../helpers/crypto.helper';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        /// colunas modificáveis pelo usuário
        full_name: Sequelize.STRING,
        user_name: Sequelize.STRING,
        gender: Sequelize.STRING,
        rg: Sequelize.STRING,
        cpf: Sequelize.STRING,
        user_email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // campo não-refletido na tabela do BD
        password_hash: Sequelize.STRING,
        salt: Sequelize.STRING,
      },
      {
        // configurações adicionais do sequelize
        sequelize,
      }
    );
    // adicionando um Hook do Sequelize para geração do hash ANTES do salvamento no BD
    this.addHook('beforeSave', async user => {
      // assíncrono

       if (user.password) {

        console.log(user.password);
         const { encryptedPassword, salt } = await encryptPassword(user.password, user.salt);
         console.log(encryptedPassword);
        user.password_hash = encryptedPassword;
        user.salt = salt;
        // geração do hash de senha - usando força 8 (n de rounds)
      }
    });
    return this;
  }

  // criando método que associa models
 static associate(models) {
    this.belongsTo(models.User_types, { foreignKey: 'id', as: 'user_type' });
  }

  checkPassword(password) {
    // compara informação inserida na senha de login com hash do cadastro
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
