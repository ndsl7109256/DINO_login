
$(document).ready(function () {
  $('#typein button[type="submit"]').click(event => {
    event.preventDefault();

    //button animate
    //
    $.get('./register', {
      id: $('#typein input[name=id]').val(),
      password: $('#typein input[name=password]').val(),
      parent_password: $('#typein input[name=parent_password]').val(),
      birthday: $('#typein input[name=birthday]').val(),
      nickname: $('#typein input[name=nickname]').val()

    }, data => {
      var list = JSON.parse(data);
      
      if (list.exist == true) {
        $('#ajax-output').html(list.text);
        alert('this id is used');
        //$('#pic').html("<img src=\"./res/pic" + list.pic + ".png\"/>");
        //document.getElementById("typein").style.visibility = "hidden";
      } else {
        //alert(list.text);
        //document.getElementById("name_input").value = "";
        //document.getElementById("password_input").value = "";
      }
      console.log(data);
    });
  });
});
