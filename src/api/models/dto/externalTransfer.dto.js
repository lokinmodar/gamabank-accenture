const Yup = require('yup');

// validando a requisição
const externalTransferDto = Yup.object()
  .shape({
    transaction_value: Yup.number().required(),
    target_bank_id: Yup.number().required(),
    target_account_id: Yup.number().required(),
    target_cpf: Yup.string().required(),
  })
  .label('externalTransferRequestDTO');

module.exports = externalTransferDto;
