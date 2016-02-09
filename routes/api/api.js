var express = require('express');
var router = express.Router();
var lists = require('./lists');
var tasks = require('./tasks');

module.exports = function(app) {
  app.use('/lists', lists);
  app.use('/tasks', tasks);

  return router;
}