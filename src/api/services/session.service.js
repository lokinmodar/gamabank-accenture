const jwt = require('jsonwebtoken');
const authConfig = require('../../configs/auth');

module.exports = {
  userSignIn: async (id) => {
    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
    return token;
  },
};
