const creditPurchaseDto = require('../models/dto/creditPurchase.dto');
const { Transaction } = require('../models');
const findUserIdByToken = require('../services/findUserIdByToken.service');
const { checkValueNotNegative } = require('../services/checkTransactionValue.service');
const { getAccountCreditLimit, getUsedCredit, getDateCard } = require('../services/creditBalance.service');
const {sendExtractEmail} = require('../controllers/mail.controller')

class CreditPurchaseController {
  async store(req, res) {
    const schema = creditPurchaseDto;
    try {
      await schema.validate(req.body); // chamada ao yup.validate pra validação do DTO(schema)
    } catch (error) {
      // extraindo de dentro do retorno do Yup o erro exato
      return res.status(400).json({ RequestFormatError: error.errors[0] });
    }

    if (await checkValueNotNegative(req.body.transaction_value)) {
      return res
        .status(400)
        .json({ error: 'Transaction value must be greater than 0.' });
    }
    //recuperando o token do usuário
    const [, token] = req.headers.authorization.split(' ');

    // recuperando a conta pelo token
    const accountId = await findUserIdByToken.accountIdByToken(token);

    // recuperando o total de crédito qeu o usuário já utilizou
    let usedCreditLimit = await getUsedCredit(accountId);

    // recuperando o limite de crédito do usuário
    const {credit_limit} = await getAccountCreditLimit(accountId);

    // recuperando a data de vencimento do cartão de crédito do usuário
    const {card_due_day} = await getAccountCreditLimit(accountId);

    // service para recuperar o dia que a transação vai fechar
    const dateCardDueDay = await getDateCard(card_due_day);

    // conta para saber quanto de limite o usuário tem disponivel
    let currentCreditLimit = credit_limit - usedCreditLimit;

    // se o valor for maior que o limite é retornado um erro
    if (req.body.transaction_value > currentCreditLimit) {
      return res.status(400).json({ error: 'Insuficient credit limit' });
    }

    // Retorno de resposta quando a rota é chamada
    const transactionToCreate = {
      account_id: accountId,
      transaction_type_id: 3,
      transaction_value: req.body.transaction_value,
      operation: req.body.operation,
      transaction_due_date: dateCardDueDay,
    };

    // salvando a transação no banco de dados
    const purchaseMade = await Transaction.create(transactionToCreate);

    // passados os atributos no corpo da requisição em JSON
    usedCreditLimit = await getUsedCredit(accountId);

    // recuperando o limite restante para exibir para o usuário
    currentCreditLimit = credit_limit - usedCreditLimit; 

    /* 
      recuperando a url com o e-mail para o usuário
      passando como paramêtro as informações operator, transaction_value e dateCardDueDay
    */
    const mail = await sendExtractEmail(req.body.operation, req.body.transaction_value, `${dateCardDueDay.getDate()}/${dateCardDueDay.getMonth() < 10 ? '0' + (dateCardDueDay.getMonth() + 1) : dateCardDueDay.getMonth() + 1 }/${dateCardDueDay.getFullYear()}`
    );


    return res.status(200).json({ purchaseMade, currentCreditLimit, mail});
  }
}
module.exports = new CreditPurchaseController();
