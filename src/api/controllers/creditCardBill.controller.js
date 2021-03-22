const { Transaction } = require('../models');
const creditCardBillDto = require('../models/dto/creditCardBill.dto');

class CreditCardBillController {
  async store(req, res) {

    const schema = creditCardBillDto;
    // verificando validade do schema usando Yup

    try {
      await schema.validate(req.body); // chamada ao yup.validate pra validação do DTO(schema)
    } catch (error) {
      // extraindo de dentro do retorno do Yup o erro exato
      return res.status(400).json({ RequestFormatError: error.errors[0] });

    }
    console.log(req.body);



    // passados os atributos no corpo da requisição em JSON
    return res.status(200).json({ ok: 'uiuiui' });
  }
}

module.exports = new CreditCardBillController();
