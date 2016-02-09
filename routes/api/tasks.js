var express = require('express');
var router = express.Router();
var Task = require('../../models/task');

// "Index" action to list all tasks
router.get('/', function(req, res) {

  Task.find({}, function(err, results) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).json(results);
  });

});

// "Show" action to show one task
router.get('/:id', function(req, res) {

  Task.findOne({
    _id: req.params.id
  }, function(err, task) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).json(task);
  });

});

// "Create" action to create a new task
router.post('/', function(req, res) {
  // @todo change from use to list ref
  var user = req.user;

  var newToDoItem = new Item({
    item: req.body.item,
    points: req.body.points,
    done: false,
    userID: user._id

  });


  task.save(function(err, task) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).json(task);
  });
});

// Action to update a new task
router.put('/:id', function(req, res) {

  Task.findByIdAndUpdate(req.params.id, {
    done: req.body.done,
    item: req.body.item
  }, function(err, task) {
    if (err) {
      console.log(err);
      throw err;
    }

    res.status(200).json(task);
  });

});

// action to delete task
router.delete('/:id', function(req, res) {

  Task.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).json({});
  });

});

module.exports = router;
