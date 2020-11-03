const bcrypt = require('bcrypt');
const express = require('express');
const spots = express.Router();
const Spot = require('../models/spots.js');

spots.get('/new', (req, res) => {
  res.render('./spots/new.ejs', {
    currentUser: req.session.currentUser
  })
});


module.exports = spots;