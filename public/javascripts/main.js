$(function() {
  console.log("DOM loaded, son.");

  var listApi = '/api/lists';
  var taskApi = '/api/tasks';

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

});
