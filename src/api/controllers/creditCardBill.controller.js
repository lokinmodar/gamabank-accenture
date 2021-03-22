const { Transaction } = require('../models');
const creditCardBillDto = require('../models/dto/creditCardBill.dto');
const { userDetailsByToken } = require('../services/findUserDetailsByToken.service')

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
      res
        .status(409)
        .json({ Error: 'Invalid session token. User not found.' });
    }



    // passados os atributos no corpo da requisição em JSON
    return res.status(200).json({ ok: 'uiuiui' });
  }
}

module.exports = new CreditCardBillController();
