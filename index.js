const express = require('express');
const exphbs  = require('express-handlebars');
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

// Auth
app.use(cookieParser());
app.use(utils.checkAuth); // Check auth

// Resources - Public
app.use(express.static('public'));

// View Engine - Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

if(process.env.STATUS == "development"){
    const api = process.env.STAGING_API_URL;
}
else if(process.env.STATUS == "production"){
    const api = process.env.PRODUCTION_API_URL;
}

// Controllers
require('./controllers/home.js')(app);
require('./controllers/auth.js')(app);

// Porting
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
