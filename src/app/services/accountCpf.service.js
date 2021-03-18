import Account from '../models/account.model';
import ValidarCPF from '../../helpers/validateCPF.helper';
import User from '../models/user.model';

module.exports = {
  accountWithCpfExists: async (cpf) => {
    if (!(await ValidarCPF(cpf))) {
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
