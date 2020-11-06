const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  picture: String,
  category: String,
  description: String,
  is21Plus: Boolean,
  capacity: Number,
  deals: [String],
  contact: { type: String, required: true }
});

const Spot = mongoose.model('Spot', spotSchema);
module.exports = Spot;