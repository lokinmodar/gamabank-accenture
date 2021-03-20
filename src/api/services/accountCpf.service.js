const { Account } = require('../models');
const { User } = require('../models');

module.exports = {
  accountWithCpfExists: async (cpf) => {

    const UserWithCpf = await User.findOne({
      where: { cpf },
      attributes: ['id'],
    });

    if (UserWithCpf){
      const accountWithCpf = await Account.findOne({
        where: { user_id: UserWithCpf.id },
        attributes: ['id'],
      });
      if (accountWithCpf !== null) {
        // console.log(accountWithCpf);
        return accountWithCpf.id;
      }
    }
    return false
  },
};
