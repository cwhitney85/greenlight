const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require('../models/users.js');


users.get('/new', (req, res) => {
  res.render('./users/new.ejs');
})

users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, user) => {
    console.log('created new user:', user)
    res.redirect('/members/new')
  })
});

module.exports = users;

// content.js:1 Uncaught (in promise) Error: Something went wrong. Please check back shortly.     at g (content.js:1)

// g = ({reject: a, resolve: n},r)=>{
  // e.runtime.lastError ? e.runtime.lastError.message === t ? n() : a(e.runtime.lastError) : r && r.