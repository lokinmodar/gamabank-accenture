const { Session } = require('../models');
const { Account } = require('../models');

module.exports = {
  accountIdByToken: async (token) => {
    const sessionWithToken = await Session.findOne({
      where: { token },
      attributes: ['user_id'],
    });
    const accountWithUserId = await Account.findOne({
      where: { user_id: sessionWithToken.user_id },
    });
    if (accountWithUserId !== null) {
      // console.log(accountWithUserId);
      return accountWithUserId.id;
    }
  },
};
