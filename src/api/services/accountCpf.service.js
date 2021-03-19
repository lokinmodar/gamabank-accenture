const { Account } = require('../models');
const { User } = require('../models');
const validateCpf = require('../services/validateCPF.service');

module.exports = {
  accountWithCpfExists: async (cpf) => {
    if (!(await validateCpf(cpf))) {
      return { error: 'Invalid CPF.' };
    }
    const UserWithCpf = await User.findOne({
      where: { cpf },
    });
    const accountWithCpf = await Account.findOne({
      where: { user_id: UserWithCpf.id },
    });
    if (accountWithCpf !== null) {
      // console.log(accountWithCpf);
      return accountWithCpf.id;
    }
  },
};
