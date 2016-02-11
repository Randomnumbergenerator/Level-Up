$(function() {

  var listApi = '/api/lists/';
  var taskApi = '/api/tasks/';

  function loadTasks(listId) {
    $.ajax({
        url: taskApi,
        method: "GET",
        data: {
          listId: listId
        },
        dataType: "JSON"
      })
      .done(function(tasks) {
        if (tasks !== []) { 
          var releventTasks = [];
          for (var i = tasks.length - 1; i >= 0; i--) {
            if (tasks[i].listId == listId) {
              releventTasks.push(tasks[i]);
            };
          };

          var context = {
            tasks: releventTasks
          };
          $.get('templates/task.handlebars', function(data) {
            var template = Handlebars.compile(data);
            $('#accordion_' + listId).empty().append(template(context));
            taskListeners();
          }, 'html');
        };
      })
      .fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
      });
  }

  // to create a new list
  // on click of submit for new to-do list call the creatList function

  $('#newList').submit(function() {
    var name = $('#listName').val();
    var id = userJson._id;
    createList(name, id);
    return false;
  })

  function listListeners() {
    $('.deleteBtn').click(function() {
      var listId = $(this).data('list-id');
      console.log(listId);
      deleteList(listId);
      return false;
    });

    $('.newTask').submit(function() {
      var item = $(this).children("input[name=task]").val();
      console.log(item);
      var id = $(this).children("input[name=listId]").val();
      var points = $(this).children("select[name=points]").val();
      newTask(item, points, id);
      return false;
    });

    $('.tasks-list').on('show.bs.collapse', function() {
      var listId = $(this).parent().attr('id');
      loadTasks(listId);
    });
  };

  function taskListeners() {
    $('.delete').submit(function() {
      var taskId = $(this).data('task-id');
      console.log(taskId);
      deleteTask(taskId);
      return false;
    });

    $(".task-check").bind('change', function(){
      var taskId = $(this).data('task-id');
      console.log(taskId);
      if (this.checked){
        $.ajax({
          url: taskApi + taskId,
          type: 'PUT',
          data: {"done": true}
        })
        .done(function(task) {
          console.log(task);
        })
        .fail(function(jqXHR, textStatus) {
          console.log("Request failed: " + textStatus);
        });
      }
      else {
        $.ajax({
          url: taskApi + taskId,
          type: 'PUT',
          data: {"done": false}
        })
        .done(function(task) {
          console.log(task);
        })
        .fail(function(jqXHR, textStatus) {
          console.log("Request failed: " + textStatus);
        });
      }
    });
  }

  function newTask(item, points, id){
    $.ajax({
      url: taskApi,
      method: "POST",
      data: {
        item: item,
        points: points,
        listId: id
      },
      dataType: "JSON"
    })
    .done(function(task) {
      console.log(task);
    })
    .fail(function(jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    });
  }

  function createList(newListName, userId) {
    var name = newListName;
    var id = userId;
    $.ajax({
        url: listApi,
        method: 'POST',
        data: {
          name: name,
          userId: id
        },
        dataType: 'JSON'
      })
      .done(function(list) {
        var newList = [list];
        var context = {
          lists: newList
        };
        $.get('templates/list.handlebars', function(data) {
          var template = Handlebars.compile(data);
          $('#lists').prepend(template(context));
          listListeners();
        }, 'html');
      })
      .fail(function(jqXHR, textStatus) {
        console.log('Request failed: ' + textStatus);
      })
  }

  function deleteList(listId) {
    var listId = listId;
    $.ajax({
        url: listApi + listId,
        method: 'DELETE',
        data: {},
        dataType: 'JSON'
      })
      .done(function(list) {
        $($("div").find("[data-list='" + listId + "']")).remove();
      })
      .fail(function(jqXHR, textStatus) {
        console.log('Request failed: ' + textStatus);
      })
  }

  function deleteTask(taskId) {
    var taskId = taskId;
    $.ajax({
        url: taskApi + taskId,
        method: 'DELETE',
        data: {},
        dataType: 'JSON'
      })
      .done(function(list) {
        $("#" + taskId).remove();
      })
      .fail(function(jqXHR, textStatus) {
        console.log('Request failed: ' + textStatus);
      })
  }

  listListeners();
});
