// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const userRouter = express.Router();
const Tool = require('../models/tools.js');

// New (tool page)
toolRouter.get('/new', (req, res) => {
	res.render('tools/new.ejs', {
		currentTool: req.session.currentTool
	});
});

// Create (registration route)
userRouter.post('/', (req, res) => {
    //overwrite the user password with the hashed password, then pass that in to our database
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    
    User.create(req.body, (error, createdUser) => {
        res.redirect('/');//send to root path
    });

});

// Export User Router
module.exports = toolRouter;