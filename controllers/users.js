const express = require('express');
const users = express.Router();
const User = require('../models/users.js');

users.get('/new', (req, res) => {
  res.render('./users/new.ejs');
})

users.post('/', (req, res) => {
  res.send(req.body)
});

module.exports = users;