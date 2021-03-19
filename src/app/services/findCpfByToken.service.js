import Session from '../models/session.model';
import User from '../models/user.model';

module.exports = {
  cpfByToken: async (token) => {
    const sessionWithToken = await Session.findOne({
      where: { token },
      attributes: ['user_id'],
    });
    const cpftWithUserId = await User.findOne({
      where: { id: sessionWithToken.user_id },
    });
    if (cpftWithUserId !== null) {
      // console.log(accountWithUserId);
      return cpftWithUserId.cpf;
    }
  },
};
