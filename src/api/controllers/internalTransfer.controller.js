const { Transaction } = require('../models');
const { Account } = require('../models');
const internTransferDto = require('../models/dto/internalTransfer.dto');
const { accountWithIdExists } = require('../services/accountExists.service');
const {accountWithUserNameExists} = require('../services/findAccountByUserName.service');
const {accountWithCpfExists} = require('../services/accountCpf.service');
const { checkValueNotNegative } = require('../services/checkTransactionValue.service');
const accountBalance = require('../services/accountBalance.service');
const findUserIdByToken = require('../services/findUserIdByToken.service');
const findAccountByUsername = require('../services/findAccountByUserName.service');
const findCpfByToken = require('../services/findCpfByToken.service');
const validateCpf = require('../services/validateCPF.service');
class InternTransferController {
  async store(req, res) {
    const schema = internTransferDto
    let targetAccountId

    try {
      await schema.validate(req.body) // chamada ao yup.validate pra validação do DTO(schema)
    } catch (error) {
      // extraindo de dentro do retorno do Yup o erro exato
      return res.status(400).json({ RequestFormatError: error.errors[0] })
    }

    if (await checkValueNotNegative(req.body.transaction_value)) {
      return res
        .status(400)
        .json({ error: 'Transaction value must be greater than 0.' })
    }

    //verificando se foi informado: account_id, cpf ou user_name
    if (req.body.target_account_id) {

      const verifyAccountId = await accountWithIdExists(req.body.target_account_id)

      if (verifyAccountId === false) {
        return res
          .status(400)
          .json({ error: 'Target ACCOUNT does not exist.' })
      }else{
        targetAccountId = req.body.target_account_id

      }
    }else if (req.body.target_user_name) {
      //console.log(req.body.target_user_name)
      const accountByUserName = await accountWithUserNameExists(req.body.target_user_name)

      if (accountByUserName.id === false) {
        return res
          .status(400)
          .json({ error: 'Target USERNAME does not exist.' })
      }else{

        targetAccountId = accountByUserName.id
      }
    }else if (req.body.target_cpf) {

      if (!(await validateCpf(req.body.target_cpf))) {
        return res.status(400).json({ error: 'Invalid CPF.' });
      }

      const accountByCpf = await accountWithCpfExists(req.body.target_cpf)

      if (!accountByCpf) {
        return res.status(400).json({ error: 'Target CPF does not exist.' })
      }else{
        targetAccountId = accountByCpf

      }

      //aqui foi informado ou target_account_id || target_cpf || target_user_name
      const [, token] = req.headers.authorization.split(' ');
      const accountId = await findUserIdByToken.accountIdByToken(token);

      let currentOriginBalance = parseFloat(await accountBalance.getAccountBalance(accountId))

      if (req.body.transaction_value > currentOriginBalance) {
        return res.status(400).json({ error: 'Insuficient balance' });
      }

      // criando obj para inserção na tabela transactions
      const OriginTransactionToInsert = {
        account_id: accountId,
        target_account_id: targetAccountId,
        transaction_type_id: 4,
        transaction_value: req.body.transaction_value,
        //target_cpf: req.body.target_cpf, //e se não for passado cpf?
        transaction_due_date: new Date(),
        transaction_pay_date: new Date(),
      };
      const OriginTransactionSaved = await Transaction.create(OriginTransactionToInsert);

      // atualizando o saldo da conta destino
      let currentTargetBalance = parseFloat(
        await accountBalance.getAccountBalance(targetAccountId)
      );

      const incomingCpf = await findCpfByToken.cpfByToken(token);


      const TargetTransactionToInsert = {
        account_id: targetAccountId,
        transaction_type_id: 7,
        transaction_value: req.body.transaction_value,
        incoming_cpf: incomingCpf,
        transaction_due_date: new Date(),
        transaction_pay_date: new Date(),
      };

      const TargetTransactionSaved = await Transaction.create(TargetTransactionToInsert);

      currentTargetBalance += req.body.transaction_value;

      const newTargetBalance = await Account.update(
        { balance: currentTargetBalance },
        {
          where: { id: targetAccountId },
        }
      );
      // atualizando saldo da conta de origem
      currentOriginBalance -= req.body.transaction_value;

      const newOriginBalance = await Account.update(
        { balance: currentOriginBalance },
        {
          where: { id: accountId },
        }
      );
      // const { balance } = await Account.findByPk(newOriginBalance[0]);
      return res
        .status(200)
        .json({ OriginTransactionSaved, currentOriginBalance });

    }else{
      return res.status(400).json({ error: 'Inform: target_account_id or target_cpf or target_user_name.' })
    }
  }
}

module.exports = new InternTransferController();