// const mongoose = require('mongoose');
// const Entry = require('./entry');
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  entries: [mongoose.Schema.Types.ObjectId],
  created: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', userSchema);

export default User;