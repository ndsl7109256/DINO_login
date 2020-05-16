var wip = "wss://" + window.location.host;
var socket = io(wip);

$(document).ready(function () {
    $('#letter').html("謝謝" + getCookie('nickname') + "\n因為...\n這讓我覺得...");
});

function letter(){
    $('.write_letter').fadeIn(400);
}

function write_letter(){
    alert('寫一封感謝信給' + getCookie('nickname') + '吧！');
    window.location.href='letter_k.html';
}

function send_letter(){
    var letter = $('#letter').val();
    alert(letter);
    var id = getCookie('ID');
    socket.emit('send_letter', {ID: id, Letter: letter});
}



function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
