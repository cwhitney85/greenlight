const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSchema = Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: String,
  email: String,
  picture: String,
  occupation: String,
  school: String,
  age: Number,
  location: String,
  drink: String,
  pickup: String,
  interests: [String],
  aboutMe: String,
  isGreen: { type: Boolean, required: true }
});

const Member = mongoose.model('Member', memberSchema);
module.exports = Member;