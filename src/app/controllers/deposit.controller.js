import validateCPF from '../../helpers/validateCPF.helper';
import depositDTO from '../models/dto/deposit.dto';
import accountService from '../services/account.service';
import { checkValueNotNegative } from '../services/deposit.service';

class DepositController {
  async store(req, res) {
    const schema = depositDTO;

    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ error_1: error.errors[0] });
    }
    if (!(await accountService.accountWithIdExists(req.body.account_id))) {
      return res
        .status(400)
        .json({ error: 'Não existe conta com esse número' });
    }

    if (!(await validateCPF(req.body.incoming_cpf))) {
      return res.status(400).json({ error: 'O campo CPF está inválido' });
    }

    if (await checkValueNotNegative(req.body.transaction_value)) {
      return res.status(400).json({ error: 'Valor negativo, presta atenção!' });
    }
    return res.status(200).json({ ok: 'Deu certo' });
  }
}

export default new DepositController();
