var wip = "wss://" + window.location.host;
var socket = io(wip);

$(document).ready(function () {
    //init 設定沒有信件
    document.getElementById("letter_icon").style.visibility = "hidden";
    //check database 有信的話就show icon
    socket.emit('check_letter', {ID: getCookie('ID')});
    console.log("check letter");
});

function read_letter(){
    alert('read');
    //socket.emit('give_me_letter', {ID: getCookie('ID')});
    window.location.href="letter_p.html";
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}


//如果有未讀信件則出現icon
socket.on('letter_unread', function(data){
    if (data.ID == getCookie('ID'))
    {
        //alert("letter!");
        document.getElementById("letter_icon").style.visibility = "visible";
    }
})

