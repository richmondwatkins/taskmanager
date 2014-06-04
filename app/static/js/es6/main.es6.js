/* jshint unused: false */
(function(){
  'use strict';

  $(document).ready(init);

  function init(){

    $('#create-task').click(addTask);
  }


  function addTask(e){
    var user = $('#userId').data();
    var userId = user.id;
    console.log(userId);
    var data = $(this).closest('form').serialize();  //the 'this' is the button, so you're going up from there
    ajax(`/taskmanager/${userId}/createtask`, 'post', data, html=>{
      $('#task-table').append(html);
    });
    e.preventDefault();
  }

function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
  $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
}

})();
