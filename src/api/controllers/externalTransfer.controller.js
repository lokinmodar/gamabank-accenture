const validateCPF = require('../services/validateCPF.service');
const externalTransferDTO = require('../models/dto/externalTransfer.dto');
const accountExists = require('../services/accountExists.service');
const { checkValueNotNegative } = require('../services/checkTransactionValue.service');
const accountBalance = require('../services/accountBalance.service');
const { Transaction } = require('../models');
const { Account } = require('../models');
const {formattedCPF} = require('../services/formatCpf.service');
const findUserIdByToken = require('../services/findUserIdByToken.service');
const findCpfByToken = require('../services/findCpfByToken.service');
const { bankWithIdExists } = require('../services/verifyExternalBank.service');

class ExternalTransferController {
  async store(req, res) {
    const schema = externalTransferDTO;

    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ RequestFormatError: error.errors[0] });
    }

    if (!(await validateCPF(req.body.target_cpf))) {
      return res.status(400).json({ error: 'Invalid CPF.' });
    }

    if (await checkValueNotNegative(req.body.transaction_value)) {
      return res.status(400).json({ error: 'Transaction value must be greater than 0.' });
    }

    const checkBankId = await bankWithIdExists(req.body.target_bank_id)

    if(checkBankId === false){
      return res.status(400).json({ error: 'Invalid Bank ID.' });
    }


    const formattedTargetCPF = await formattedCPF(req.body.target_cpf)

    const [, token] = req.headers.authorization.split(' ');
    const accountId = await findUserIdByToken.accountIdByToken(token);

    let currentBalance = parseFloat(await accountBalance.getAccountBalance(accountId))

    if (req.body.transaction_value > currentBalance) {
      return res.status(400).json({ error: 'Insuficient balance' });
    }

    const incomingCpf = await findCpfByToken.cpfByToken(token);

    // criando obj para inserção na tabela transactions
    const ExternalTransferToInsert = {
      account_id: accountId,
      target_bank_id: req.body.target_bank_id,
      target_account_id: req.body.target_account_id,
      transaction_type_id: 5,
      transaction_value: req.body.transaction_value,
      target_cpf: formattedTargetCPF,
      incoming_cpf: incomingCpf,
      transaction_due_date: new Date(),
      transaction_pay_date: new Date(),
    };
    const TransactionSaved = await Transaction.create(ExternalTransferToInsert);

    // atualizando saldo da conta de origem
    currentBalance -= req.body.transaction_value;

    const newOriginBalance = await Account.update(
      { balance: currentBalance },
      {
        where: { id: accountId },
      }
    );

    return res
      .status(200)
      .json({ TransactionSaved, currentBalance });

  }
}

module.exports = new ExternalTransferController();
