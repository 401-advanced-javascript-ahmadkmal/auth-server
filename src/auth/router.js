'use strict';
const express = require('express');
const router = express.Router();
const users = require('./models/users-model');
const basic = require('./middleware/basic.js');
const valid = require('./middleware/valid');
const oauth = require('./middleware/oauth');
const token = require('./middleware/token');
router.post('/signup', signupHandler);
router.post('/signin',basic,token, signinHandler);
router.get('/users',valid, usersHandler);
router.get('/oauth',oauth,token, aouthHandler);

function signupHandler (req, res,next)  {
  console.log('signupHandler');
  users
    .create(req.body)
    .then((user) => {
      console.log('this is user after sign up',user);
      const token = users.generateToken(user);
      // req.user =await users.update(req.user._id,{token:req.token});
      // console.log('token',token);
      req.user=user;
      return token;

    }).then(token=>{
      console.log('token',token);
      req.token=token;
      // users.update(req.user._id,{token:req.token});
      return users.update(req.user._id,{token:req.token});
    }).then((userUpdate)=>{
      console.log('userUpdated',userUpdate);
      req.user = userUpdate;
      res.json({ token:req.token }); // => {token:aklndkalsndalksnd}
    })
    .catch((err) => next(err));
  // res.status(403).send(err.message
}

function signinHandler(req, res,next)  {
  console.log('signinHandler');
  res.json({ token: req.token });
}

async function usersHandler(req, res, next) {
  console.log('inside users');
  let allUseres = await users.list();
  // console.log('all users',allUseres);
  res.json(allUseres);
}

async function aouthHandler(req, res, next) {
  console.log('inside aouth');
  
  res.json({ token:req.token});
}


module.exports = router;