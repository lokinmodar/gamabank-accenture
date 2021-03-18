import creditPurchaseDto from '../models/dto/creditPurchase.dto';
import Transaction from '../models/transaction.model';
import findUserIdByToken from '../services/findUserIdByToken.service';
import { checkValueNotNegative } from '../services/checkTransactionValue.service';
import {getAccountCreditLimit, getUsedCredit, getDateCard} from '../services/creditBalance.service'

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
    // passar o account_id
    const [, token] = req.headers.authorization.split(' ');

    const accountId = await findUserIdByToken.accountIdByToken(token);

    let usedCreditLimit = await getUsedCredit(accountId);

    const {credit_limit} = await getAccountCreditLimit(accountId);

    const {card_due_day} = await getAccountCreditLimit(accountId);

    const dateCardDueDay = await getDateCard(card_due_day);
    
    let currentCreditLimit = credit_limit - usedCreditLimit;



    if (req.body.transaction_value > currentCreditLimit) {
      return res.status(400).json({ error: 'Insuficient credit limit' });
    }

    // Retorno de resposta quando a rota é chamada:
    const transactionToCreate = {
      account_id: accountId,
      transaction_type_id: 3,
      transaction_value: req.body.transaction_value,
      transaction_due_date: dateCardDueDay,
    };

    
    const purchaseMade = await Transaction.create(transactionToCreate);
    // passados os atributos no corpo da requisição em JSON
    usedCreditLimit = await getUsedCredit(accountId);
    currentCreditLimit = credit_limit - usedCreditLimit;
    return res.status(200).json({ purchaseMade, currentCreditLimit });
  }
}
export default new CreditPurchaseController();
