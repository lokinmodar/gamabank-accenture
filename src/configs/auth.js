const dotenv = require('dotenv');

// TODO: Sempre da pra melhorar - Refatorem plmmdss
dotenv.config({
  path:
    process.env.NODE_ENV === 'test'
      ? '.env.test'
      : process.env.NODE_ENV === 'development'
      ? '.env.development'
      : '.env',
});

module.exports = {
  secret: process.env.APP_SECRET,
  expiresIn: 3000
};
