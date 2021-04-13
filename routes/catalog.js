var express = require('express');
var router = express.Router();


// Require our controllers.
var word_controller = require('../controllers/wordController');
var thing_controller = require('../controllers/thingController');



// GET catalog home page.
router.get('/', word_controller.index);  

/// WORD ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/word/create', word_controller.word_create_get);

// POST request for creating Author.
router.post('/word/create', word_controller.word_create_post);

// GET request to delete Author.
router.get('/word/:id/delete', word_controller.word_delete_get);

// POST request to delete Author
router.post('/word/:id/delete', word_controller.word_delete_post);

// GET request for one Author.
router.get('/word/:id', word_controller.word_detail);

// GET request for list of all Authors.
router.get('/words', word_controller.word_list);

/// THING ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display author).
router.get('/thing/create', thing_controller.thing_create_get);

// POST request for creating Author.
router.post('/thing/create', thing_controller.thing_create_post);

// GET request to delete Author.
router.get('/thing/:id/delete', thing_controller.thing_delete_get);

// POST request to delete Author
router.post('/thing/:id/delete', thing_controller.thing_delete_post);

// GET request to finish Author.
router.get('/thing/:id/finish', thing_controller.thing_finish_get);

// POST request to delete Author
router.post('/thing/:id/finish', thing_controller.thing_finish_post);


// GET request for one Author.
router.get('/thing/:id', thing_controller.thing_detail);

// GET request for list of all Authors.
router.get('/things', thing_controller.thing_list);



module.exports = router;
