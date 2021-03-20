const { Account } = require('../models');
const { User } = require('../models');

module.exports = {
  accountWithUserNameExists: async (user_name) => {

    const UserWithUserName = await User.findOne({
      where: { user_name },
      attributes: ['id', 'cpf'],
    });

    if (UserWithUserName){

      const accountWithUserName = await Account.findOne({
        where: { user_id: UserWithUserName.id },
        attributes: ['id'],
      });
      if (accountWithUserName !== null) {

        return {id: accountWithUserName.id,
                cpf: UserWithUserName.cpf};
      }
    }
    return false
  },
};
