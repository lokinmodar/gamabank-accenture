import Account from '../models/account.model';
import ValidarCPF from '../../helpers/validateCPF.helper';
import User from '../models/user.model';
// TODO:corrigir lógica para pegar conta pelo nome de usuário
module.exports = {
  accountWithCpfExists: async (cpf) => {
    if (!(await ValidarCPF(req.body.cpf))) {
        return res.status(400).json({ error: 'Invalid CPF.' });
      }
    const UserWithCpf = await User.findOne({
      where: { cpf },
    });
    const accountWithCpf = await Account.findOne({where: {user_id: UserWithCpf.id}})
    if (accountWithCpf !== null) {
        console.log(accountWithCpf)
      return accountWithCpf.id;
    }
  },
};
