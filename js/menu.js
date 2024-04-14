function search(){
    var text = document.getElementById("search").value;
    if(text != ""){
        var here = new URL(window.location.href);
        here.searchParams.append("search", text);
        window.location.href = here;
    }
}