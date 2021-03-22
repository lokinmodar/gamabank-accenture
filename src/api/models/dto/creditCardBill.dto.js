const Yup = require('yup');

// validando a requisição
const creditCardBillDto = Yup.object()
  .shape({
    initial_date: Yup.date(),
    end_date: Yup.date(),
    month: Yup.number().min(1).max(12)
  })
  .label('creditCardBillRequestDTO');

module.exports = creditCardBillDto;
