var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Item = require('../app/models/task');

module.exports = function(app, passport) {

  /* GET home page. */
  app.get('/fun', function(req, res, next) {

    // res.json(req.user);

    console.log('hello');
    var results = 'hello';
    Item.find({}, function(err, items){
      if (err) throw err;
      var results = 'hello';
      User.find({}, function(err, results){
        if (err) throw err;
        console.log(results);
        result = results[0];
      item = items[0];
      console.log(item['done']);
      res.render('list', { title:'holy cow', user: result.local.email, stuff: item.item });
      });
    })
  });

  // "Create" action to create a new concert
  router.post('/', function(req, res) {

    var newToDoItem = new Item({
      item: req.body.item,
      points: req.body.points,
      done: false,
      userID: '56ba0cdf44a6fdf868a41e36'


    });

    newToDoItem.save(function(err, newToDoItem) {
      if (err) throw err;
      res.status(200).json(newToDoItem);
    });
  });


return router;
};
