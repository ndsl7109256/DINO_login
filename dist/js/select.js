
function GoToParent(){
    key2 = "who";
    value2 = "parent";

    var expires = new Date();
    expires.setTime(expires.getTime()+10*60*1000 );//10 min
    document.cookie = key2 + "=" + escape(value2) +"; expires=" + expires.toGMTString();
    document.location.href="parent.html";
}

function GoToChild(){
    key2 = "who";
    value2 = "child";

    var expires = new Date();
    expires.setTime(expires.getTime()+10*60*1000 );//10 min
    document.cookie = key2 + "=" + escape(value2) +"; expires=" + expires.toGMTString();
    document.location.href="child.html";
}
