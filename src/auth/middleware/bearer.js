'use strict';
const users = require('../models/users-model');

module.exports = async (req, res, next) => {
  /*
    req.headers = {
     "authorization":"Bearer kansdlkasndkasndslakdn"
    }
    */
  // do we have the authorization headers or not?
  if (!req.headers.authorization) {
    next('Invalid authorization there is no token bearer');
  } else {
    // "Bearer kansdlkasndkasndslakdn" => ["Bearer","kansdlkasndkasndslakdn"]
    const [auth, token] = req.headers.authorization.split(' ');
    console.log('TOKEN in bearer ------->', token);
    switch (auth) {
    case 'Bearer':
      try{
        req.user = await users.authenticateToken(token);
      }catch(e){
        next(e.message);
      }
      next();
      break;
    default:
      next('Invalid authorization header ; you should have token inside bearer');
      break;
    }
       
    // if (auth === 'Bearer') {
    //   // "Bearer kansdlkasndkasndslakdn" => ["Bearer","kansdlkasndkasndslakdn"]
    //   console.log('TOKEN in bearer ------->', token);
    //   users
    //     .authenticateToken(token)
    //     .then((validUser) => {
    //       req.user = validUser;
    //       next();
    //     })
    //     .catch((e) => next('Invalid login', e.message));
    // } else {
    //   next('Invalid auth header');
    // }
  }
};