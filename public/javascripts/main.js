$(function() {
  console.log("DOM loaded, son.");

  var listApi = '/api/lists';
  var taskApi = '/api/tasks';

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
      console.log(tasks);
    })
    .fail(function(jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    });
  }

  function loadLists() {
    $.ajax({
      url: "/user_data",
      method: "GET",
      data: {},
      dataType: "JSON"
    })
    .done(function(user) {
      $.ajax({
        url: listApi,
        method: "GET",
        data: {
          _id: user._id
        },
        dataType: "JSON"
      })
      .done(function(data) {
        for (var i = 0; i < data.length; i++) {
          var list = data[i];
          // $('#lists').append('<div class="list" data-list-id="' + list._id + '">' + list.name + '</div>');
          $('#lists').append('<div class="col-sm-12" id="' + list._id +
           '">' + '<div class="well list">' + '<h3><span class="fa fa-user"></span> ' +
           list.name + ' </h3>' + '</div>' + '</div>');
          $('.list').click(function() {
            console.log("clicked");
            var listId = $(this).parent().attr('id');
            loadTasks(listId);
          });
        };
      })
      .fail(function(jqXHR, textStatus) {
        console.log('Request failed: ' + textStatus);
      });
    })
    .fail(function(jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    });
  }

  function createList() {
    $.ajax({
        url: listApi,
        method: 'POST',
        data: {
          name: 'Test List',
          userId: '56ba23d4ba27440c0f17f251'
        },
        dataType: 'JSON'
      })
      .done(function(list) {
        console.log(list);
      })
      .fail(function(jqXHR, textStatus) {
        console.log('Request failed: ' + textStatus);
      })
  }

  $('#testbutton').click(function() {
    createList();
  });


  loadLists();
});
