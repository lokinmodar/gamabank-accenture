const { Transaction } = require('../models');
const { Account } = require('../models');
const bankStatementDto = require('../models/dto/bankStatement.dto');
const findUserIdByToken = require('../services/findUserIdByToken.service');
const bankStatementService = require('../services/bankStatement.service');

class BankStatementController {
  async retrieve(req, res) {
    // validações do Schema
    const schema = bankStatementDto;
    // verificando validade do schema usando Yup
    // TODO: Transformar em função helper
    try {
      await schema.validate(req.body); // chamada ao yup.validate pra validação do DTO(schema)
    } catch (error) {
      // extraindo de dentro do retorno do Yup o erro exato
      res.status(400).json({ RequestFormatError: error.errors[0] });
      return;
    }

    // recuperando o token do usuário
    const [, token] = req.headers.authorization.split(' ');

    // recuperando a conta pelo token
    const accountId = await findUserIdByToken.accountIdByToken(token);

    if (req.body.month) {
      // tratar
      console.log(`Month: ${req.body.month}`);
    }
    if (req.body.initial_date && req.body.end_date) {
      // tratar
      console.log(`period: ${req.body.initial_date} to ${req.body.end_date}`);
    } else {
      if (req.body.transaction_type) {
        switch (req.body.transaction_type) {
          case 'incoming':
            // code block
            console.log('incoming');
            break;
          case 'outgoing':
            // code block
            console.log('outgoing');
          case 'both':
            // code block

            break;
          default:
            // code block
            res
              .status(400)
              .json({ Error: 'No transactions found for your account.' });
            return;
        }
      } else {
        const allTransactions = await bankStatementService.findAllTransactions(
          accountId
        );
        console.log('both');
        console.log(allTransactions);
      }
    }

    // passados os atributos no corpo da requisição em JSON
    return res.status(200).json({ ok: 'uiuiui' });
  }
}

module.exports = new BankStatementController();
