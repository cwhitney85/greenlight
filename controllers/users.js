const express = require('express');
const users = express.Router();
const User = require('../models/users.js');


users.get('/users/new', (req, res) => {
  res.render('./users/new.ejs');
})

users.post('/users', (req, res) => {
  User.create(req.body, (err, user) => {
    res.redirect('/members/new')
  })
});

module.exports = users;

