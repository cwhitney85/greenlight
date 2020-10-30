const express = require('express');
const members = express.Router();
const Member = require('../models/members.js');

members.get('/new', (req, res) => {
  res.render('./members/new.ejs')
});




module.exports = members;