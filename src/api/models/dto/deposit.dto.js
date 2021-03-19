const Yup = require('yup');

const depositDto = Yup.object()
  .shape({
    account_id: Yup.number().required(),
    transaction_value: Yup.number().required(),
    incoming_cpf: Yup.string().required(),
  })
  .label('DepositRequestDTO');

module.exports = depositDto;
