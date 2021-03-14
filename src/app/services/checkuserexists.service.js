import User from '../models/user.model';

// TODO: Criar teste
const checkUserExists = async (user_email, cpf) => {
  const userWithEmailExists = await User.findOne({
    where: { user_email },
  });
  const userWithCpfExists = await User.findOne({
    where: { cpf },
  });

  if (userWithEmailExists !== null || userWithCpfExists !== null) {
    // checando se um usuário com o email ou cpf cadastrado já existe
    return true;
  }
};

module.exports = checkUserExists;
