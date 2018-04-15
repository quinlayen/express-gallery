const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Photos = require('./db/models/Photos');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.send('sanity check')
})


app.listen(PORT, ()=>{
    console.log('Listening to everything you are doing on port 3000')
})