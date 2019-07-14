const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { mongoUri, clientURI } = require('./configuration');

mongoose.Promise = global.Promise;
mongoose.connect(mongoUri, { useCreateIndex: true, useNewUrlParser: true });

const app = express();
app.use(cookieParser())
app.use(cors({
  origin: clientURI,
  credentials: true,
  maxAge: 20 * 60 * 60
}));

// Middlewares moved morgan into if for clear tests
if (!process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

app.use(bodyParser.json());

// User Routes
app.use('/users', require('./routes/users'));
// Location Routes
app.use('/locations', require('./routes/locations'));

module.exports = app;