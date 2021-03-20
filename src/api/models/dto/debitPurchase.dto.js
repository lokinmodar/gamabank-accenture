const Yup = require('yup');

// validando a requisição
const debitPurchaseDto = Yup.object()
  .shape({
    transaction_value: Yup.number().required(),
    operation: Yup.string().required()
  })
  .label('debitPurchaseRequestDTO');

module.exports = debitPurchaseDto;
