
$(document).ready(function () {
  $('#typein button[type="submit"]').click(event => {
    event.preventDefault();

    //button animate
    //
    $.get('./login', {
      name: $('#typein input[name=name]').val(),
      password: $('#typein input[name=password]').val(),
    
    }, data => {
	  console.log(data)
      var list = JSON.parse(data);
	  console.log(list)
      if (list.exist == true) {
        $('#ajax-output').html(list.text);
        //$('#id').html("<img src=\"./res/pic" + list.pic + ".png\"/>");
        //document.getElementById("typein").style.visibility = "hidden";
		
		deleteAllCookies();
		key1 = "ID";
		value1 = $('#typein input[name=name]').val();
		key3 = "parent_pwd";
		value3 = list.pwd;
		key4 = "nickname";
		value4 = list.nickname;
		key5 = "birthday";
		value5 = list.birthday;
		console.log(value4,value5)	
		var expires = new Date();
		expires.setTime(expires.getTime()+10*60*1000 );//10 min
		document.cookie = key1 + "=" + escape(value1) +"; expires=" + expires.toGMTString();
		document.cookie = key3 + "=" + escape(value3) +"; expires=" + expires.toGMTString();
		document.cookie = key4 + "=" + escape(value4) +"; expires=" + expires.toGMTString();
		document.cookie = key5 + "=" + escape(value5) +"; expires=" + expires.toGMTString();
		console.log(document.cookie)
		document.location.href="select.html";
      } else {
        alert(list.text);
        document.getElementById("name_input").value = "";
        document.getElementById("password_input").value = "";
      }
    });
  });
});



function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

