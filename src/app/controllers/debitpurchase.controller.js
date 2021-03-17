import debitPurchaseDto from '../models/dto/debitPurchase.dto';
import accountExists from '../services/account.service';
import accountBalance from '../services/accountBalance.service';
import Transaction from '../models/transaction.model';
import FindAccountByToken from '../services/findAccountByToken.service';

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

    if (req.body.transaction_value <= 0) {
      return res
        .status(400)
        .json({ error: 'Transaction value must be greater than 0.' });
    }

    if (req.body.transaction_value > accountBalance) {
      return res.status(400).json({ error: 'Insuficient balance' });
    }

    // Retorno de resposta quando a rota é chamada:

    const transactionToCreate = {
      account_id: FindAccountByToken.accountIdByToken,
      transaction_type_id: 2,
      transaction_value: req.body.transaction_value,
      transaction_due_date: new Date(),
      transaction_pay_date: new Date(),
    };

    const purchaseMade = await Transaction.create(transactionToCreate);

    // passados os atributos no corpo da requisição em JSON
    return res.status(200).json({ purchaseMade });
  }
}

export default new DebitPurchaseController();
