const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title: String,
  budget: Number
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;