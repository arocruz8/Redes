const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const User = require('../models/Users');

//autentificacion
passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    // valida que el usuario exista
    const user = await User.findOne({email: email});
    if (!user) {
      return done(null, false, { message: 'El usuario no existe' });
    } else {
      // valida la contrasena
      const match = await user.matchPassword(password);
      if(match) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Contrasena incorrecta' });
      }
    }
  }));
  
  //crea una sesion en la paginna
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });