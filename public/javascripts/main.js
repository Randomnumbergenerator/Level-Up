$(function() {
  console.log("DOM loaded, son.");

  var listApi = '/api/lists';
  var taskApi = '/api/tasks';

  function loadLists() {
    $.ajax({
      url: "/user_data",
      method: "GET",
      data: {},
      dataType: "JSON"
    })
    .done(function(user) {
      console.log(user);
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
          console.log(data[i]);
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
