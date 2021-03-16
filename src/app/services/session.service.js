import jwt from 'jsonwebtoken';
import authConfig from '../../configs/auth';

module.exports = {
  userSignIn: async (id) => {
    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });
    return token;
  },
};
