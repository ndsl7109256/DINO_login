var page = 0;

var wip = "wss://"+window.location.host;
var socket = io(wip);
$(function(){

    
})

function next(){
    if(page == 0){
        $('#text').html("下一頁");
    	page = 1;
	}else if(page==1){
        $('#text').html("I wanna know");
		page = 2;
	}else if(page==2){
        $('#text').html("你行不行");
        page = 3;
        var id = getCookie('ID');
        console.log("emit")
        socket.emit('end_story', {ID:id} );
	}
}	

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}



