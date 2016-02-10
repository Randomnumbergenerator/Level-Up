var express = require('express');
var router = express.Router();
var List = require('../../app/models/list');

router.get('/', function(req, res, next) {
  var userId = req.query._id;
  List.find({
    'userId': userId
  }, function(err, lists) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).json(lists);
  });
});

// "Show" action to show one list
router.get('/:id', function(req, res) {

  List.findOne({
    _id: req.params.id
  }, function(err, list) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).json(list);
  });

});

// "Create" action to create a new list
router.post('/', function(req, res) {

  var list = new List({
    name: req.body.name,
    userId: req.body.userId
  });

  list.save(function(err, list) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).json(list);
  });
});

// Action to update a new list
router.put('/:id', function(req, res) {

  List.findByIdAndUpdate(req.params.id, {
    name: req.body.name
  }, function(err, list) {
    if (err) {
      console.log(err);
      throw err;
    }

    res.status(200).json(list);
  });

});

// action to delete list
router.delete('/:id', function(req, res) {

  List.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).json({});
  });

});

module.exports = router;
