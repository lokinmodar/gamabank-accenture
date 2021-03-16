import * as Yup from 'yup';

// TODO: Verificar regex para aceitar só números múltiplos de 5 de 1 a 25
// validando a requisição
const accountDto = Yup.object()
  .shape({
    user_id: Yup.number().required(),
    balance: Yup.number().required(),
    credit_limit: Yup.number().required(),
    card_due_day: Yup.number().required(),
  })
  .label('AccountCreationRequestDTO');

module.exports = accountDto;
