const validateCPF = require('../services/validateCPF.service');
const depositDTO = require('../models/dto/deposit.dto');
const accountExists = require('../services/accountExists.service');
const { checkValueNotNegative } = require('../services/checkTransactionValue.service');
const accountBalance = require('../services/accountBalance.service');
const { Transaction } = require('../models');
const { Account } = require('../models');

class DepositController {
  async store(req, res) {
    const schema = depositDTO;

    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ RequestFormatError: error.errors[0] });
    }
    if (!(await accountExists.accountWithIdExists(req.body.account_id))) {
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
      transaction_type_id: 1,
      transaction_value: req.body.transaction_value,
      incoming_cpf: req.body.incoming_cpf,
      transaction_due_date: new Date(),
      transaction_pay_date: new Date(),
    };
    const transactionSaved = await Transaction.create(transactionToInsert);

    let currentBalance = parseFloat(
      await accountBalance.getAccountBalance(req.body.account_id)
    );

    currentBalance += parseFloat(req.body.transaction_value);

    await Account.update(
      { balance: parseFloat(currentBalance) },
      {
        where: { id: req.body.account_id },
      }
    );

    return res.status(200).json({ transactionSaved });
  }
}

module.exports = new DepositController();
