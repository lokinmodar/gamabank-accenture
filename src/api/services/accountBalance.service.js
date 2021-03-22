const { Account } = require('../models');

module.exports = {
  getAccountBalance: async (id) => {
    const accountBalance = await Account.findOne({
      where: { id },
      attributes: ['balance'],
    }).then((account) => account.get('balance'));
    return accountBalance;
  },
};
