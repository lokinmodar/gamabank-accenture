import Account from '../models/account.model';
import User from '../models/user.model';
// TODO:corrigir lógica para pegar conta pelo nome de usuário
module.exports = {
  accountWithUserNameExists: async (user_name) => {
    const UserWithUserName = await User.findOne({
      where: { user_name },
    });
    const accountWithUserName = await Account.findOne({where: {user_id: UserWithUserName.id}})
    if (accountWithUserName !== null) {
        console.log(accountWithUserName)
      return accountWithUserName.id;
    }
  },
};
