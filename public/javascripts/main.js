$(function() {

  var listApi = '/api/lists/';
  var taskApi = '/api/tasks/';
  var quoteApi = 'http://www.stands4.com/services/v2/quotes.php'

  $.ajax({
    method: "GET",
    url: quoteApi,
    data: {
      uid: '4840',
      tokenid: 'vdd0Lpy8OmyazMor',
      searchtype: 'random',
      query: 'motivation'

    },
    dataType: 'html'
  })
  .done(function(data){
    console.log(data);
    // var oneQuote = Math.floor(Math.random()* (data.length -1)) +1;
    $('#quote').html(data);
  })
  .fail(function(jqXHR, textStatus) {
        console.log("Request failed: " + textStatus);
  });

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
        }, 'html');
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

  // @todo delete a list
  function deleteListener() {
    $('.deleteBtn').click(function() {
      var listId = $(hhis).data('list-id');
      console.log(listId);
      deleteList(listId);
      return false;
    })
<<<<<<< HEAD
  };
=======

  };



>>>>>>> a569319a260552c6fcc85285d2ebb6f70662722b

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
          deleteListener();
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
        method: 'delete',
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


<<<<<<< HEAD
=======


>>>>>>> a569319a260552c6fcc85285d2ebb6f70662722b
  $('.tasks-list').on('show.bs.collapse', function() {
    var listId = $(this).parent().attr('id');
    console.log(listId);
    loadTasks(listId);
  });
<<<<<<< HEAD

  $('.newTask').submit(function() {
=======


  $('.newTask').submit(function() {

>>>>>>> a569319a260552c6fcc85285d2ebb6f70662722b
    var item = $(this).children("input[name=task]").val();
    var id = $(this).children("input[name=listId]").val();
    var points = $(this).children("select[name=points]").val();
    newTask(item, points, id);
    return false;
  });

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

  // loadLists();
  deleteListener();
});
