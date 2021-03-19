// para verificação se o usuário está autenticado usando o token
// token será enviado no Bearer do Header da requisição POST

const jwt = require('jsonwebtoken'); // para usar o token na validação

const { promisify } = require('util'); // transforma uma função que gera Callback para uma função "async/await"

// onde está nossa chave de validação:
const authConfig = require('../../configs/auth');
module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // checando se o token veio na requisição
    return res.status(401).json({ error: 'Token not present in the Request.' });
  }

  const [, token] = authHeader.split(' '); // captando somente o token em si da string 'Bearer'

  try {
    // usando padrão "async/await" em vez do padrão de callback com a lib "promisify"
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    // captando o ID do payload do token e incluindo dentro da 'req' para que possa ser usado em outros locais da aplicação
    req.userId = decoded.id;

    // console.log(decoded);

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid Session Token.' });
  }
};
