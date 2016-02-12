var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var List = require('../app/models/list');
var Task = require('../app/models/task');
var listQuery = List.find({});
var taskQuery = Task.find({});

module.exports = function(app, passport) {

  // =====================================
  // HOME PAGE (with login links) ========
  // =====================================
  app.get('/', isLoggedIn, function(req, res) {

    listQuery
      .where('userId', req.user._id)
      .exec(function(err, lists) {
        if (err) throw err;
        var listArr = [];
        for (var i = lists.length - 1; i >= 0; i--) {
          var listsId = lists[i]._id;
          listArr.push(listsId);
        }
        taskQuery
          .where('listId').in (listArr)
          .exec(function(err, tasks) {

            res.render('profile', {
              lists: lists,
              tasks: tasks,
              user: JSON.stringify(req.user)
            });
          });
      });
  });

  // =====================================
  // LOGIN ===============================
  // =====================================
  // show the login form
  app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('login', {
      message: req.flash('loginMessage')
    });
  });

  // process the login form
  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));
  // app.post('/login', do all our passport stuff here);

  // =====================================
  // SIGNUP ==============================
  // =====================================
  // show the signup form
  app.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.render('signup', {
      message: req.flash('signupMessage')
    });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.redirect('/login');
}
