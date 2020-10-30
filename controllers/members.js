const express = require('express');
const members = express.Router();
const Member = require('../models/members.js');

members.get('/new', (req, res) => {
  res.send('new members set up their profile here')
});




module.exports = members;