'use strict';
const express = require('express');
const notFound = require('./middleware/404.js');
const serverError = require('./middleware/500.js');
const app = express();
const route = require('./auth/router');
// global middleware
app.use(express.json()); //body-parser to add body to the req



app.use('', route);




app.use('*', notFound);
app.use(serverError);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port|| 3000;
    app.listen(PORT, () => console.log(`server is up ${PORT}`));
  },
};
