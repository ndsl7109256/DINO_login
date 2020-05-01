const PORT = "5321";


$(document).ready(function (){
  
  console.log(document.cookie);
  $('#text').html("Hi! " + getCookie('who') + getCookie('ID'));
});


$(function(){
  $('#parent_login').click(function(){
	var pwd = $.trim($('#parent_pwd').val() );
		console.log(getCookie('parent_pwd'));
	if (pwd == getCookie('parent_pwd'))
	{
		alert('right password');
		document.location.href='story.html';
	}else
	{
		alert('wrong parent\'s passwaord');
	}
  });




})

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}
