function preview(){
    var allcode = document.getElementById("code").value;
    if(allcode == ""){
        alert("No code has been written. Can't preview!")
    }
    else{
        allcode = String(allcode).replaceAll("#","%23");
        allcode.replaceAll(" ","%20");
        allcode = allcode.replaceAll("\n","%0D%0A");
        document.getElementById("previewbox").setAttribute("src","render.html?post=preview&content="+allcode);
        //document.getElementById("previewbox").contentWindow.location.reload();
    }
}