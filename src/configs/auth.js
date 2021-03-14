// separando a chave única da aplicação em um arquivo diferente.
export default {
  secret: process.env.APP_SECRET,
  expiresIn: '5m',
};
