const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./DB');
const cors = require('cors');
const routes = require('./routers/route');
const userRoute = require('./routers/useRoute');


var app = express();

app.use(cors());
app.use(bodyParser.json());

// localhost:3000/api/addblog
app.use('/api',routes);
// localhost:3000/api/register
app.use('/api',userRoute);

// for login and registration process we have to install 2 packages
// 1. npm install bcryptjs
// 2. npm install jsonwebtoken


app.listen(3000,()=> console.log('Server started at port : 3000'));