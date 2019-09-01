const express = require('express');
const routes = express.Router();
const passport = require('passport');

//reference to passport.js file in config folder
const passportConf = require('./../config/passport');
const loginController = require('./../controllers/loginController');

//facebookToken is the custom name of FacebbokStrategy
routes.post('/auth/facebook', passport.authenticate('facebookToken', {session: false}), loginController.facebookOAuth );

routes.post('/auth/google', loginController.googleCurl);

module.exports = routes;
