'use strict';
const express = require('express');
const router = express.Router();
const users = require('./ models/ users-model');
const basic = require('./middleware/basic.js');

router.post('/signup', signupHandler);
router.post('/signin',basic, signinHandler);
router.get('/users', usersHandler);



function signupHandler(req, res,next)  {
  users
    .create(req.body)
    .then((user) => {
      const token = users.generateToken(user);
      res.json({ token }); // => {token:aklndkalsndalksnd}
    })
    .catch((err) => res.status(403).send(err.message));
    
}

function signinHandler(req, res,next)  {
  res.json({ token: req.token });
}

function usersHandler(req, res, next) {
  res.json(users.list());
}



module.exports = router;