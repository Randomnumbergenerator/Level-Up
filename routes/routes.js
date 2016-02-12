var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var List = require('../app/models/list');
var Task = require('../app/models/task');
var listQuery = List.find({});
var taskQuery = Task.find({});

String.prototype.toObjectId = function() {
  var ObjectId = (require('mongoose').Types.ObjectId);
  return new ObjectId(this.toString());
};

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
          // var listId = listsId.toObjectId();
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


  app.get('/user_data', function(req, res, next) {
    var userId = req.user._id;
    User.findOne({
      _id: userId
    }, function(err, user) {
      if (err) {
        console.log(err);
        throw err;
      }
      res.json(user);
    });
  });

  // shows the lists

  //   app.get('/fun', isLoggedIn, function(req, res, next) {
  //       List.find({
  //       userId: req.user._id
  //     }, function(err, lists) {
  //       if (err) throw err;

  //       res.render('list', {
  //         title: 'holy cow',
  //         user: req.user.local.email,
  //         toDoList: lists
  //       });
  //     });
  //   });

  // // to create a new list of tasks
  //   app.post('/fun', function(req, res) {
  //     var user = req.user;

  //     var listItem = new List({
  //       name: req.body.listName,
  //       userId: user._id
  //     });

  //     listItem.save(function(err, listItem) {
  //       if (err) throw err;
  //       res.status(200).json(listItem);
  //     });
  //   });


  // //  to create a new task
  //   app.post('/list/:id', function(req, res) {
  //     var newTask = new Task({
  //       item: req.body.item,
  //       points: req.body.points,
  //       listId: '56ba62922426bb4a70102464'

  //     });

  //     newTask.save(function(err, newTask) {
  //       if (err) throw err;
  //       res.status(200).json(newTask);
  //     });
  //   });

  // // shows the tasks of the list
  //    app.get('/list/:id', isLoggedIn, function(req, res, next) {
  //       Task.find({
  //           listId: req.params.id
  //       }, function(err, items) {
  //         if (err) throw err;

  //         console.log(items);
  //         res.render('tasks', {
  //           title: 'holy cow',
  //           stuff: items,
  //         });
  //       });
  //   });


  //    // I stopped with building out the routes here





  //   app.post('/fun/:id', function(req, res, next) {
  //     var done = req.body.done;
  //     var item = req.body.item;
  //     update = {
  //       $set: {
  //         done: done,
  //         item: item
  //       }
  //     };
  //     console.log(update);
  //     Item.findByIdAndUpdate({
  //       _id: req.params.id
  //     }, update, function(err, item) {
  //       if (err) throw err;
  //       res.json(item);
  //     });
  //   })

  //   app.post('/fun/delete/:id', function(req, res, next) {
  //     var id = req.params.id;
  //     Item.findByIdAndRemove(id, function(err, item) {
  //       if (err) throw err;
  //       res.json("Deleted task with id: " + id);
  //     });
  //   })


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
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // app.post('/signup', do all our passport stuff here);

  // =====================================
  // PROFILE SECTION =====================
  // =====================================
  // we will want this protected so you have to be logged in to visit
  // we will use route middleware to verify this (the isLoggedIn function)
  app.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', {
      user: req.user // get the user out of session and pass to template
    });
  });

  // =====================================
  // LOGOUT ==============================
  // =====================================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
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
