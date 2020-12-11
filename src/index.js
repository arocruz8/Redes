const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
//const flash = require('connect-flash');


//inicializar
const app = express();

//llamar a la b.d
require('./database');
require('./config/passport');


//settings
app.set('port',process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));//busca la carpeta rutas
app.engine('.hbs',exphbs({
    defaultLayout:'main.hbs',
    layoutDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine','.hbs');

//middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


//global variables

//routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));


//static files 
app.use(express.static(path.join(__dirname,'public')));

//server
app.listen(app.get('port'), function (){
    console.log('Servidor en el puerto: ',app.get('port'));
});