const { Account } = require('../models');

module.exports = {
  accountWithIdExists: async (id) => {
    const accountWithId = await Account.findOne({
      where: { id },
    });
    if (accountWithId !== null && accountWithId.get('id') === id) {
      return true;
    }
    return false;
  },
};
