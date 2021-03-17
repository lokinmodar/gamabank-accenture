import * as Yup from 'yup';

const internTransferDto = Yup.object()
  .shape({
    account_id: Yup.number().required(),
    transaction_value: Yup.number().required(),
    target_account_id: Yup.number(),
    target_user_name: Yup.string(),
    target_cpf: Yup.number(),
  })
  .label('internTransferDTO');

module.exports = internTransferDto;
