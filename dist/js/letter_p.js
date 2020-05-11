var wip = "wss://" + window.location.host;
var socket = io(wip);


$(document).ready(function () {
    socket.emit('give_me_letter', {ID: getCookie('ID')});
});


//接未讀信件
socket.on('give_you_letter', function(data){
    alert(data.Letters);
    console.log(data.Letters);
})

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
