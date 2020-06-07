'use strict';
const express = require('express');
const router = express.Router();
const users = require('./models/users-model');
const basic = require('./middleware/basic.js');
const valid = require('./middleware/valid');

router.post('/signup', signupHandler);
router.post('/signin',basic, signinHandler);
router.get('/users',valid, usersHandler);


function signupHandler(req, res,next)  {
  users
    .create(req.body)
    .then((user) => {
      console.log('this is user afer sign up',user);
      const token = users.generateToken(user);
      // console.log('token',token);
      return token;

    }).then(token=>{
      console.log('token',token);
      res.json({ token }); // => {token:aklndkalsndalksnd}
    })
    .catch((err) => res.status(403).send(err.message));
    
}

function signinHandler(req, res,next)  {
  res.json({ token: req.token });
}

async function usersHandler(req, res, next) {
  console.log('inside users');
  let allUseres = await users.list();
  // console.log('all users',allUseres);
  res.json(allUseres);
}



module.exports = router;