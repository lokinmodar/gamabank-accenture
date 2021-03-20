const Yup = require('yup');

const internalTransferDto = Yup.object()
  .shape({
    transaction_value: Yup.number().required(),
    target_account_id: Yup.number(),
    target_user_name: Yup.string(),
    target_cpf: Yup.string(),
  })
  .label('internalTransferRequestDTO');

module.exports = internalTransferDto;
