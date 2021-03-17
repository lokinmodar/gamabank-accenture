import Account from '../models/account.model';
import Session from '../models/session.model';

module.exports = {
  accountIdByToken: async (token) => {
    const userId = await Session.findOne({
      where: { token },
      attributes: ['user_id'],
    }).then(async (user) => {
      user.get('user_id');
    });

    const accountId = await Account.findOne({
      where: { userId },
      attributes: ['account_id'],
    }).then((account) => {
      account.get('account_id');
    });

    return accountId;
  },
};
