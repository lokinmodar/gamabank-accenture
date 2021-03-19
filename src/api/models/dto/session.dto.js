const Yup = require('yup');

// validando a requisição
const sessionDto = Yup.object()
  .shape({
    user_email: Yup.string().email().required(),
    password: Yup.string().required(),
  })
  .label('SessionCreationRequestDTO');

module.exports = sessionDto;
