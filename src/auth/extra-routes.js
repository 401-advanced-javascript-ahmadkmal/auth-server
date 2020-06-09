'use strict';
const express = require('express');
const extraRouter = express.Router();
const users = require('./models/users-model');
const bearer = require('./middleware/bearer');


extraRouter.get('/secret',bearer, bearerHandler);

function bearerHandler(req, res, next) {
  console.log('inside bearer');
    
  res.json({ bearer:'valid',user:req.user });
}


module.exports = extraRouter;