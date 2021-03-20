const { User } = require('../models');
const {formattedCPF} = require('./formatCpf.service')

// TODO: Criar teste

module.exports = {
  checkUserExists: async (user_name, user_email, cpf) => {
    const requestCPF = await formattedCPF(cpf)
    const userWithUsernameExists = await User.findOne({
      where: { user_name },
    });
    const userWithEmailExists = await User.findOne({
      where: { user_email },
    });
    const userWithCpfExists = await User.findOne({
      where: { cpf: requestCPF },
    });

    if (
      userWithUsernameExists !== null ||
      userWithEmailExists !== null ||
      userWithCpfExists !== null
    ) {
      // checando se um usuário com o user_name, email ou cpf cadastrado já existe
      return true;
    }
  },

  // função para checar se o usuário existe buscando pelo id
  userWithIdExists: async (id) => {
    // console.log(`User Id:${id}`);

    const userWithId = await User.findOne({
      where: { id },
    });
    // console.log(`user:${userWithId}`);
    if (userWithId !== null) {
      // checando se existe usuário com o id fornecido
      return true;
    }
  },

  userWithEmailExists: async (user_email) => {
    const user = await User.findOne({ where: { user_email } });
    if (user !== null) {
      return user;
    }
    return false;
  },
};
