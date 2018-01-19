// Set-up
const express = require('express');
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();

// Utility functions
const utils = require('./controllers/utils');

// Auth items
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Bodyparser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(utils.checkAuth);  // Check auth


// Resources - Public
app.use(express.static('public'));

// Database Models - Mongoose
// NOTE: change the mongodb location as needed, please.
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/circuit-studio');

// View Engine - Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Controllers
require('./controllers/home.js')(app);
require('./controllers/auth.js')(app);

// Porting
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
