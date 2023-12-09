// const mongoose = require('mongoose');
import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  title: String,
  budget: Number,
  userId: mongoose.Schema.Types.ObjectId
});

const Entry = mongoose.model('Entry', entrySchema);

export default Entry;