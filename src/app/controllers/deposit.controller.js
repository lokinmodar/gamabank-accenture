import validateCPF from '../../helpers/validateCPF.helper';
import depositDTO from '../models/dto/deposit.dto';

class DepositController {
  async sotre(req, res) {
    const schema = depositDTO;

    try {
      await schema.validate(red.body);
    } catch (error) {
      return res.status(400).json({ error_1: error.errors[0] });
    }
    /* const validAccount = await ValidAccount.withAccountValid(
      req.body.account_id
    ); */

    if (!(await validateCPF(req.body.incoming_cpf))) {
      return res.status(400).json({ error: 'O campo CPF está inválido' });
    }
  }
}

export default new DepositController();
