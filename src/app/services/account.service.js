import Account from '../models/account.model';

module.exports = {
  accountWithIdExists: async (id) => {
    const accountWithId = await Account.findOne({
      where: { id },
    });

    if (accountWithId !== null) {
      return true;
    }
  },
};
