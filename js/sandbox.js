function preview(){
    var allcode = document.getElementById("code").value;
    if(allcode == ""){
        alert("No code has been written. Can't preview!")
    }
    else{
        allcode = String(allcode).replaceAll("#","%23");
        allcode.replaceAll(" ","%20");
        allcode = allcode.replaceAll("\n","%0D%0A");
        document.getElementById("previewbox").setAttribute("src","index.php?post=preview&content="+allcode);
    }
}
function save(){
    var allcode = document.getElementById("code").value;
    if(allcode != ""){
        allcode = String(allcode).replaceAll("#","%23");
        allcode.replaceAll(" ","%20");
        allcode = allcode.replaceAll("\n","%0D%0A");
        var hiddenElement = document.createElement('a');
        hiddenElement.href = "data:attachment/text," + allcode;
        hiddenElement.target = '_blank';
        hiddenElement.download = 'n-post.pmd';
        hiddenElement.click();
    }
}