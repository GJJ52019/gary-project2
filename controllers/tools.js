// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const toolRouter = express.Router();
const Tool = require('../models/tools.js');

//routes
//=============================================================================
//seed
toolRouter.get('/seed', (req, res) => {
    Tool.create(
        [{
          num: "HT-9",
          name: '1-2" Micrometer',
          brand: "L.S. Starrett",
          description: "1- 2 inch micrometer",
          dateCal: "6/15/21",
          dateDue: "12/15/21",
          inspector: "BW",
        }],
        (error, data) => {
            res.redirect('/');
        }
    );
  });

// Index
toolRouter.get('/', (req, res) => {
	Tool.find({}, (error, allTools) => {
		res.render('index.ejs', {
			currentUser: req.session.currentUser,
			tools: allTools,
		});
	});
});


// New (tool page)

toolRouter.get('/new', (req, res) => {
	res.render('tools/new.ejs', {
		currentUser: req.session.currentUser,
		currentTool: req.session.currentTool
	});
});

// DELETE
toolRouter.delete('/:id', (req, res) => {
    // res.send('deleting...');
    Tool.findByIdAndDelete(req.params.id, (err, data) => {
        res.redirect('/tools');
    });
});

// UPDATE
toolRouter.put('/:id', (req, res) => {

	Tool.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	}, (error, updatedTool) => {
		res.redirect(`/tools/${req.params.id}`);
	});
});

//create
toolRouter.post('/', (req, res) => {
	Tool.create(req.body)
	.then((newTool)=>{
		console.log(newTool);
		res.redirect('/tools');
	})
	// Tool.create(req.body, (error, createdTool) => {
    //     res.redirect('/tools');
    // });
});

// EDIT
toolRouter.get('/:id/edit', (req, res) => {
	Tool.findById(req.params.id, (error, foundTool) => {
		res.render('tools/edit.ejs', {
			currentUser: req.session.currentUser,
			tool: foundTool
		});
	});
});

// Show
toolRouter.get('/:id', (req, res) => {
	Tool.findById(req.params.id, (err, foundTool) => {
		res.render('tools/show.ejs', {
			currentUser: req.session.currentUser,
			tool: foundTool,
		});
	});
});

// // Create (registration route)
// toolRouter.post('/', (req, res) => {
//     req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(12));
    
//     User.create(req.body, (error, createdUser) => {
//         res.redirect('/');//send to root path
//     });

// });

// Export Tool Router
module.exports = toolRouter;