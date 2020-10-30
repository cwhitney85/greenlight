const express = require('express');
const users = express.Router();
const User = require('../models/users.js');

users.get('/new', (req, res) => {
  res.render('./users/new.ejs');
})

module.exports = users;