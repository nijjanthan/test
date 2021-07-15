const express = require('express');
const router = express.Router();

module.exports = function ( app ) {
  app.use('/test/:model', require('./routes')(router));
};
