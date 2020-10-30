const express = require('express');
const users = express.Router();
const User = require('../models/users.js');

users.get('/new', (req, res) => {
  res.send('new users sign up here');
})

module.exports = users;