const Sequelize = require('sequelize');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');
const models = require('./../models');

//facebookToken is the custom name of facebookstrategy
//FACEBOOK_APP_ID and FAEBOOK_APP_SECRET are set in .env file
passport.use(
  'facebookToken',
  new FacebookTokenStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
    },
    async (accessToken, refreshToken, profile, done, res) => {
      console.log(`inside facebook strategy`);
      //log to view the profile email
      console.log(`profile email: ${profile.emails[0].value}`);

      //check if there is a existing user in database either
      //with the user email or corresponding facebookid
      const existingUser = await models.user.findOne({
        where: {
          [Sequelize.Op.or]: [
            { email: { [Sequelize.Op.eq]: profile.emails[0].value } },
            { facebookid: { [Sequelize.Op.eq]: profile.id } },
          ],
        },
        attributes: ['id', 'email', 'facebookid'],
      });
      //if user exists, then return the existing user
      if (existingUser) {
        return done(null, existingUser);
      }

      //if user does not exist, then create a new record in database
      //with user email and facebookid.
      const newuser = await models.user.create({
        email: profile.emails[0].value,
        facebookid: profile.id !== null ? profile.id : null,
      });

      if (typeof newuser !== 'undefined' && newuser !== null) {
         console.log(`record inserted successfully`);
        done(null, newuser);
      }
    }
  )
);

