var content;
var viewportHeight = window.innerHeight;
var viewportWidth = window.innerWidth;
var specialcontent;
var dir = "posts/";
var fileextension = ".pmd";
var isloading = true;
var tags = "";
function renderposts(){
    if(viewportWidth < 520){
        document.getElementById("posts-box").appendChild(document.createElement("BR"));
        document.getElementById("posts-box").appendChild(document.createElement("BR"));
        document.getElementById("posts-box").appendChild(document.createElement("BR"));
    }
    $.ajax({
        url: dir,
        success: function (data) {
            var $_GET = {};
            if(document.location.toString().indexOf('?') !== -1) {
                var query = document.location.toString().replace(/^.*?\?/, '').replace(/#.*$/, '').split('&');
                for(var i=0, l=query.length; i<l; i++) {
                   var aux = decodeURIComponent(query[i]).split('=');
                   $_GET[aux[0]] = aux[1];
                }
            }
            $($(data).find("a:contains(" + fileextension + ")").get().reverse()).each(function (){
                var filename = this.href.replace(window.location.host, "").replace("http:", "").replace("//","");//dont't forget the s
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
                            var isdate = false;
                            var thediv = document.createElement("DIV");
                            var exclusivefile = filename;
                            exclusivefile = exclusivefile.replace("/","");
                            var divattribute = "window.location.href="+"'?post="+exclusivefile+"';";
                            thediv.setAttribute("onclick",divattribute);
                            thediv.setAttribute("class","pc");
                            var thetitle = document.createElement("P");
                            var theimagep = document.createElement("P");
                            var theimage = document.createElement("IMG");
                            theimage.style.cssText = "border-radius: 5px;";
                            var thecontent = document.createElement("P");
                            var thedate = document.createElement("P");
                            // Phone
                            if(viewportWidth < 520){
                                $(".wrap").css("max-width", viewportWidth);
                                $(".wrap").css("white-space", "normal");
                                //$(".wrap").css("max-height", viewportHeight);
                                thediv.style.cssText = "border-radius: 5px;";
                                thecontent.setAttribute("style","font-size: 30px;white-space:normal; max-width:"+(viewportWidth)+"px;");
                                thetitle.setAttribute("style","font-size: 40px;font-weight: bold; white-space:normal;max-width:"+(viewportWidth)+"px;");
                                thedate.style.cssText = "font-size: 20px;";
                            }
                            // Computer
                            else{
                                $(".wrap").css("max-width", viewportWidth-520);
                                $(".wrapnoimage").css("max-width", viewportWidth-120);
                                thediv.style.cssText = "height: 200px; border-radius: 5px;";
                                theimagep.style.cssText = "position: absolute;right: 100px;";
                                // For some reason this works
                                thecontent.setAttribute("style","font-size: 30px; position: absolute; left: 50px; max-width:"+(viewportWidth-520)+"px;");
                                thetitle.setAttribute("style","font-size: 40px; position: absolute; left: 50px; font-weight: bold; max-width:"+(viewportWidth-520)+"px;");
                                // But this doesn't work
                                //thecontent.style.cssText = "font-size: 30px; position: absolute; left: 50px;";
                                //thetitle.style.cssText = "font-size: 40px; position: absolute; left: 50px; font-weight: bold;";
                                thedate.style.cssText = "font-size: 20px; position: absolute; left:50px;";
                            }
                            var isnottherightag = false;
                            while(current <= postlength+1){
                                switch(String(text[current]).substring(0, 5)){
                                    case "#TITL":
                                        if(!istitle){
                                            thetitle.appendChild(document.createTextNode(String(text[current]).replace('#TITL', '')));
                                            istitle = true
                                        }
                                        break;
                                    case "#NOTL":
                                        if(!istitle){
                                            istitle = true;
                                        }
                                        break;
                                    case "#IMAG":
                                        if(!isimage){
                                            theimage.setAttribute("src",String(text[current]).replace('#IMAG', ''));
                                            theimage.setAttribute("height","150");
                                            thecontent.setAttribute("class","wrap");
                                            thetitle.setAttribute("class","wrap");
                                            theimagep.appendChild(theimage);
                                            isimage = true;
                                        }
                                        break;
                                    case "#TEXT":
                                        if(!istext){
                                            thecontent.appendChild(document.createTextNode(String(text[current]).replace('#TEXT', '')))
                                            istext = true;
                                        }
                                        break;
                                    case "#TAGS":
                                        if(window.location.href.includes("?tag")){
                                            let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) != index)
                                            var thisposttags = "";
                                            thisposttags += $_GET['tag']
                                            thisposttags += String(text[current]).replace('#TAGS', ' ');
                                            var listofthisposttags = thisposttags.trim().split(/\s+/);
                                            var isthetagok = String(findDuplicates(listofthisposttags)[0])
                                            if(isthetagok != $_GET['tag']){
                                                isnottherightag = true;
                                            }
                                        }
                                        tags += String(text[current]).replace('#TAGS', ' ')
                                        break;
                                    case "#DATE":
                                        thedate.appendChild(document.createTextNode(String(text[current]).replace('#DATE', '')))
                                        isdate = true;
                                        break;
                                }
                                current += 1;
                                if(isnottherightag){
                                    break;
                                }
                                if(String(text[current]).substring(0, 5) == "#NRDY"){
                                    break;
                                }
                                else if(istitle && isimage && istext && isdate){
                                    // Assemble
                                    if(viewportWidth > 520){
                                        thediv.appendChild(theimagep);
                                    }
                                    thediv.appendChild(thetitle);
                                    if(viewportWidth > 520){
                                        thediv.appendChild(document.createElement("BR"));
                                        thediv.appendChild(document.createElement("BR"));
                                        thediv.appendChild(document.createElement("BR"));
                                    }
                                    thediv.appendChild(thecontent);
                                    if(viewportWidth > 520){
                                        thediv.appendChild(document.createElement("BR"));
                                        thediv.appendChild(document.createElement("BR"));
                                        thediv.appendChild(document.createElement("BR"));
                                        thediv.appendChild(document.createElement("BR"));
                                        thediv.appendChild(document.createElement("BR"));
                                    }
                                    thediv.appendChild(thedate);
                                    document.getElementById("posts-box").appendChild(thediv);
                                    document.getElementById("posts-box").appendChild(document.createElement("BR"));
                                    if(isloading){
                                        isloading = false;
                                        document.getElementById("filesinfo").style.display = "none";
                                    }
                                    break;
                                }
                                else if(current >= postlength){
                                    thetitle.setAttribute("class","wrapnoimage");
                                    thecontent.setAttribute("class","wrapnoimage");
                                    if(viewportWidth > 520){
                                        thediv.appendChild(theimagep);
                                    }
                                    thediv.appendChild(thetitle);
                                    if(viewportWidth > 520){
                                        thediv.appendChild(document.createElement("BR"));
                                        thediv.appendChild(document.createElement("BR"));
                                        thediv.appendChild(document.createElement("BR"));
                                    }
                                    thediv.appendChild(thecontent);
                                    if(viewportWidth > 520){
                                        thediv.appendChild(document.createElement("BR"));
                                        thediv.appendChild(document.createElement("BR"));
                                        thediv.appendChild(document.createElement("BR"));
                                        thediv.appendChild(document.createElement("BR"));
                                        thediv.appendChild(document.createElement("BR"));
                                    }
                                    thediv.appendChild(thedate);
                                    document.getElementById("posts-box").appendChild(thediv);
                                    document.getElementById("posts-box").appendChild(document.createElement("BR"));
                                    if(isloading){
                                        isloading = false;
                                        document.getElementById("filesinfo").style.display = "none";
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
                rawFile.send(null);
                if(viewportWidth < 520){
                    document.getElementById("posts-box").appendChild(document.createElement("HR"));
                }
            });
            if(viewportWidth > 520){
                document.getElementById("posts-box").appendChild(document.createElement("HR"));
            }
            processtags();
        }
    });
}
function processtags(){
    var tagslist = tags.trim().split(/\s+/);
    tagslist = new Set(tagslist)
    tagslist = Array.from(tagslist)
    var tagslistlength = tagslist.length;
    var current = 0;
    while(current != tagslistlength){
        var newtagfilter = document.createElement("A");
        newtagfilter.setAttribute("href","?tag="+tagslist[current]);
        newtagfilter.appendChild(document.createTextNode("| " + tagslist[current] + "\n"));
        document.getElementById("filters").appendChild(newtagfilter);
        current += 1;
    }
    document.getElementById("filters").appendChild(document.createElement("BR"));
    document.getElementById("filters").appendChild(document.createElement("BR"));
    document.getElementById("filters").appendChild(document.createElement("BR"));
    document.getElementById("filters").appendChild(document.createElement("HR"));
}
function check(){
    if(window.location.href.includes("?post")){
        document.getElementById("filtersbutton").style.display = "none";
        var $_GET = {};
        if(document.location.toString().indexOf('?') !== -1) {
            var query = document.location.toString().replace(/^.*?\?/, '').replace(/#.*$/, '').split('&');
            for(var i=0, l=query.length; i<l; i++) {
               var aux = decodeURIComponent(query[i]).split('=');
               $_GET[aux[0]] = aux[1];
            }
        }
        document.getElementById("filesinfo").style.display = "none";
        var heightofrender = $(document).height();
        heightofrender = heightofrender - $("#upb").height() - 50;
        var renderer = document.createElement("IFRAME");
        renderer.setAttribute("src","render.html?post="+$_GET['post']);
        renderer.setAttribute("frameborder","0");
        renderer.setAttribute("width",$("#upb").width()-50);
        renderer.setAttribute("height",heightofrender);
        document.getElementById("posts-box").appendChild(renderer);
        // Redo this in PHP you idiot
        // At least some parts of it
        var specialpath = "posts/"+$_GET['post'];
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", specialpath, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    specialcontent = allText;
                }
            }
        }
        rawFile.send(null);
        const text = specialcontent.split("\n");
        var postlength = text.length;
        var current = 0;
        var istitle = false;
        var isimage = false;
        var istext = false;
        while(current <= postlength){
            switch(String(text[current]).substring(0, 5)){
                case "#TITL":
                    if(!istitle){
                        document.title = String(text[current]).replace('#TITL', '') + " - PouekDEV Blog";
                        document.querySelector('meta[property="og:title"]').setAttribute("content", String(text[current]).replace('#TITL', '') + " - PouekDEV Blog");
                        istitle = true
                    }
                    break;
                case "#NOTL":
                    if(!istitle){
                        document.title = "Post - PouekDEV Blog";
                        istitle = true;
                    }
                    break;
                case "#IMAG":
                    if(!isimage){
                        document.querySelector('meta[property="og:image"]').setAttribute("content", String(text[current]).replace('#IMAG', ''));
                        isimage = true;
                    }
                    break;
                case "#TEXT":
                    if(!istext){
                        document.querySelector('meta[name="description"]').setAttribute("content", String(text[current]).replace('#TEXT', ''));
                        document.querySelector('meta[property="og:description"]').setAttribute("content", String(text[current]).replace('#TEXT', ''));
                        istext = true;
                    }
                    break;
            }
            current += 1;
        }
    }
    else{
        renderposts();
    }
}
check();