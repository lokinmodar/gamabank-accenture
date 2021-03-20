const { Account } = require('../models');
//TODO: checar retorno caso a conta não exista 
module.exports = {
  getAccountBalance: async (id) => {
    const accountBalance = await Account.findOne({
      where: { id },
      attributes: ['balance'],
    }).then((account) => account.get('balance'));
    return accountBalance;
  },
};
