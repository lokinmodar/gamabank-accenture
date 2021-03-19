require('dotenv/config');

// TODO: Sempre da pra melhorar - Refatorem plmmdss
config({
  path:
    process.env.NODE_ENV === 'test'
      ? '.env.test'
      : process.env.NODE_ENV === 'development'
      ? '.env.development'
      : '.env',
});

module.exports = {
  env: process.env.NODE_ENV,
  salt: process.env.SALT,
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
}};
