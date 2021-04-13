var mongoose = require('mongoose');
var moment = require('moment'); // For date handling.

var Schema = mongoose.Schema;

var ThingSchema = new Schema({
  content: { type: String, required: true},
  tag: {type:String, required: false},
  date_finish: {type: Date, required: false},
  date_now: { type: Date}
});

// Virtual for this word instance URL.   virtual代指虚拟属性，可以自行为schema创建
ThingSchema.virtual('url').get(function() {
  return '/catalog/thing/' + this._id;
});

ThingSchema.virtual('time_now').get(function() {
  return moment(this.date_now).format('YYYY-MM-DD HH:mm');
});

ThingSchema.virtual('time_finish').get(function() {
  return moment(this.date_finish).format('YYYY-MM-DD HH:mm');
});

// Export model.
module.exports = mongoose.model('Thing', ThingSchema);
