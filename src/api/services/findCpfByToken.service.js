const { Session } = require('../models');
const { User } = require('../models');

module.exports = {
  cpfByToken: async (token) => {
    const sessionWithToken = await Session.findOne({
      where: { token },
      attributes: ['user_id'],
    });
    if(!sessionWithToken) {
      return false;
    }
    const cpftWithUserId = await User.findOne({
      where: { id: sessionWithToken.user_id },
    });
    if (cpftWithUserId !== null) {
      // console.log(accountWithUserId);
      return cpftWithUserId.cpf;
    }
  },
};
