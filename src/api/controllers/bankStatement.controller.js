const { Transaction } = require('../models');
const { Account } = require('../models');
const bankStatementDto = require('../models/dto/bankStatement.dto');

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

    // passados os atributos no corpo da requisição em JSON
    return res.status(200).json({ ok: 'uiuiui' });
  }
}

module.exports = new BankStatementController();
