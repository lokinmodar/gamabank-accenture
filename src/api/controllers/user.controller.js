const { User } = require('../models');
const { Account } = require('../models');
const validateCpf = require('../services/validateCPF.service');
const userDto = require('../models/dto/user.dto');
const UserExists = require('../services/checkUserExists.service');
const verifyCardDueDay = require('../services/verifyCardDueDay.service');
const {formattedCPF} = require('../services/formatCpf.service')
class UserController {
  async store(req, res) {
    // validações do Schema
    const schema = userDto;

    // TODO: Transformar em função helper ou service
    // TODO: Checar herarquia dos erros de verificação no YUP
    try {
      await schema.validate(req.body); // chamada ao yup.validate pra validação do DTO(schema)
    } catch (error) {
      // extraindo de dentro do retorno do Yup o erro exato
      return res.status(400).json({ RequestFormatError: error.errors[0] });
    }

    // TODO: checagem de validade do cpf
    if (!(await validateCpf(req.body.cpf))) {
      return res.status(400).json({ error: 'Invalid CPF.' });
    }

    if (!(await verifyCardDueDay(req.body.card_due_day))) {
      return res
        .status(400)
        .json({ error: 'Card due days allowed: 5, 10, 15, 20, 25' });
    }

    if (
      await UserExists.checkUserExists(
        req.body.user_name,
        req.body.user_email,
        req.body.cpf
      )
    ) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const cpf = await formattedCPF(req.body.cpf)
    const userToCreate = {
      full_name: req.body.full_name,
      user_name: req.body.user_name,
      user_email: req.body.user_email,
      password: req.body.password,
      cpf: cpf,
      telephone: req.body.telephone
  }

    // salvamento no banco de dados
    const createdUser = await User.build(userToCreate);
    await createdUser.save();
    // passados os atributos no corpo da requisição em JSON
    createdUser.password = undefined;
    createdUser.password_hash = undefined;
    createdUser.salt = undefined;

    // criando objeto para adicionar nova conta corrente:
    const accountToCreate = {
      user_id: createdUser.id,
      cpf: cpf,
      balance: 0,
      credit_limit: 200,
      card_due_day: req.body.card_due_day,
    };

    const createdAccount = await Account.build(accountToCreate);
    await createdAccount.save();
    createdAccount.UserId = undefined;

    return res.json({
      createdUser,
      createdAccount,
    });
  }
}

module.exports = new UserController();
