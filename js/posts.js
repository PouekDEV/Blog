var content;
var dir = "posts/";
var fileextension = ".pmd";
function renderposts(){
    $.ajax({
        url: dir,
        success: function (data) {
            $($(data).find("a:contains(" + fileextension + ")").get().reverse()).each(function () {
                var filename = this.href.replace(window.location.host, "").replace("https:", "").replace("//","");
                var rawFile = new XMLHttpRequest();
                rawFile.open("GET", dir+filename, false);
                rawFile.onreadystatechange = function ()
                {
                    if(rawFile.readyState === 4)
                    {
                        if(rawFile.status === 200 || rawFile.status == 0)
                        {
                            var allText = rawFile.responseText;
                            content = allText;
                            const text = content.split("\n");
                            var postlength = text.length;
                            var current = 0;
                            var istitle = false;
                            var isimage = false;
                            var istext = false;
                            var thediv = document.createElement("DIV");
                            var exclusivefile = filename;
                            exclusivefile = exclusivefile.replace("/","");
                            var divattribute = "window.location.href="+"'posts.html#"+exclusivefile+"'; window.location.reload();";
                            thediv.setAttribute("onclick",divattribute);
                            thediv.style.cssText = "background-color: #616161; height: 200px; border-radius: 5px;";
                            var thetitle = document.createElement("P");
                            thetitle.style.cssText = "font-size: 40px; text-align: left; position: absolute; left: 50px; font-weight: bold;";
                            var theimagep = document.createElement("P");
                            theimagep.style.cssText = "position: absolute; text-align: right; right: 100px;";
                            var theimage = document.createElement("IMG");
                            theimage.style.cssText = "border-radius: 5px;";
                            var thecontent = document.createElement("P");
                            thecontent.style.cssText = "font-size: 30px; text-align: left; position: absolute; left: 50px;";
                            while(current <= postlength){
                                if(String(text[current]).substring(0, 5) == "#TITL" && !istitle){
                                    thetitle.appendChild(document.createTextNode(String(text[current]).replace('#TITL', '')));
                                    istitle = true
                                }
                                else if(String(text[current]).substring(0, 5) == "#NOTL" && !istitle){
                                    istitle = true;
                                }
                                else if(String(text[current]).substring(0, 5) == "#IMAG" && !isimage){
                                    theimage.setAttribute("src",String(text[current]).replace('#IMAG', ''));
                                    //theimage.setAttribute("width","150");
                                    theimage.setAttribute("height","150");
                                    theimagep.appendChild(theimage);
                                    isimage = true;
                                }
                                else if(String(text[current]).substring(0, 5) == "#TEXT" && !istext){
                                    thecontent.appendChild(document.createTextNode(String(text[current]).replace('#TEXT', '')))
                                    istext = true;
                                }
                                current += 1;
                                if(istitle && isimage && istext){
                                    // Assemble
                                    var thebr = document.createElement("BR");
                                    var thebr2 = document.createElement("BR");
                                    var thebr3 = document.createElement("BR");
                                    var thebr4 = document.createElement("BR");
                                    thediv.appendChild(thebr);
                                    thediv.appendChild(theimagep);
                                    thediv.appendChild(thetitle);
                                    thediv.appendChild(thebr2);
                                    thediv.appendChild(thebr3);
                                    thediv.appendChild(thebr4);
                                    thediv.appendChild(thecontent);
                                    document.getElementById("posts-box").appendChild(thediv);
                                    document.getElementById("posts-box").appendChild(thebr);
                                    break;
                                }
                                else if(current >= postlength){
                                    var thebr = document.createElement("BR");
                                    var thebr2 = document.createElement("BR");
                                    var thebr3 = document.createElement("BR");
                                    var thebr4 = document.createElement("BR");
                                    thediv.appendChild(thebr);
                                    thediv.appendChild(theimagep);
                                    thediv.appendChild(thetitle);
                                    thediv.appendChild(thebr2);
                                    thediv.appendChild(thebr3);
                                    thediv.appendChild(thebr4);
                                    thediv.appendChild(thecontent);
                                    document.getElementById("posts-box").appendChild(thediv);
                                    document.getElementById("posts-box").appendChild(thebr);
                                    break;
                                }
                            }
                        }
                    }
                }
                rawFile.send(null);
            });
        }
    });
}
function check(){
    if(window.location.href.includes("#")){
        var path = window.location.hash;
        path = path.replace("#","");
        var heightofrender = $(document).height();
        heightofrender = heightofrender - $("#upb").height() - 50;
        var renderer = document.createElement("IFRAME");
        renderer.setAttribute("src","render.html#"+path);
        renderer.setAttribute("frameborder","0");
        renderer.setAttribute("width",$("#upb").width()-50);
        renderer.setAttribute("height",heightofrender);
        document.getElementById("posts-box").appendChild(renderer);
    }
    else{
        renderposts();
    }
}
check();