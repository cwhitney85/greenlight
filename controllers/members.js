const bcrypt = require('bcrypt');
const express = require('express');
const members = express.Router();
const Member = require('../models/members.js');
const sessions = require('./sessions.js');
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
};

members.get('/:username/profile', (req, res) => {
  Member.findOne({ username: req.params.username }, (err, member) => {
    res.render('./members/profile.ejs', {
      member: member,
      currentUser: req.session.currentUser
    })
  })
});

members.get('/new', (req, res) => {
  res.render('./members/new.ejs', {
    currentUser: req.session.currentUser
  })
});

members.get('/:username/edit', (req, res) => {
  Member.findOne( { username: req.params.username }, (err, member) => {
    res.render('./members/edit.ejs', {
      member: member,
      currentUser: req.session.currentUser
    })
  })
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
    // res.redirect('/members/' + member.username + '/profile')
    res.redirect('/sessions/new')
  })
});

members.put('/:username/profile', isAuthenticated, (req, res) => {
  req.body.interests = req.body.interests.split(',');
  if (req.body.isGreen === 'green') {
    req.body.isGreen = true;
  } else {
    req.body.isGreen = false;
  }
  Member.findOneAndUpdate({ username: req.params.username }, req.body, { new: true }, (err, updatedMember) => {
    console.log(updatedMember)
    res.redirect('/members/' + updatedMember.username + '/profile')
  })
});

members.delete('/:username/profile', isAuthenticated, (req, res) => {
  Member.findOneAndRemove({username: req.params.username}, (err, member) => {
    res.redirect('/')
  })
});




module.exports = members;
