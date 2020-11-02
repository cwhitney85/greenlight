//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const session = require('express-session');
const app = express();
const db = mongoose.connection;
mongoose.Promise = global.Promise;
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = 'mongodb://localhost:27017/'+ `greenlight`;

// mongodb+srv://cwhitney85:<h00N-gA11>@cluster0.yzjmh.mongodb.net/<greenlight>?retryWrites=true&w=majority

// process.env.MONGODB_URI || 

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

// open the connection to mongo
db.on('open' , ()=>{});

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

// use express sessions
app.use(
  session({
    secret: process.env.SECRET || 'MoreCowbell',
    resave: false,
    saveUninitialized: false
  })
);

//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.render('index.ejs')
});

// Controllers
const usersController = require('./controllers/users.js');
app.use('/users', usersController);
const membersController = require('./controllers/members.js');
app.use('/members', membersController);

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));