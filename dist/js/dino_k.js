var wip = "wss://" + window.location.host;
var socket = io(wip);

$(document).ready(function () {
    $('#letter').html("\n  謝謝" + getCookie('nickname') + "\n\n  因為...\n\n  這讓我覺得...");
});

function go_to_letter(){
    $('.write_letter').fadeIn(800);
    $('.info').fadeOut(400);
    $('#cover').css('display','none'); //關閉遮罩層

    //屁頭上升
    $('#ass_dinasour').animate({top:"-=23vh" },800);
}

function letter_info(){
    $('#cover').css('display','block'); //顯示遮罩層
    $('.info').fadeIn(400);
    $('.info').css('z-index', 5);
    $('#right_leaf').animate({left:"+=200vw" },1500);
    $('#training_logo').animate({left:"+=200vw" },1500);
    $('#training_text').animate({left:"+=200vw" },1500);
    $('#left_leaf').animate({left:"-=200vw" },1500);
    $('#mission_logo').animate({left:"-=200vw" },1500);
    $('#mission_text').animate({left:"-=200vw" },1500);
    //$('.write_letter').fadeIn(400);
}

function write_letter(){
    alert('寫一封感謝信給' + getCookie('nickname') + '吧！');
    window.location.href='letter_k.html';
}

function letter_back(){
    $('.write_letter').fadeOut(800);
    $('#right_leaf').animate({left:"-=200vw" },1500);
    $('#training_logo').animate({left:"-=200vw" },1500);
    $('#training_text').animate({left:"-=200vw" },1500);
    $('#left_leaf').animate({left:"+=200vw" },1500);
    $('#mission_logo').animate({left:"+=200vw" },1500);
    $('#mission_text').animate({left:"+=200vw" },1500);
    $('#ass_dinasour').animate({top:"+=23vh" },800);
}

function send_letter(){
    //寄信
    //var letter = $('#letter').val();
    //var id = getCookie('ID');
    //socket.emit('send_letter', {ID: id, Letter: letter});

    // 動畫
    //$('#letter_bg').animate({height:"-=20vh"}, 1200);
    $('.write_letter').css('display','none');
    $('#letter_bg_rec').css('display','block');
    $('#letter_bg_rec').animate({top:"+=22vh", left:"+=15vw", height:"-=43vh", width:"-=30vw"}, 800);
    $('#ass_dinasour').animate({top:"+=23vh" },800);
    $('#sent').fadeIn(1200);
    $('#right_leaf').animate({left:"-=200vw" },1500);
    $('#training_logo').animate({left:"-=200vw" },1500);
    $('#training_text').animate({left:"-=200vw" },1500);
    $('#left_leaf').animate({left:"+=200vw" },1500);
    $('#mission_logo').animate({left:"+=200vw" },1500);
    $('#mission_text').animate({left:"+=200vw" },1500);
    $('#sent').fadeOut(2000);
    $('#letter_bg_rec').fadeOut(2000);

    //圖片大小復原
    $('#letter_bg_rec').animate({top:"-=22vh", left:"-=15vw", height:"+=43vh", width:"+=30vw"}, 10);
}



function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
