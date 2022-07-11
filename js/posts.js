var content;
var viewportHeight = window.innerHeight;
var viewportWidth = window.innerWidth;
var specialcontent;
var dir = "posts/";
var fileextension = ".pmd";
var isloading = true;
var tags = "";
function renderposts(){
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
            if($_GET['filter'] == "oldest"){
                // Do this...
                $($(data).find("a:contains(" + fileextension + ")").get()).each(function (){
                    var filename = this.href.replace(window.location.host, "").replace("https:", "").replace("//","");//dont't forget the s
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
                                $(".wrap").css("max-width", viewportWidth-520);
                                $(".wrapnoimage").css("max-width", viewportWidth-120);
                                var thediv = document.createElement("DIV");
                                var exclusivefile = filename;
                                exclusivefile = exclusivefile.replace("/","");
                                var divattribute = "window.location.href="+"'posts.html?post="+exclusivefile+"';";
                                thediv.setAttribute("onclick",divattribute);
                                thediv.setAttribute("class","pc");
                                thediv.style.cssText = "height: 200px; border-radius: 5px;";
                                var thetitle = document.createElement("P");
                                thetitle.style.cssText = "font-size: 40px; text-align: left; position: absolute; left: 50px; font-weight: bold;";
                                var theimagep = document.createElement("P");
                                theimagep.style.cssText = "position: absolute; text-align: right; right: 100px;";
                                var theimage = document.createElement("IMG");
                                theimage.style.cssText = "border-radius: 5px;";
                                var thecontent = document.createElement("P");
                                thecontent.style.cssText = "font-size: 30px; text-align: left; position: absolute; left: 50px;";
                                var isnottherightag = false;
                                while(current <= postlength){
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
                                            tags += String(text[current]).replace('#TAGS', ' ')
                                            break;
                                    }
                                    current += 1;
                                    if(String(text[current]).substring(0, 5) == "#NRDY"){
                                        break;
                                    }
                                    else if(istitle && isimage && istext){
                                        // Assemble
                                        var thebr = document.createElement("BR");
                                        var thebr2 = document.createElement("BR");
                                        var thebr3 = document.createElement("BR");
                                        var thebr4 = document.createElement("BR");
                                        thediv.appendChild(theimagep);
                                        thediv.appendChild(thetitle);
                                        thediv.appendChild(thebr2);
                                        thediv.appendChild(thebr3);
                                        thediv.appendChild(thebr4);
                                        thediv.appendChild(thecontent);
                                        document.getElementById("posts-box").appendChild(thediv);
                                        document.getElementById("posts-box").appendChild(thebr);
                                        if(isloading){
                                            isloading = false;
                                            document.getElementById("filesinfo").style.display = "none";
                                        }
                                        break;
                                    }
                                    else if(current >= postlength){
                                        thetitle.setAttribute("class","wrapnoimage");
                                        thecontent.setAttribute("class","wrapnoimage");
                                        var thebr = document.createElement("BR");
                                        var thebr2 = document.createElement("BR");
                                        var thebr3 = document.createElement("BR");
                                        var thebr4 = document.createElement("BR");
                                        thediv.appendChild(theimagep);
                                        thediv.appendChild(thetitle);
                                        thediv.appendChild(thebr2);
                                        thediv.appendChild(thebr3);
                                        thediv.appendChild(thebr4);
                                        thediv.appendChild(thecontent);
                                        document.getElementById("posts-box").appendChild(thediv);
                                        document.getElementById("posts-box").appendChild(thebr);
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
                });
                processtags();
            }
            else{
                // and this in a better way
                $($(data).find("a:contains(" + fileextension + ")").get().reverse()).each(function (){
                    var filename = this.href.replace(window.location.host, "").replace("https:", "").replace("//","");//dont't forget the s
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
                                $(".wrap").css("max-width", viewportWidth-520);
                                $(".wrapnoimage").css("max-width", viewportWidth-120);
                                var thediv = document.createElement("DIV");
                                var exclusivefile = filename;
                                exclusivefile = exclusivefile.replace("/","");
                                var divattribute = "window.location.href="+"'posts.html?post="+exclusivefile+"';";
                                thediv.setAttribute("onclick",divattribute);
                                thediv.setAttribute("class","pc");
                                thediv.style.cssText = "height: 200px; border-radius: 5px;";
                                var thetitle = document.createElement("P");
                                thetitle.style.cssText = "font-size: 40px; text-align: left; position: absolute; left: 50px; font-weight: bold;";
                                var theimagep = document.createElement("P");
                                theimagep.style.cssText = "position: absolute; text-align: right; right: 100px;";
                                var theimage = document.createElement("IMG");
                                theimage.style.cssText = "border-radius: 5px;";
                                var thecontent = document.createElement("P");
                                thecontent.style.cssText = "font-size: 30px; text-align: left; position: absolute; left: 50px;";
                                var isnottherightag = false;
                                while(current <= postlength){
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
                                    }
                                    current += 1;
                                    if(isnottherightag){
                                        break;
                                    }
                                    if(String(text[current]).substring(0, 5) == "#NRDY"){
                                        break;
                                    }
                                    else if(istitle && isimage && istext){
                                        // Assemble
                                        var thebr = document.createElement("BR");
                                        var thebr2 = document.createElement("BR");
                                        var thebr3 = document.createElement("BR");
                                        var thebr4 = document.createElement("BR");
                                        thediv.appendChild(theimagep);
                                        thediv.appendChild(thetitle);
                                        thediv.appendChild(thebr2);
                                        thediv.appendChild(thebr3);
                                        thediv.appendChild(thebr4);
                                        thediv.appendChild(thecontent);
                                        document.getElementById("posts-box").appendChild(thediv);
                                        document.getElementById("posts-box").appendChild(thebr);
                                        if(isloading){
                                            isloading = false;
                                            document.getElementById("filesinfo").style.display = "none";
                                        }
                                        break;
                                    }
                                    else if(current >= postlength){
                                        thetitle.setAttribute("class","wrapnoimage");
                                        thecontent.setAttribute("class","wrapnoimage");
                                        var thebr = document.createElement("BR");
                                        var thebr2 = document.createElement("BR");
                                        var thebr3 = document.createElement("BR");
                                        var thebr4 = document.createElement("BR");
                                        thediv.appendChild(theimagep);
                                        thediv.appendChild(thetitle);
                                        thediv.appendChild(thebr2);
                                        thediv.appendChild(thebr3);
                                        thediv.appendChild(thebr4);
                                        thediv.appendChild(thecontent);
                                        document.getElementById("posts-box").appendChild(thediv);
                                        document.getElementById("posts-box").appendChild(thebr);
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
                });
                processtags();
            }
        }
    });
}
function processtags(){
    var tagslist = tags.trim().split(/\s+/);
    tagslist = new Set(tagslist)
    tagslist = Array.from(tagslist)
    var tagslistlength = tagslist.length;
    var current = 0;
    while(current <= tagslistlength){
        var newtagfilter = document.createElement("A");
        newtagfilter.setAttribute("href","posts.html?tag="+tagslist[current]);
        newtagfilter.appendChild(document.createTextNode("| " + tagslist[current] + "\n"));
        document.getElementById("filters").appendChild(newtagfilter);
        current += 1;
        if(current == tagslistlength){
            break;
        }
    }
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