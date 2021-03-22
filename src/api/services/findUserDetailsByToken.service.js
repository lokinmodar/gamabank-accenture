const { Session } = require('../models');
const { Account } = require('../models');
const { User } = require('../models');

module.exports = {
  userDetailsByToken: async (token) => {
    const sessionWithToken = await Session.findOne({
      where: { token },
      attributes: ['user_id'],
    });
    const userDetails = await User.findOne({
      where: { id: sessionWithToken.user_id },
    });
    const userAccountDetails = await Account.findOne({
      where: { user_id: userDetails.id },
      attributes: ['id'],
    });
    if (userDetails !== null && userAccountDetails !== null) {

      const data = { user: userDetails, account:
        userAccountDetails }
      return data;
    }
  },
};
