import * as Yup from 'yup';
import User from '../models/user.model';

class UserController {
  async store(req, res) {
    // validações do Schema
    const schema = Yup.object().shape({
      full_name: Yup.string().required(),
      username: Yup.string().required(),
      user_type: Yup.number().required(),
      user_email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
      gender: Yup.string(),
      rg: Yup.string().required(),
      cpf: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Request fields validation failed.' });
    }

    // como um Middleware
    const userWithEmailExists = await User.findOne({ where: { user_email: req.body.user_email } });
    const userWithCpfExists = await User.findOne({ where: { cpf: req.body.cpf } });
    // acima: pegando o e-mail do novo usuário a cadastrar

    if (userWithEmailExists || userWithCpfExists) {
      // checando se um usuário com o email cadastrado já existe
      return res.status(400).json({ error: 'User already exists.' });
    }

    const { id, username, user_email, user_type } = await User.create(req.body); // passados os atributos no corpo da requisição em JSON

    return res.json({
      id,
      username,
      user_email,
      user_type,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string(),
      user_email: Yup.string().email(),
      user_type: Yup.int(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Requisiton fields validation failed.' });
    }

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId); // usando userId proveniente do middleware auth.js

    // checando se o email novo já existe na base
    if (email && email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      // acima: pegando o e-mail novo a ser atualizado
      if (userExists) {
        // checando se um usuário com o email cadastrado já existe
        return res.status(400).json({ error: 'E-mail already in use.' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      // checando se a senha informada está correta
      return res.status(401).json({ error: 'Incorrect old password.' });
    }

    const { id, username, user_type } = await user.update(req.body);

    // console.log(req.userId);

    return res.json({
      updated: {
        id,
        username,
        email,
        user_type,
      },
    });
  }
}

export default new UserController();
