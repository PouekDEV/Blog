var arefilterson = false;
function aboutcurrent(){
    vex.dialog.alert('You are currently on this page');
}
function postscurrent(){
    //vex.dialog.alert('You are currently on this page');
    window.location.href = "posts.html";
}
function togglefilters(){
    if(arefilterson){
        arefilterson = false;
        document.getElementById("filters").style.display = "none";
    }
    else{
        arefilterson = true;
        document.getElementById("filters").style.display = "block";
    }
}
document.getElementById("filters").style.display = "none";