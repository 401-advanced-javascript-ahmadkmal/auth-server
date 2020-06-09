'use strict';
const express = require('express');
const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500.js');
const app = express();
const route = require('./auth/router');
const extraRoute =require('./auth/extra-routes');
// global middleware
app.use(express.json()); //body-parser to add body to the req


app.use(express.static('./public'));
app.use('', route);
app.use('',extraRoute);




app.use('*', notFound);
app.use(serverError);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port|| 3000;
    app.listen(PORT, () => console.log(`server is up ${PORT}`));
  },
};
