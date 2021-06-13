const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./DB');
const cors = require('cors');
const routes = require('./routers/route');


var app = express();

app.use(cors());
app.use(bodyParser.json());

// localhost:3000/api/addblog
app.use('/api',routes);


app.listen(3000,()=> console.log('Server started at port : 3000'));