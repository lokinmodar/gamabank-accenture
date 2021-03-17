import Account from '../models/account.model';

module.exports = {
  accountWithIdExists: async (id) => {
    const accountWithId = await Account.findOne({
      where: { id },
    });
    console.log(accountWithId);
    if (accountWithId !== null) {
      return true;
    }
  },
};
