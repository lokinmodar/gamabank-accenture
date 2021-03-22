const Yup = require('yup');

// validando a requisição
const creditCardBillDto = Yup.object()
  .shape({
    month: Yup.number().min(1).max(12),
  })
  .label('creditCardBillRequestDTO');

module.exports = creditCardBillDto;
