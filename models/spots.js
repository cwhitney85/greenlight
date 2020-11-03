const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  category: String,
  is21Plus: Boolean,
  capacity: Number
});

const Spot = mongoose.model('Spot', spotSchema);
module.exports = Spot;