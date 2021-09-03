const express = require('express');
const flowController = require('./controllers/flowController');

const routes = express.Router();

routes.get('/flow/', flowController.index);
routes.post('/flow/', flowController.store);

module.exports = routes;