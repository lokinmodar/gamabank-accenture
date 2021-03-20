const Yup = require('yup');

// validando a requisição
const creditPurchase = Yup.object()
  .shape({
    transaction_value: Yup.number().required(),
    operation: Yup.string().required(),
    split_in: Yup.number()
  })
  .label('creditPurchaseRequestDTO');

module.exports = creditPurchase;
