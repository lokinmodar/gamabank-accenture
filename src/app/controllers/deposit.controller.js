import validateCPF from '../../helpers/validateCPF.helper';
import depositDTO from '../models/dto/deposit.dto';
import accountService from '../services/account.service';
import { checkValueNotNegative } from '../services/checkTransactionValue.service';
import accountBalance from '../services/accountBalance.service';
import Transaction from '../models/transaction.model';
import Account from '../models/account.model';

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

    // Salve os dados na tabela de transation
    const transactionToInsert = {
      account_id: req.body.account_id,
      transaction_type: 1,
      transaction_value: req.body.transaction_value,
      incoming_cpf: req.body.incoming_cpf,
      transaction_due_date: new Date(),
      transaction_pay_date: new Date(),
    };
    const transactionSaved = await Transaction.create(transactionToInsert);

    let currentBalance = await accountBalance(req.body.account_id);
    console.log(currentBalance);
    currentBalance += req.body.transaction_value;
    console.log(currentBalance);
    const newBalance = await Account.update(
      { balance: currentBalance },
      {
        where: { id: req.body.account_id },
      }
    );

    return res.status(200).json({ transactionSaved, newBalance });
  }
}

export default new DepositController();
