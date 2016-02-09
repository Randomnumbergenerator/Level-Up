var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Item = require('../app/models/doitem');
/* GET home page. */
router.get('/fun', function(req, res, next) {
  console.log('hello');
  var results = 'hello';
  Item.find({_id: '56b9427aff7da21664169a38'}, function(err, items){
    if (err) throw err;
    var results = 'hello';
    User.find({}, function(err, results){
      if (err) throw err;
      console.log(results);
      result = results[0];
    item = items[0];
    console.log(item['done']);
    res.render('list', { title:'holy cow', stuff: item.item, user: result.local.email });
    });
  })
});

// "Create" action to create a new concert
router.post('/fun', function(req, res) {

  var newToDoItem = new Item({
    item: req.body.item,
    points: req.body.points,
    done: false,
    userID: '56b9427aff7da21664169a38'


  });

  newToDoItem.save(function(err, newToDoItem) {
    if (err) throw err;
    res.status(200).json(newToDoItem);
  });
});





module.exports = router;
