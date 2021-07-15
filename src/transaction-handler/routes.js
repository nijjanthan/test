const express = require('express');

module.exports = function () {
  return function () {
    const controller = require('./controller');
    const router = express.Router();

    router.get('/healthcheck', controller.healthcheck);
    router.post('/update', controller.update); 
    router.post('/login', controller.login)
    router.post('/add', controller.post); 

    
    
    return router;
  };
}();
