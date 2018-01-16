const express = require('express')
const exphbs  = require('express-handlebars');
const mongoose = require('mongoose');
const app = express()

// Resources - Public
app.use(express.static('public'))

// Database Models - Mongoose
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/WEB-3-Project', {useMongoClient: true});

// View Engine - Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Controllers
require('./controllers/home.js')(app);

// Porting
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
