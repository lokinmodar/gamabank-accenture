require('dotenv/config');

// definindo parâmetros de acesso à base de dados

export default {
  dialect: 'mysql',
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
