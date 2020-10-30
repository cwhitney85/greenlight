const express = require('express');
const members = express.Router();
const Member = require('../models/members.js');

members.get('/profile', (req, res) => {
  res.render('./members/profile.ejs')
})

members.get('/new', (req, res) => {
  res.render('./members/new.ejs')
});

members.post('/', (req, res) => {
  req.body.interests = req.body.interests.split(',');
  if (req.body.isGreen === 'green') {
    req.body.isGreen = true;
  } else {
    req.body.isGreen = false;
  }
  Member.create(req.body, (err, member) => {
    console.log('member is created', member)
    res.redirect('/members/profile', {
      member: member,
    })
  })
});


module.exports = members;
