const Yup = require('yup');

const userDto = Yup.object()
  .shape({
    full_name: Yup.string().required(),
    user_name: Yup.string().required(),
    user_email: Yup.string().email().required(),
    password: Yup.string()
      .min(8)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one number and one special character!'
      )
      .required(),
    telephone: Yup.string(),
    cpf: Yup.string().required(),
    card_due_day: Yup.string().required(),
  })
  .label('UserCreationRequestDTO');

module.exports= userDto;
