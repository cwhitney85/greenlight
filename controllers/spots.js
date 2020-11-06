const bcrypt = require('bcrypt');
const express = require('express');
const spots = express.Router();
const Spot = require('../models/spots.js');
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
};

spots.get('/:name/profile', (req, res) => {
  Spot.findOne({ name: req.params.name }, (err, spot) => {
    res.render('./spots/profile.ejs', {
      spot: spot,
      currentUser: req.session.currentUser
    })
  })
});

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

spots.post('/', (req, res) => {
  req.body.deals = req.body.deals.split(',');
  if (req.body.is21Plus === "yes") {
    req.body.is21Plus = true;
  } else {
    req.body.is21Plus = false;
  }
  Spot.create(req.body, (err, spot) => {
    console.log(spot)
    res.redirect('/spots/' + spot.name + '/profile')
  })
});


spots.put('/:name', isAuthenticated, (req, res) => {
  req.body.deals = req.body.deals.split(',');
  if (req.body.is21Plus === "yes") {
    req.body.is21Plus = true;
  } else {
    req.body.is21Plus = false;
  }
  Spot.findOneAndUpdate({ name: req.params.name }, req.body, { new: true }, (err, updatedSpot) => {
    console.log(updatedSpot)
    res.redirect('/spots/' + updatedSpot.name)
  })
});


spots.delete('/:name', (req, res) => {
  Spot.findOneAndRemove({name: req.params.name}, (err, member) => {
    res.redirect('/')
  })
});

spots.get('/:name', (req, res) => {
  Spot.findOne({name: req.params.name}, (err, spot) => {
    res.render('./spots/show.ejs', {
      spot: spot,
      currentUser: req.session.currentUser
    })
  })
});


module.exports = spots;