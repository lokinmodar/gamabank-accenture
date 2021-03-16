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
  env: process.env.NODE_ENV,
  secret: process.env.APP_SECRET, // TOKEN JWT
  salt: process.env.SALT,
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};
