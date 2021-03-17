import { Router } from 'express'; // Router gerencia todas as rotas do app

import InternTransferController from './app/controllers/internTransfer.controller';
import AccountController from './app/controllers/account.controller';
import SessionController from './app/controllers/session.controller';
import UserController from './app/controllers/user.controller';
import authMiddleware from './app/middlewares/auth.middleware';
import DepositController from './app/controllers/deposit.controller';

const routes = new Router();

// TODO: Fazer rota "/" do tipo get com mensagem avisando que é uma API rest com URL do swagger quando publicado
// Store - armazenar

routes.post('/users', UserController.store); // criação de conta de usuário
routes.post('/sessions', SessionController.store); // login
// TODO: criação da lógica para rotas novas


routes.post('/externaldeposit');
routes.post('/internaltransfer', InternTransferController.store);




routes.post('/externaldeposit', DepositController.store);



routes.use(authMiddleware); // como está definido aqui, somente rotas que estiverem abaixo dele no código irão usar esse middleware

routes.post('/accounts', AccountController.store); // criação de conta bancária

routes.post('/debitpurchase'); // despesa débito
routes.post('/carddebit');
routes.post('/cardpayment');

export default routes;
