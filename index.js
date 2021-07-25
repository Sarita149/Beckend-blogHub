const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./DB');
const cors = require('cors');
const routes = require('./routers/route');
const userRoute = require('./routers/useRoute');


// // logger setup
const morgan = require('morgan');
// const pino = require('pino');
// const expressPino = require('express-pino-logger');
// const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
// const expressLogger = expressPino({ logger });


var app = express();

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.json({ limit: '150mb' }));



// logger
// app.use(expressLogger);
app.use(morgan("tiny"));
// app.use((req, res, next) => {
//     console.log("Request :: ", req.body);
//     next();
// });


// localhost:3000/api/addblog
app.use('/api', routes);
// localhost:3000/api/register
app.use('/api', userRoute);

// for login and registration process we have to install 2 packages
// 1. npm install bcryptjs
// 2. npm install jsonwebtoken


app.listen(3000, () => console.log('Server started at port : 3000'));