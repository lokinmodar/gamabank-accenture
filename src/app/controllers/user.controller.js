import User from '../models/user.model';
import ValidarCPF from '../../helpers/validateCPF.helper';
import userDto from '../models/dto/user.dto';
import UserExists from '../services/checkUserExists.service';
import Account from '../models/account.model';
import verifyCardDueDay from '../../helpers/verifyCardDueDay.helper';

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
      return res.status(400).json({ error_1: error.errors[0] });
    }

    // TODO: checagem de validade do cpf
    if (!(await ValidarCPF(req.body.cpf))) {
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

    // salvamento no banco de dados
    const createdUser = await User.create(req.body); // passados os atributos no corpo da requisição em JSON
    createdUser.password = undefined;
    createdUser.password_hash = undefined;
    createdUser.salt = undefined;

    const accountToCreate = {
      user_id: createdUser.id,
      balance: 0,
      credit_limit: 200,
      card_due_day: req.body.card_due_day,
    };

    const createdAccount = await Account.create(accountToCreate);
    createdAccount.UserId = undefined;

    return res.json({
      createdUser,
      createdAccount,
    });
  }
}

export default new UserController();
