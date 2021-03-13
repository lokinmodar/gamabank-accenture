import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/user.model';
import authConfig from '../../configs/auth'; // gerar arquivo exportando chave secreta e data de expiração

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      user_email: Yup.string()
        .email()
        .required(),
      password: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Email and/or password validation failed.' });
    }

    const { user_email, password } = req.body;

    const user = await User.findOne({ where: { user_email } });

    if (!user) {
      // checa se usuário do email fornecido está cadastrado
      return res.status(401).json({ error: 'User not found.' });
    }

    if (!(await user.checkPassword(password, user.salt))) {
      // checa se a senha está correta
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    const { id, name } = user;

    return res.json({
      user: {
        id,
        name,
        user_email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }), // enviando Payload (informações que serão incorporadas ao token,
      // chave única do app)
    });
  }
}

export default new SessionController();
