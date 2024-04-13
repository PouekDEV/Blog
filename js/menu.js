function search(){
    var text = document.getElementById("search").value;
    if(text != ""){
        window.location = window.location + "?search=" + text;
    }
}