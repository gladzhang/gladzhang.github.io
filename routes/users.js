var express = require('express');
var router = express.Router();

// GET users listing.
router.get('/', function(req, res, next) {
  res.render('spring');
});
router.get('/1', function(req, res, next) {
  res.render('text');
});
router.get('/2', function(req, res, next) {
  res.render('text');
});
router.get('/3', function(req, res, next) {
  res.render('text');
});
router.get('/4', function(req, res, next) {
  res.render('text');
});
module.exports = router;
