import debitPurchaseDto from '../models/dto/debitPurchase.dto';
import accountExists from '../services/account.service';

class DebitPurchaseController {
  async store(req, res) {
    const schema = debitPurchaseDto;

    try {
      await schema.validate(req.body); // chamada ao yup.validate pra validação do DTO(schema)
    } catch (error) {
      // extraindo de dentro do retorno do Yup o erro exato
      return res.status(400).json({ error_1: error.errors[0] });
    }

    if (!(await accountExists.accountWithIdExists(req.body.account_id))) {
      return res.status(400).json({ error: 'Account does not exist.' });
    }
  }
}

export default new DebitPurchaseController();
