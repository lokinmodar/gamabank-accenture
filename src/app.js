import 'dotenv/config';

import express from 'express';
import 'express-async-errors';
//import path from 'path';

import Youch from 'youch'; // trata mensagens de erro

import routes from './routes';

// Chamando o index.js da configuração de database
import './database';

class App {
  // Usando uma classe app com os métodos apropriados
  constructor() {
    // constructor entrega uma instância do servidor, middlewares e rotas
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(express.json());

  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      // middlewares de tratamento de erro recebem o erro como primeiro parâmetro
      // o express entende que middlewares com mais de 3 parâmetros são de tramento de erro
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal Server Error' });
    });
  }
}

export default new App().server;
