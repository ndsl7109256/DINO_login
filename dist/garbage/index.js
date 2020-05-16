function GoToParent(name,value){
  var expires = new Date();
  expires.setTime(expires.getTime()+10*60*1000 );//10 min
  document.cookie = name + "=" + escape(value) + ";expires=" + expires.toGMTString();
  document.location.href="parent.html";
}


$(document).ready(function () {
  $('#typein button[type="submit"]').click(event => {
    event.preventDefault();

    //button animate
    //
    $.get('./login', {
      name: $('#typein input[name=name]').val(),
      password: $('#typein input[name=password]').val()
    }, data => {
      var list = JSON.parse(data);
      if (list.exist == true) {
        $('#ajax-output').html(list.text);
        $('#pic').html("<img src=\"./res/pic" + list.pic + ".png\"/>");
        document.getElementById("typein").style.visibility = "hidden";
      } else {
        alert(list.text);
        document.getElementById("name_input").value = "";
        document.getElementById("password_input").value = "";
      }
      console.log(data);
    });
  });


  $('#choose button[id="parent"]').click(event => {
    event.preventDefault();
    console.log('AAAAAAAAAAA');
    //button animate
    //
    $.get('./password.html', {
      who: 'parent'
    }, data => {
      console.log(data);
    });
  });


});
