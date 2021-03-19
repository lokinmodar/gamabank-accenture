// este arquivo cria a conexão com o banco
// este arquivo carrega os models da aplicação
const Sequelize = require('sequelize');

const databaseConfig = require('../configs/database'); // configurações da base de dados

// importando os Models
const User = require('../api/models/user.model');
/* const Session =require( ../app/models/session.model'); */
const Account = require('../api/models/account.model');
/* const Transaction =require( ../app/models/transaction.model'); */

// Criando um Array com todos os models da aplicação
const models = [User, Account];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig); // gera a conexão com o BD.
    // É a variável que é esperada dentro dos models dentro do método 'init'

    // Depois da conexão com o banco de dados, percorrer o array de models
    models
      .map((model) => model.init(this.connection)).map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }
}

module.exports = new Database();
