import Account from '../models/account.model';

module.exports = {
  getAccountBalance: async (id) => {
    const accountBalance = await Account.findOne({
      where: { id },
      attributes: ['balance'],
    }).then((account) => account.get('balance'));
    return accountBalance;
  },
};
