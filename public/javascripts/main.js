$(function() {
  var taskTemplateScript = $("#task-template").html();

  var taskTemplate = Handlebars.compile(taskTemplateScript);
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
      var context = { tasks: tasks };
      var theCompiledHtml = taskTemplate(context);
      $('#accordian_'+listId).prepend(theCompiledHtml);
    })
    .fail(function(jqXHR, textStatus) {
      console.log("Request failed: " + textStatus);
    });
  }

  // function loadLists() {
  //   $.ajax({
  //     url: "/user_data",
  //     method: "GET",
  //     data: {},
  //     dataType: "JSON"
  //   })
  //   .done(function(user) {
  //     // gets every todo list that the user has made
  //     $.ajax({
  //       url: listApi,
  //       method: "GET",
  //       data: {
  //         _id: user._id
  //       },
  //       dataType: "JSON"
  //     })
  //     .done(function(data) {
  //       for (var i = 0; i < data.length; i++) {
  //         var list = data[i];
  //         $('#lists').append('<div class="list" data-list-id="' + list._id + '">' + list.name + '</div>');
  //         $('.list').click(function() {
  //           var listId = $(this).data('list-id');
  //           loadTasks(listId);
  //         });
  //       };
  //     })

  //     // gets every todo list that the user has been taged in
  //     $.ajax({
  //       url: listApi + '/lists',
  //       method: "GET",
  //       data: {
  //        otherUser: user._id
  //       },
  //       dataType: "JSON"
  //     })
  //     .done(function(communityList) {
  //        for (var i = 0; i < communityList.length; i++) {
  //         var list = communityList[i];
  //         $('#lists').append('<div class="list" data-list-id="' + list._id + '">' + list.name + '</div>');
  //         $('.list').click(function() {
  //           var listId = $(this).data('list-id');
  //           loadTasks(listId);
  //         });
  //       };

  //     })

  //     .fail(function(jqXHR, textStatus) {
  //       console.log('Request failed: ' + textStatus);
  //     });
  //   })
  //   .fail(function(jqXHR, textStatus) {
  //     console.log("Request failed: " + textStatus);
  //   });
  // }


  function createList() {
    $.ajax({
        url: listApi,
        method: 'POST',
        data: {
          name: 'I am beautiful',
          userId: '56ba23d4ba27440c0f17f251',
          otherUser: '56ba0cdf44a6fdf868a41e36'
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

  $('#test').click(function() {
    createList();
  });

  // $('.list').click(function() {
  //   console.log("clicked");
  //   var listId = $(this).data('list');
  //   loadTasks(listId);
  // });

  $('.tasks-list').on('show.bs.collapse', function() {
    var listId = $(this).parent().attr('id');
    loadTasks(listId);
  });

  $('form').submit(function() {
    var item = $(this).children("input[name=task]").val();
    var id = $(this).children("input[name=listId]").val();
    var points = $(this).children("select[name=points]").val();

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

    return false;
  })

  // loadLists();
});
