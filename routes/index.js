var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('hello');
  Users.find({}, function(err, results){
    if (err) throw err;
    console.log(results);
  });
  res.render('index', { title: 'TODO GAME' });
});














module.exports = router;
