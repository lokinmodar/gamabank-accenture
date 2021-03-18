import * as Yup from 'yup';

// validando a requisição
const debitPurchaseDto = Yup.object()
  .shape({
    transaction_value: Yup.number().required(),
  })
  .label('debitPurchaseRequestDTO');

module.exports = debitPurchaseDto;
