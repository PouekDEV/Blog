var arefilterson = false;
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