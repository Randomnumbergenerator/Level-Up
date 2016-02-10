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
  //     $.ajax({
  //       url: listApi,
  //       method: "GET",
  //       data: {
  //         _id: user._id
  //       },
  //       dataType: "JSON"
  //     })
  //     .done(function(data) {
  //       // Define our data object
  //       var context={
  //         lists: data
  //       };

  //       // Pass our data to the template
  //       var theCompiledHtml = listTemplate(context);

  //       // Add the compiled html to the page
  //       $('#lists').append(theCompiledHtml);
        
  //       $('.list').click(function() {
  //         console.log("clicked");
  //         var listId = $(this).parent().attr('id');
  //         loadTasks(listId);
  //       });
        
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
