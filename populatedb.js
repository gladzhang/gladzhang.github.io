#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0-mbdj7.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')

var Thing = require('./models/thing')
var Word = require('./models/word')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


var words = []
var things = []

function wordCreate(content, date_now, cb) {
  worddetail = {content:content, date_now:date_now}
  var word = new Word(wordsdetail);
       
  word.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New word: ' + word);
    words.push(word)
    cb(null, word)
  }  );
}
function thingCreate(content, date_now, cb) {
  thingdetail = {content:content, date_now:date_now}
  var thing = new Thing(wordsdetail);
       
  thing.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New thing: ' + thing);
    things.push(thing)
    cb(null, thing)
  }  );
}






