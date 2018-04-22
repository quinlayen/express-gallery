const router = require('express').Router();
const Users = require('../db/models/Users');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  console.log('serializeUser', user);
  done(null, user.email);
});

passport.deserializeUser((user, done) => {
  console.log('deserializing User', user);
  Users.where({ email: user.email })
    .fetch()
    .then(user => {
      user = user.toJSON();
      done(null, user);
    })
    .catch(err => {
      console.log('err', err);
    });
});

passport.use(new LocalStrategy({usernameField:'email'}, (email, password, done)=>{
    Users
    .where({email})
    .fetch()
    .then( user =>{
        console.log('user in localStrategy', user);
        user = user.toJSON();
        bcrypt.compare(password, user.password)
        .then (res =>{
            if(res){
                done(null, user)
            }else{
                done(null, false)
            }
        })
    })
    .catch( err=>{
        done(null,false)
    })
}))

// authentication routes

//this code registers a new user
router.post('/auth/register', (req,res)=>{
    console.log('req.body', req.body);
  });
  
  //this code logs a user in
  router.post('/auth/login', passport.authenticate('local'))
  
  //this code logs a user out
  router.post('/auth/logout', (req,res)=>{
    req.logout();
    res.redirect('/')
  })

module.exports = router;
