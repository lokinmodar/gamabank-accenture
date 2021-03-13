import { Router } from 'express';

import SessionController from './app/controllers/session.controller';
import UserController from './app/controllers/user.controller';

import authMiddleware from './app/middlewares/auth.middleware';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // como está definido aqui, somente rotas que estiverem abaixo dele no código irão usar esse middleware

routes.put('/users', UserController.update);

routes.get('/users', UserController.listUser);

routes.get('/users', UserController.listAllUsers);



export default routes;
