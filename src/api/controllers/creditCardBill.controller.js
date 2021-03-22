const { Transaction } = require('../models');

const creditCardBillDto = require('../models/dto/creditCardBill.dto');
const {
  userDetailsByToken,
} = require('../services/findUserDetailsByToken.service');
const {
  openTransactionsByPeriod,
  openTransactionsByMonth,
} = require('../services/creditCardBill.service');
const { formattedDate } = require('../services/dateFormat.service');
class CreditCardBillController {
  async sendCardBillByMail(req, res) {
    const schema = creditCardBillDto;

    try {
      await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ RequestFormatError: error.errors[0] });
    }

    const [, token] = req.headers.authorization.split(' ');

    const userDetails = await userDetailsByToken(token);
    if (userDetails === undefined) {
      res.status(409).json({ Error: 'Invalid session token. User not found.' });
    }

    if (req.body.initial_date && req.body.end_date) {
      const initialDate = await formattedDate(req.body.initial_date);
      const endDate = await formattedDate(req.body.end_date);

      const bill = await openTransactionsByPeriod(initialDate, endDate);
      console.log(bill);

      return res.status(200).json({ ok: 'aiaiai' });
    } else {
      if (req.body.month) {
        const bill = await openTransactionsByMonth(req.body.month);
        console.log(bill);
        for (var key of Object.keys(bill)) {
          console.log(key + " -> " + JSON.stringify(bill[key]))
      }



        return res.status(200).json({ ok: 'uiuiui' });
      } else {
        return res
          .status(409)
          .json({
            Error:
              'To receive the Card Bill by mail you need to provide either initial_date AND end_date or provide the month you want to see the info for.',
          });
      }
    }



    // passados os atributos no corpo da requisição em JSON
  }
}

module.exports = new CreditCardBillController();
