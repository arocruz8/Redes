/*-
const express=require('express');
const router=express.Router();

router.get('/users/singin', (req, res)=>{
  res.send('Formulario de ingreso al app');
 //res.render('index.hbs');
});


router.get('/users/singup', (req,res)=>{
  res.send('Registro de usuario');
  //res.render('about.hbs');
});

module.exports= router;
*/

const express=require('express');
const router=express.Router();
const passport = require('passport');

const User = require('../models/Users');//trae el esquema de los ususarios


//rutas de login de usuario
router.get('/users/singin', (req,res)=>{
  res.render('users/singin');
});

router.post('/users/singin',passport.authenticate('local', {
  successRedirect: 'https://54.162.225.141:943/admin/', //error bad request
  failureRedirect: '/users/singin',
}));


//rutas de registro de usuario
router.get('/users/singup', (req,res)=>{
    res.render('users/singup');
});

router.post('/users/singup', async (req, res) => {
    let errors = [];
    const {name, email, password, confirm_password} = req.body;
    if (name.length <= 0){
        errors.push({text: 'Favor ingrese un nombre'});
    }
    if(password != confirm_password) {
      errors.push({text: 'Contrasenas no coinsiden'});
    }
    if(password.length < 4) {
      errors.push({text: 'La contrasena debe tener al menos 4 caracteres'})
    }
    if(errors.length > 0){
      res.render('users/singup', {errors, name, email, password, confirm_password});
    } else {
      // Look for email coincidence
      const emailUser = await User.findOne({email: email});
      if(emailUser) {
        res.redirect('/users/singup');
      } else {
        // Saving a New User
        const newUser = new User({name, email, password});
        //guarda la contrasena encriptada
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        res.redirect('/users/singin')
      
      }
    }

  });

module.exports = router;
