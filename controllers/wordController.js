var Word = require('../models/word')
var Thing = require('../models/thing');
var async = require('async')
var moment = require('moment'); // For date handling.

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

    
exports.index = function(req, res) {
    let starting = moment('2021-2-12 00:00:00')
    var now_time=new Date()
    var now = moment(now_time)
    var misec = now - starting
    var s = Math.floor(misec /  1000)
    var m = Math.floor(s / 60)
    var h = Math.floor(m / 60)
    var d = Math.floor(h / 24)
    var ms = misec
    var time = {s:s,m:m,h:h,d:d,ms:ms}
    async.parallel({
        word_count: function(callback) {
            Word.count(callback);
        },
        thing_count: function(callback) {
            Thing.count(callback);
        },
    }, function(err, results) {
        res.render('index', { title: '愿快乐永远伴你左右', error: err, data: results , time: time});
    });
};
// Display list of all Words.
exports.word_list = function (req, res, next) {

    Word.find()
        .sort([['date_now', 'ascending']])
        .exec(function (err, list_words) {
            if (err) { return next(err); }
            // Successful, so render.
            res.render('word_list', { title: 'Word List', word_list: list_words });
        })

};

// Display detail page for a specific Word.
exports.word_detail = function (req, res, next) {

    async.parallel({
        word: function (callback) {
            Word.findById(req.params.id)
                .exec(callback)
        }
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.word == null) { // No results.
            var err = new Error('Word not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('word_detail', { title: 'Word Detail', word: results.word});
    });

};

// Display Word create form on GET.
exports.word_create_get = function (req, res, next) {
    res.render('word_form', { title: 'Create Word' });
};

// Handle Word create on POST.
exports.word_create_post = [

    // Validate fields.
    body('content').isLength({ min: 1 }).trim().withMessage('Content can be as long as 1000 words.'),
    body('tag').isLength({ min: 1 }).trim().withMessage('tag can be as long as 100.'),

    // Sanitize fields.
    sanitizeBody('content').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create Word object with escaped and trimmed data
        var time = new Date();
        var word = new Word(
            {
                content: req.body.content,
                tag: req.body.tag,
                date_now: time.toLocaleString(),
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.render('word_form', { title: 'Create Word', word: word, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save word.
            word.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new word record.
                res.redirect(word.url);
            });
        }
    }
];



// Display Word delete form on GET.
exports.word_delete_get = function (req, res, next) {

    async.parallel({
        word: function (callback) {
            Word.findById(req.params.id).exec(callback)
        },
   
    }, function (err, results) {
        if (err) { return next(err); }
        if (results.word == null) { // No results.
            res.redirect('/catalog/words');
        }
        // Successful, so render.
        res.render('word_delete', { title: 'Delete Word', word: results.word});
    });

};

// Handle Word delete on POST.
exports.word_delete_post = function (req, res, next) {

    async.parallel({
        word: function (callback) {
            Word.findById(req.body.wordid).exec(callback)
        },
      
    }, function (err, results) {
        if (err) { return next(err); }
        // Success.
        Word.findByIdAndRemove(req.body.wordid, function deleteWord(err) {
            if (err) { return next(err); }
            // Success - go to author list.
            res.redirect('/catalog/words')
        })
          
    });

};

