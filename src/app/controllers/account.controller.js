import accountDto from '../models/dto/accounts.dto';
import UserExists from '../services/checkuserexists.service';
import Account from '../models/account.model';

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
    // Retono de resposta quando a rota é chamada:
    return res.status(200).json({ ok: 'deu tudo certo' });
  }
}

export default new AccountController();
