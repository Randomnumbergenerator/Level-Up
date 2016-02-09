var express = require('express');
var router = express.Router();
var Task = require('../../app/models/task');

// "Index" action to list all tasks
router.get('/', function(req, res) {
  var listId = req.body.listId;
  Task.find({ listId: listId }, function(err, tasks) {
    if (err) {
      console.log(err);
      throw err;
    }
    res.status(200).json(tasks);
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

  var task = new Task({
    item: req.body.item,
    points: req.body.points,
    listId: req.body.listId
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
    done: req.body.done
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
