var express = require('express');
const morgan = require('morgan')
const dotenv = require('dotenv');
const cors = require('cors') ;
const path = require('path');
var app = express();
const bodyParser = require('body-parser');

app.use(morgan('dev')) 

app.use(express.static('public'));

const port = process.env.PORT || 3000;

/*const routerApi = require('./routes');*/

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend con NodeJS - Express + CRUD API REST + MySQL');
});

app.get('/products', (req, res) => {
	res.send('lista de productos')
})

app.listen(port,() => {
    console.log("port ==> ", port);
});

//middlewares
app.use(bodyParser.json());

module.exports = app;