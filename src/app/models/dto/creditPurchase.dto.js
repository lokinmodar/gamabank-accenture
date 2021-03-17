import * as Yup from 'yup';

// validando a requisição
const creditPurchase = Yup.object()
  .shape({
    account_id: Yup.number().required(),
    transaction_value: Yup.number().required(),
        
  })
  .label('creditPurchaseRequestDTO');

module.exports = creditPurchase;