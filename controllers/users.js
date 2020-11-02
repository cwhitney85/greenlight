const express = require('express');
const users = express.Router();
const User = require('../models/users.js');


users.get('/new', (req, res) => {
  res.render('./users/new.ejs');
})

users.post('/', (req, res) => {
  User.create(req.body, (err, user) => {
    if (err) {
      console.log(err)
    } else {
      res.redirect('/members/new')
    }
  })
});

module.exports = users;

