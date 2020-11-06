const bcrypt = require('bcrypt');
const express = require('express');
const spots = express.Router();
const Spot = require('../models/spots.js');


spots.get('/new', (req, res) => {
  res.render('./spots/new.ejs', {
    currentUser: req.session.currentUser
  })
});

spots.get('/:name/edit', (req, res) => {
  Spot.findOne( { name: req.params.name }, (err, spot) => {
    res.render('./spots/edit.ejs', {
      spot: spot,
      currentUser: req.session.currentUser
    })
  })
});

spots.get('/:name', (req, res) => {
  Spot.findOne({ name: req.params.name }, (err, spot) => {
    res.render('./spots/profile.ejs', {
      spot: spot,
      currentUser: req.session.currentUser,
    })
  })
});

spots.post('/', (req, res) => {
  req.body.deals = req.body.deals.split(',');
  if (req.body.is21Plus === "yes") {
    req.body.is21Plus = true;
  } else {
    req.body.is21Plus = false;
  }
  Spot.create(req.body, (err, spot) => {
    res.redirect('/spots/' + req.body.name)
  })
});


module.exports = spots;