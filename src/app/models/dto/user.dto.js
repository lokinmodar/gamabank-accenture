import * as Yup from 'yup';

const userDto = Yup.object()
  .shape({
    full_name: Yup.string().required(),
    user_name: Yup.string().required(),
    user_email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, one uppercase, one number and one special case character!'
      ),
    telephone: Yup.string(),
    cpf: Yup.string().required(),
  })
  .label('UserCreationRequestDTO');

module.exports = userDto;
