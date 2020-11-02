const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');

sessions.get('/new', (req, res) => {
  res.send('this is your log in page. New sessions start here')
})


module.exports = sessions;