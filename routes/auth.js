const express = require('express');
const router = require('express').Router();
const Users = require('../db/models/Users');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  console.log('serializeUser', user);
  done(null, { email: user.email });
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
        
        // if (user.password === password) {
        //   console.log('user.password', user.password);
        //   done(null, user);
        // } else {
        //   console.log('authentication failed');
        //   done(null, false);
        // }
        bcrypt.compare(password, user.password).then(res => {
          if (res) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
      })
      .catch(err => {
        done(null, false);
      });
  })
);

const SALT_ROUND = 12;

// authentication routes

//this code registers a new user
router.post('/auth/register', (req, res) => {
  const { email, password } = req.body;
  bcrypt
    .genSalt(12)
    .then(salt => {
      return bcrypt.hash(password, salt);
    })
    .then(hash => {
      return Users.forge({ email, password: hash }).save();
    })
    .then(user => {
      user = user.toJSON();
      res.json(user);
    })
    .catch(err => {
      res.json(err);
    });
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

//this code determines if the user is authenticated and allows them to use the app

const isAuthenticated = (req, res, done) => {
  if (req.isAuthenticated()) {
    done();
  } else {
    res.redirect('/');
  }
};

router.get('/auth/secret', isAuthenticated, (req, res) => {
  res.send('You found the secret');
});

router.get('/login', (req,res)=>{
    res.render('templates/login.hbs',{
        pageTitle: 'Please log in to continue'
    })
})
module.exports = router;
