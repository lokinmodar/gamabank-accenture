// separando a chave única da aplicação em um arquivo diferente.
module.exports = {
  secret: process.env.APP_SECRET,
  expiresIn: 3000,
};
