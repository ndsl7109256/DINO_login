var wip = "wss://" + window.location.host;
var socket = io(wip);


$(document).ready(function () {
    socket.emit('give_me_letter', {ID: getCookie('ID')});
});


//接未讀信件
socket.on('give_you_letter', function(data){
    //alert(data.Letters);
    console.log(data.Letters);
    var str = "";
    for(var i=0; i<data.Letters.length; i++)
    {
        console.log('letter');
        str+="<tr>";
        str+="<td>";
        str+=data.Letters[i].date;
        str+="</td>";
        str+="<td>";
        str+=data.Letters[i].content;
        str+="</td>";
        str+="<td>";
        str+="<button class=\"btn btn--stripe\" value=";
        str+=data.Letters[i].letter_id;
        str+=" onclick=\"good_letter(this.value)\"";
        str+=">棒</button>";
        str+="</td>";
        str+="<td>";
        str+="<button class=\"btn btn--stripe\" value=";
        str+=data.Letters[i].letter_id;
        str+=" onclick=\"bad_letter(this.value)\"";
        str+=">爛</button>";
        str+="</td>";
        str+="</tr>";
        
    }
    document.getElementById("mailbox").innerHTML = str;
    str="";
})

function good_letter(letter_id){
    socket.emit('score_letter',{ID: getCookie('ID'), letter_id: letter_id, score: 10});
    socket.emit('give_me_letter', {ID: getCookie('ID')});
}
function bad_letter(letter_id){
    socket.emit('score_letter',{ID: getCookie('ID'), letter_id: letter_id, score: 0});
    socket.emit('give_me_letter', {ID: getCookie('ID')});
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
