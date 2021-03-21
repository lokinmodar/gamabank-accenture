const Yup = require('yup');

// validando a requisição
const creditCardBillPaymentDto = Yup.object()
  .shape({
    transaction_pay_date: Yup.date().required().default(function () {
      return new Date();
    })
  })
  .label('creditCardBillPaymentRequestDTO');

module.exports = creditCardBillPaymentDto;
