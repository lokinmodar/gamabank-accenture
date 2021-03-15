import jwt from 'jsonwebtoken';

import sessionDto from '../models/dto/session.dto';
import Session from '../models/session.model';
import authConfig from '../../configs/auth';
import UserExists from '../services/checkuserexists.service';
import sessionCreate from '../services/session.service';

// gerar arquivo exportando chave secreta e data de expiração

class SessionController {
  async store(req, res) {
    const schema = sessionDto;

    try {
      await schema.validate(req.body); // chamada ao yup.validate pra validação do DTO(schema)
    } catch (error) {
      // extraindo de dentro do retorno do Yup o erro exato
      return res.status(400).json({ error_1: error.errors[0] });
    }
    // checando se usuário com e-mail informado existe
    const user = await UserExists.userWithEmailExists(req.body.user_email);

    if (!user) {
      // checa se usuário do email fornecido está cadastrado
      return res.status(401).json({ error: 'User not found.' });
    }

    if (!(await user.checkPassword(req.body.password, user.salt))) {
      // checa se a senha está correta
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    const { id } = user;

    const token = await sessionCreate.userSignIn(id);

    const sessionToCreate = { user_id: id, token };

    const createdSession = await Session.create(sessionToCreate);

    return res.json({
      createdSession,
    });
  }
}

export default new SessionController();
