const creditCardBillPaymentDto = require('../models/dto/creditCardBillPayment.dto');
const findUserIdByToken = require('../services/findUserIdByToken.service');
const { billPayment } = require('../services/creditCardBillPayment.service');

class CreditCardBillPaymentController {
  async store(req, res) {
    const schema = creditCardBillPaymentDto;

    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ RequestFormatError: error.errors[0] });
    }

    const parsedDate = new Date(req.body.transaction_pay_date);
    if (parsedDate < new Date()) {
      return res
        .status(409)
        .json({ Error: 'Payment date must be today or greater.' });
    }

    const [, token] = req.headers.authorization.split(' ');
    const accountId = await findUserIdByToken.accountIdByToken(token);

    const payment = await billPayment(accountId, parsedDate);

    if (payment !== 0 && payment !== 1) {
      return res.status(200).json({ message: payment });
    } else {
      if (payment === 0) {
        return res
          .status(400)
          .json({ Error: 'No transactions in the period.' });
      }
      if (payment === 1) {
        return res
          .status(400)
          .json({ Error: 'Not enough balance to finish the payment.' });
      }
    }
  }
}

module.exports = new CreditCardBillPaymentController();
