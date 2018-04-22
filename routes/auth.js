const express = require('express');
const router = require('express').Router();
const Users = require('../db/models/Users');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  console.log('serializeUser', user);
  done(null, {email:user.email});
});

passport.deserializeUser((user, done) => {
    Users.where({ email: user.email })
    .fetch()
    .then(user => {
        user = user.toJSON();
        console.log('deserializing User', user);
      done(null, user);
    })
    .catch(err => {
      console.log('err', err);
    });
});

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      
    Users.where({ email })
      .fetch()
      .then(user => {
          user = user.toJSON();
          console.log('user in localStrategy', user);
          if(user.password === password){
              console.log('user.password', user.password);
              done(null,user)
          }else{
              console.log('authentication failed')
              done(null,false)
          }
        // bcrypt.compare(password, user.password).then(res => {
        //   if (res) {
        //     done(null, user);
        //   } else {
        //     done(null, false);
        //   }
        // });
      })
      .catch(err => {
        done(null, false);
      });
  })
);

// authentication routes

//this code registers a new user
router.post('/auth/register', (req, res) => {
  console.log('req.body', req.body);
});

//this code logs a user in
router.post(
  '/auth/login',
  passport.authenticate('local', {
    failureRedirect: '/auth/login'
  }),
  (req, res) => {
    res.send('nice it worked');
  }
);

//this code logs a user out
router.post('/auth/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
