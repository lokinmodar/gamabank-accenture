import { resolveConfig } from 'prettier';
import Account from '../models/account.model';
import Session from '../models/session.model';

module.exports = {
  accountIdByToken: async (token) => {
    const id = await Session.findOne({
      where: { token },
      attributes: ['user_id'],
    }).then((user) => {
      user.get('user_id');
      const userId = user.getDataValue('user_id');
      const accountId = await Account.findOne({
        where: { user_id: userId },
        attributes: ['id'],
      }).then((account) => {
        account.get('id');
      });
    });
    console.log(id);

    return id;
  },
};
