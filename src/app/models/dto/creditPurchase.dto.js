import * as Yup from 'yup';

// validando a requisição
const creditPurchase = Yup.object()
  .shape({
    transaction_value: Yup.number().required(),
    split_in: Yup.number()  
  })
  .label('creditPurchaseRequestDTO');

module.exports = creditPurchase;