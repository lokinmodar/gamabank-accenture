import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/user.model';
import Session from '../models/session.model';
import authConfig from '../../configs/auth'; // gerar arquivo exportando chave secreta e data de expiração

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      user_email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Email and/or password validation failed.' });
    }

    const { user_email, password } = req.body;

    const user = await User.findOne({ where: { user_email } });
    console.log(user);

    if (!user) {
      // checa se usuário do email fornecido está cadastrado
      return res.status(401).json({ error: 'User not found.' });
    }

    if (!(await user.checkPassword(password, user.salt))) {
      // checa se a senha está correta
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    //

    const { id } = user;
    const token = await jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    const sessionToCreate = { user_id: id, token };

    const createdSession = await Session.create(sessionToCreate);

    return res.json({
      createdSession,
    });
  }
}

export default new SessionController();
