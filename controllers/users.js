const express = require('express');
const users = express.Router();
const User = require('../models/users.js');


users.get('/new', (req, res) => {
  res.render('./users/new.ejs');
})

users.post('/', (req, res) => {
  User.create(req.body, (err, user) => {
    return res.redirect('/members/new')
  })
});

module.exports = users;

// content.js:1 Uncaught (in promise) Error: Something went wrong. Please check back shortly.     at g (content.js:1)