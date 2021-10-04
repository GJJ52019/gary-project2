//Dependencies
//___________________
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require ('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');

//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
// const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
// const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(process.env.DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Error / success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
// app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false
    }));//requires express session
    
app.use(methodOverride('_method'));


//___________________
// Routes
//___________________
//localhost:3000
const userController = require('./controllers/users');
app.use('/users', userController);

const sessionsController = require('./controllers/sessions');
    app.use('/sessions', sessionsController);

    // Routes / Controllers
app.get('/', (req, res) => {
	res.render('index.ejs', {
		currentUser: req.session.currentUser
	});
});
//___________________
//Listener
//___________________
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));