var express = require('express');
var router = express.Router();
var User = require('../app/models/user');
var Item = require('../app/models/doItem');


var userID;
/* GET home page. */
router.get('/fun', function(req, res, next) {
  var req = req;
  var results = 'hello';
  Item.find({}, function(err, items){
    if (err) throw err;
    var results = 'hello';
    User.find({}, function(err, results){

      if (err) throw err;
      // console.log(results);
      result = results[0];
    item = items[0];
    // userID = req.user;
    // console.log(userID);
    // console.log(item['done']);
    res.render('list', { title:'holy cow', user : 'bob', stuff: item.item });
    });
  })
});



// "Create" action to create a new concert
router.post('/fun', function(req, res) {

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

// single list view
router.get('/:id', function(req,res,next) {
 var id = req.params.id;
 Item.find({ userID: id }, function(err, items) {
   res.status(200).json({ items: items });
 });
});





module.exports = router;
