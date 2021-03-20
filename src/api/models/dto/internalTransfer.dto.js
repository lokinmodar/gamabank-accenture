const Yup = require('yup');

const internTransferDto = Yup.object()
  .shape({
    transaction_value: Yup.number().required(),
    target_account_id: Yup.number(),
    target_user_name: Yup.string(),
    target_cpf: Yup.string(),
  })
  .label('internTransferDTO');

module.exports = internTransferDto;
