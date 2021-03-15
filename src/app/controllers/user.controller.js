import User from '../models/user.model';
import ValidarCPF from '../../helpers/validateCPF.helper';
import userDto from '../models/dto/user.dto';
import UserExists from '../services/checkuserexists.service';

class UserController {
  async store(req, res) {
    // validações do Schema
    const schema = userDto;

    // TODO: Transformar em função helper ou service
    // TODO: Checar herarquia dos erros de verificação no YUP
    try {
      await schema.validate(req.body); // chamada ao yup.validate pra validação do DTO(schema)
    } catch (error) {
      // extraindo de dentro do retorno do Yup o erro exato
      return res.status(400).json({ error_1: error.errors[0] });
    }

    // TODO: checagem de validade do cpf
    if (!ValidarCPF(req.body.cpf)) {
      return res.status(400).json({ error: 'Invalid CPF.' });
    }

    if (await UserExists.checkUserExists(req.body.user_email, req.body.cpf)) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const createdUser = await User.create(req.body); // passados os atributos no corpo da requisição em JSON
    createdUser.password = undefined;
    createdUser.password_hash = undefined;
    createdUser.salt = undefined;

    return res.json({
      createdUser,
    });
  }
}

export default new UserController();
