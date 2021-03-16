import * as Yup from 'yup';

// validando a requisição
const debitPurchaseDto = Yup.object()
  .shape({
    account_id: Yup.number().required(),
    transaction_value: Yup.number().required(),
        
  })
  .label('debitPurchaseRequestDTO');

module.exports = debitPurchaseDto;