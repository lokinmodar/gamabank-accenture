const accountDto = require('../models/dto/account.dto');
const UserExists = require('../services/checkUserExists.service');
const { Account } = require('../models');
const verifyCardDueDay = require('../services/verifyCardDueDay.service');

// Como class pois precisamos sempre de uma nova instância
class AccountController {
  async store(req, res) {
    // validações do Schema
    const schema = accountDto;
    // verificando validade do schema usando Yup
    // TODO: Transformar em função helper
    try {
      await schema.validate(req.body); // chamada ao yup.validate pra validação do DTO(schema)
    } catch (error) {
      // extraindo de dentro do retorno do Yup o erro exato
      return res.status(400).json({ RequestFormatError: error.errors[0] });
    }

    if (!(await UserExists.userWithIdExists(req.body.user_id))) {
      return res.status(400).json({ error: 'User does not exist.' });
    }

    if (!(await verifyCardDueDay(req.body.card_due_day))) {
      return res
        .status(400)
        .json({ error: 'Card due days allowed: 5, 10, 15, 20, 25' });
    }

    // Retorno de resposta quando a rota é chamada:
    const createdAccount = await Account.create(req.body);

    createdAccount.UserId = undefined;

    // passados os atributos no corpo da requisição em JSON
    return res.status(200).json({ createdAccount });
  }
}

module.exports =  new AccountController();
