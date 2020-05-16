

var wip = "ws://"+window.location.host;

var socket = io(wip);


$(document).ready(function (){
  });

socket.on('get_egg', function(data){
    if (data.ID == getCookie('ID'))
    {
				$('.getegg').animate({ "bottom": "-=9vh" }, "slow" );
    }
})
  function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
