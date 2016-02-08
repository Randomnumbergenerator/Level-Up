var express = require('express');
var router = express.Router();
var User = require('../app/models/user');

/* GET home page. */
router.get('/fun', function(req, res, next) {
  console.log('hello');
  User.find({}, function(err, results){
    if (err) throw err;
    console.log(results[2].userLists[0].list);
  });
  res.render('list', { title: 'TODO GAME' });
});

// "Create" action to create a new concert
// router.post('/', function(req, res) {

//   var newToDoItem = new item({
//     : req.body.,
//     : req.body.,

//   });

//   concert.save(function(err, item) {
//     if (err) throw err;
//     res.status(200).
//   });
// });





module.exports = router;
