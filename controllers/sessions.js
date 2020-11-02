const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');

sessions.get('/new', (req, res) => {
  res.render('./sessions/new.ejs', {
    currentUser: req.session.currentUser
  })
});

sessions.post('/', (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err)
      res.send('Oops, something went wrong')
    } else if (!user) {
      res.send('<a href="/">Sorry, no user found</a>')
    } else {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.currentUser = user,
        res.redirect('/')
      } else {
        res.send('<a href="/">Password does not match</a>')
      }
    }
  })
});

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
});


module.exports = sessions;