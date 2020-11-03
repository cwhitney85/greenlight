const bcrypt = require('bcrypt');
const express = require('express');
const spots = express.Router();
const Spot = require('../models/spots.js');

spots.get('/new', (req, res) => {
  res.send('this is where new bars sign up')
});


module.exports = spots;