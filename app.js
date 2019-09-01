const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const login = require('./routes/login');

//set up the express app
const app = express();
//parsing incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', login);

//SERVER_PORT value accessed from .env file
const port = process.env.SERVER_PORT || 8000;
app.listen(port);
console.log(`server listening on port ${port}`);

module.exports = app;
