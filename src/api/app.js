const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger/swagger.json');
const routes = require('./routes/index');
require('../api/models')
require('../configs/env');

const app = express();

/**
    * Middleware
    */

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  '/documentation',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

// catch 400
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(`Error: ${res.originUrl} not found`);
    next();
});

// catch 500
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send(`Error: ${err}`);
    next();
});

/**
    * Register the routes
    */

routes(app);


process.on('unhandledRejection', (err) => {
  console.log('---->  Deu ruim !');
  console.error(err);
  process.exit(1);
});

module.exports = app;
