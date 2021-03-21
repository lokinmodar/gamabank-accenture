const creditCardBillPaymentDto = require('../models/dto/creditCardBillPayment.dto');

class CreditCardBillPaymentController {
  async store(req, res) {

    const schema = creditCardBillPaymentDto;
    // verificando validade do schema usando Yup

    try {
      await schema.validate(req.body); // chamada ao yup.validate pra validação do DTO(schema)
    } catch (error) {
      // extraindo de dentro do retorno do Yup o erro exato
      res.status(400).json({ RequestFormatError: error.errors[0] });
      return;
    }
    console.log(req.body);


    const parsedDate = console.log(new Date(req.body.transaction_pay_date));
    console.log(parsedDate);



    // passados os atributos no corpo da requisição em JSON
    return res.status(200).json({ ok: 'uiuiui' });
  }
}

module.exports = new CreditCardBillPaymentController();
