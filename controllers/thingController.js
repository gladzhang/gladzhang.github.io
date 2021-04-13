var Thing = require('../models/thing')
var async = require('async')


const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Display list of all Things.
exports.thing_list = function (req, res, next) {

    Thing.find()
        .sort([['date_now', 'ascending']])
        .exec(function (err, list_things) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('thing_list', { title: 'Thing List', thing_list: list_things });
        })

};

// Display detail page for a specific Thing.
exports.thing_detail = function (req, res, next) {

    async.parallel({
        thing: function (callback) {
            Thing.findById(req.params.id)
                .exec(callback)
        }
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.thing == null) { // No results.
            var err = new Error('Thing not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('thing_detail', { title: 'Thing Detail', thing: results.thing});
    });

};

// Display Thing create form on GET.
exports.thing_create_get = function (req, res, next) {
    res.render('thing_form', { title: 'Create Thing' });
};

// Handle Thing create on POST.
exports.thing_create_post = [

    // Validate fields.
    body('content').isLength({ min: 1 }).trim().withMessage('Content can be as long as 1000.'),
    body('tag').isLength({ min: 1 }).trim().withMessage('tag can be as long as 100.'),

    // Sanitize fields.
    sanitizeBody('content').escape(),
    sanitizeBody('tag').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create Thing object with escaped and trimmed data
        var time = new Date();
        var thing = new Thing(
            {
                content: req.body.content,
                tag: req.body.tag,
                date_now: time.toLocaleString(),
                date_finish: null,
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('thing_form', { title: 'Create Thing', thing: thing, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save thing.
            thing.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new thing record.
                res.redirect(thing.url);
            });
        }
    }
];



// Display Thing finish form on GET.
exports.thing_delete_get = function (req, res, next) {

    async.parallel({
        thing: function (callback) {
            Thing.findById(req.params.id).exec(callback)
        },
   
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.thing == null) { // No results.
            res.redirect('/catalog/things');
        }
        // Successful, so render.
        res.render('thing_delete', { title: 'Delete Thing', thing: results.thing});
    });

};

// Handle Thing delete on POST.
exports.thing_delete_post = function (req, res, next) {

    async.parallel({
        thing: function (callback) {
            Thing.findById(req.body.thingid).exec(callback)
        },

    }, function (err, results) {
        if (err) { return next(err); }
        // Success.
        Thing.findByIdAndRemove(req.body.thingid, function deleteThing(err) {
            if (err) { return next(err); }
            // Success - go to author list.
            res.redirect('/catalog/things')
        })
          
    });

};

// Display Thing finish form on GET.
exports.thing_finish_get = function (req, res, next) {

    async.parallel({
        thing: function (callback) {
            Thing.findById(req.params.id).exec(callback)
        },
   
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.thing == null) { // No results.
            res.redirect('/catalog/things');
        }
        // Successful, so render.
        res.render('thing_finish', { title: 'Finish Thing', thing: results.thing});
    });

};

// Handle Thing delete on POST.
exports.thing_finish_post = function (req, res, next) {

    async.parallel({
        thing: function (callback) {
            Thing.findById(req.body.thingid).exec(callback)
        },

    }, function (err, results) {
        if (err) { return next(err); }
        // Success.
        var time = new Date();
        results.thing.update({date_finish:time.toLocaleString()})
        // Success - go to thing list.
        res.redirect(results.thing.url);
          
    });

};