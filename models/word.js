var mongoose = require('mongoose');
var moment = require('moment'); // For date handling.

var Schema = mongoose.Schema;

var WordSchema = new Schema({
  content: { type: String, required: true},
  tag: {type:String, required: false},
  date_now: { type: Date }
});

// Virtual for this word instance URL.   virtual代指虚拟属性，可以自行为schema创建
WordSchema.virtual('url').get(function() {
  return '/catalog/word/' + this._id;
});

WordSchema.virtual('time_now').get(function() {
  return moment(this.date_now).format('YYYY-MM-DD HH:mm');
});

// Export model.
module.exports = mongoose.model('Word', WordSchema);
