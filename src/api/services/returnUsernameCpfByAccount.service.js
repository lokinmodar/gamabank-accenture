const { Account } = require('../models');
const { User } = require('../models');

module.exports = {
  getUsernameCPF: async (id) => {
    const userId = await Account.findOne({
      where: { id },
      attributes: ['user_id'],
    });
    const usernameCpf = await User.findOne({
      where: { id: userId.user_id },
    });
    if (usernameCpf) {
      // console.log(accountWithUserId);
      return {user_name: usernameCpf.user_name,
              cpf: usernameCpf.cpf};
    }
  },
};

