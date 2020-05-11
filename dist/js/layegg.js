// 當body被點擊時，將.dinosaur加上"dinosaur-after"
var page = 0;

var wip = "ws://"+window.location.host;
var socket = io(wip);


function move(){
    if(page==0){
      page=1;
      $('.dino').toggleClass('dino-after');

    }else if(page==1){
      page=2;
      $('.egg').show('slow');
    }else if(page==2){
      $('.egg').animate({ "bottom": "-=9vh" }, "slow" );
      var id = getCookie("ID");
      socket.emit('lay_egg', {ID:id} );
    }
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

