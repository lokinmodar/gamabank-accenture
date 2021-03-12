import Sequelize, { Model } from 'sequelize';

class User_types extends Model {
  static init(sequelize) {
    super.init(
      {
        /// colunas modificáveis pelo usuário
        user_type_descryption: Sequelize.STRING,
      },
      {
        // configurações adicionais do sequelize
        sequelize,
      }
    );
    // adicionando um Hook do Sequelize para geração do hash ANTES do salvamento no BD
    this.addHook('beforeSave', async user => {
      // assíncrono


        // geração do hash de senha - usando força 8 (n de rounds)
      }
    );
    return this;
  }

  // criando método que associa models
 static associate(models) {
    //this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

}

export default User_types;
