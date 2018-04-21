const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const app = express();
const hbs = require('express-handlebars');
const logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const AuthRoutes = require('./routes/auth')


const PORT = process.env.PORT || 3000;
console.log('__dirname', __dirname);

app.engine('hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    extname: '.hbs'
}))


app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(require('./routes/photosRoute'))
app.use(methodOverride('_method'));
app.use(session({
    store: new RedisStore(),
    secret: 'oompah loompah',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', AuthRoutes);


app.listen(PORT, ()=>{
    console.log('Listening to everything you are doing on port 3000')
})