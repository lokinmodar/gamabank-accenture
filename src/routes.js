import { Router } from 'express'; // Router gerencia todas as rotas do app

import AccountController from './app/controllers/account.controller';
import SessionController from './app/controllers/session.controller';
import UserController from './app/controllers/user.controller';
import authMiddleware from './app/middlewares/auth.middleware';
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Swagger

const routes = new Router();
// Store - armazenar
routes.post('/users', UserController.store); // criação de conta de usuário
routes.post('/sessions', SessionController.store); // login
app.get('/customers', (req, res) => {
  res.send('Customer result');
});

routes.use(authMiddleware); // como está definido aqui, somente rotas que estiverem abaixo dele no código irão usar esse middleware

// TODO: Verificar se não há necessidade de criar Conta corrente separando do User
routes.post('/accounts', AccountController.store); // criação de conta bancária

export default routes;
