import { Router } from 'express'; // Router gerencia todas as rotas do app

import AccountController from './app/controllers/account.controller';
import SessionController from './app/controllers/session.controller';
import UserController from './app/controllers/user.controller';
import authMiddleware from './app/middlewares/auth.middleware';

const routes = new Router();
// Store - armazenar
routes.post('/users', UserController.store); // criação de conta de usuário
routes.post('/sessions', SessionController.store); // login

routes.use(authMiddleware); // como está definido aqui, somente rotas que estiverem abaixo dele no código irão usar esse middleware

routes.post('/accounts', AccountController.store); // criação de conta bancária

export default routes;
