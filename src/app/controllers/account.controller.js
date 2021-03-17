import accountDto from '../models/dto/accounts.dto';
import UserExists from '../services/checkuserexists.service';
import Account from '../models/account.model';
import verifyCardDueDay from '../../helpers/verifyCardDueDay.helper';

// Como class pois precisamos sempre de uma nova instância
class AccountController {
  async store(req, res) {
    // validações do Schema
    const schema = accountDto;
    // verificando validade do schema usando Yup
    // TODO: Transformar em função helper
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Request fields validation failed.' });
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

export default new AccountController();
