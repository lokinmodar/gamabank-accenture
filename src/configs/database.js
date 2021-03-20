const dotenv = require('dotenv');


dotenv.config({
  path:
    process.env.NODE_ENV === 'test'
      ? '.env.test'
      : process.env.NODE_ENV === 'development'
      ? '.env.development'
      : '.env',
});
// definindo parâmetros de acesso à base de dados


module.exports =  {
  dialect: 'mysql',
  env: process.env.NODE_ENV,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  define: {
    // timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

