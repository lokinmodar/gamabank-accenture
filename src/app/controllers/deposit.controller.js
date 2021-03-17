import validateCPF from '../../helpers/validateCPF.helper';
import depositDTO from '../models/dto/deposit.dto';

class DepositController {
  async store(req, res) {
    const schema = depositDTO;

    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ error_1: error.errors[0] });
    }
    const validAccount = await ValidAccount.withAccountValid(
      req.body.account_id
    );

    if (!(await validateCPF(req.body.incoming_cpf))) {
      return res.status(400).json({ error: 'O campo CPF está inválido' });
    }
  }
}

export default new DepositController();

export default new DepositController();
