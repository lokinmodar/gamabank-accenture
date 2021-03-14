import accountDto from '../models/dto/accounts.dto';

class AccountController {
  async store(req, res) {
    // validações do Schema
    const schema = accountDto;

    // TODO: Transformar em função helper
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Request fields validation failed.' });
    }
    return res.status(200).json({ ok: 'deu tudo certo' });
  }
}

export default new AccountController();
