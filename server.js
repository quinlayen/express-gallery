const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const hbs = require('express-handlebars');
const logger = require('morgan')


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



app.listen(PORT, ()=>{
    console.log('Listening to everything you are doing on port 3000')
})