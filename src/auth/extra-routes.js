'use strict';
const express = require('express');
const extraRouter = express.Router();
const users = require('./models/users-model');
const bearer = require('./middleware/bearer');
const permissions = require('./middleware/authorize');

extraRouter.get('/secret',bearer, bearerHandler);
extraRouter.get('/read', bearer, permissions('read'),bearerHandler);
extraRouter.post('/add', bearer, permissions('create'),bearerHandler);
extraRouter.put('/change', bearer, permissions('update'), bearerHandler);
extraRouter.delete('/remove', bearer, permissions('delete'),bearerHandler);

function bearerHandler(req, res, next) {
  console.log('inside bearer');
    
  res.json({ bearer:'valid',user:req.user });
}


module.exports = extraRouter;