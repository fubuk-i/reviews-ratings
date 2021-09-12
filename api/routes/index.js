const routes = require('express').Router();
const test = require('../controllers/test');


routes.use('/api/importData', test)

module.exports = routes;