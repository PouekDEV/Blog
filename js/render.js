var content;
var snippet;
var alltext = "";
setTimeout(() =>{
    if(window.location.href.includes("?")){
        var $_GET = {};
        if(document.location.toString().indexOf('?') !== -1) {
            var query = document.location.toString().replace(/^.*?\?/, '').replace(/#.*$/, '').split('&');
            for(var i=0, l=query.length; i<l; i++) {
               var aux = decodeURIComponent(query[i]).split('=');
               $_GET[aux[0]] = aux[1];
            }
        }
        readTextFile("posts/"+$_GET['post']);
    }
},100)
function countWords(str){
    return str.trim().split(/\s+/).length;
}
function readingTime(inputstring){
    var text = inputstring;
    var wpm = 225;
    var words = text.trim().split(/\s+/).length;
    var time = Math.ceil(words / wpm);
    document.getElementById("time").innerText = "~" + time + " minute read";
}
function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                content = allText;
                render();
            }
            else{
                setInterval(() => {
                    if(document.getElementById("idc-container").style.display != "none"){
                        document.getElementById("idc-container").style.display = "none";
                    }
                },1000)
                document.getElementById("up").style.display = "none";
                readTextFile("404.pmd");
            }
        }
    }
    rawFile.send(null);
}
function readsnippet(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                snippet= allText;
            }
        }
    }
    rawFile.send(null);
}
function render(){
    const text = content.split("\n");
    var postlength = text.length;
    var current = 0;
    while(current <= postlength){
        switch(String(text[current]).substring(0, 5)){
            case "#TITL":
                document.getElementById('title').textContent = String(text[current]).replace('#TITL', '');
                alltext += String(text[current]).replace('#TITL', '');
                break;
            case "#LANG":
                document.documentElement.setAttribute("lang", String(text[current]).replace('#LANG', ''));
                break;
            case "#NOTL":
                document.getElementById('title').textContent = "";
                break;
            case "#IMAG":
                var next = current;
                next = next+=1;
                var image = document.createElement("IMG");
                var p = document.createElement("P");
                p.setAttribute("class","image");
                image.setAttribute("src",String(text[current]).replace('#IMAG', ''));
                if(String(text[next]).substring(0, 5) == "#IMWI"){
                    image.setAttribute("width",String(text[next]).replace('#IMWI', ''));
                    next = next+=1;
                }
                else{
                    next = next+=1;
                }
                if(String(text[next]).substring(0, 5) == "#IMHE"){
                    image.setAttribute("height",String(text[next]).replace('#IMHE', ''));
                }
                p.appendChild(image);
                document.getElementById("render-box").appendChild(p);
                break;
            case "#DATE":
                var date = document.createElement("P");
                date.appendChild(document.createTextNode(String(text[current]).replace('#DATE', '')));
                date.setAttribute("class","timestamps");
                document.getElementById("render-box").appendChild(date);
                alltext += String(text[current]).replace('#DATE', '');
                break;
            case "#IMGA":
                var date = document.createElement("P");
                date.appendChild(document.createTextNode(String(text[current]).replace('#IMGA', '')));
                date.setAttribute("class","imageattribution");
                document.getElementById("render-box").appendChild(date);
                break;
            case "#TEXT":
                var textelement = document.createElement("P");
                textelement.appendChild(document.createTextNode(String(text[current]).replace('#TEXT', '')));
                textelement.setAttribute("class","normaltext");
                document.getElementById("render-box").appendChild(textelement);
                alltext += String(text[current]).replace('#TEXT', '');
                break;
            case "#BOLD":
                var textelement = document.createElement("P");
                textelement.appendChild(document.createTextNode(String(text[current]).replace('#BOLD', '')));
                textelement.setAttribute("class","bold");
                document.getElementById("render-box").appendChild(textelement);
                alltext += String(text[current]).replace('#BOLD', '');
                break;
            case "#UNDT":
                var textelement = document.createElement("P");
                textelement.appendChild(document.createTextNode(String(text[current]).replace('#UNDT', '')));
                textelement.setAttribute("class","underline");
                document.getElementById("render-box").appendChild(textelement);
                alltext += String(text[current]).replace('#UNDT', '');
                break;
            case "#YTEM":
                var ytembed = document.createElement("lite-youtube");
                ytembed.setAttribute("videoid",String(text[current]).replace('#YTEM', ''));
                document.getElementById("render-box").appendChild(ytembed);
                break;
            case "#SPAC":
                document.getElementById("render-box").appendChild(document.createElement("BR"));
                break;
            case "#TEXR":
                var textelement = document.createElement("P");
                textelement.appendChild(document.createTextNode(String(text[current]).replace('#TEXR', '')));
                textelement.setAttribute("class","redtext");
                document.getElementById("render-box").appendChild(textelement);
                alltext += String(text[current]).replace('#TEXR', '');
                break;
            case "#LINK":
                var next = current;
                next = next+=1;
                var link = document.createElement("A");
                if(String(text[next]).substring(0, 5) == "#LTXT"){
                    link.appendChild(document.createTextNode(String(text[next]).replace('#LTXT', '')));
                    alltext += String(text[current]).replace('#LTXT', '');
                }
                else{
                    link.appendChild(document.createTextNode("link"));
                }
                link.setAttribute("href",String(text[current]).replace('#LINK', ''));
                link.setAttribute("class","link");
                link.setAttribute("target","_blank");
                document.getElementById("render-box").appendChild(link);
                break;
            case "#HEAD":
                var textelement = document.createElement("H1");
                textelement.appendChild(document.createTextNode(String(text[current]).replace('#HEAD', '')));
                textelement.setAttribute("class","texthead");
                document.getElementById("render-box").appendChild(textelement);
                alltext += String(text[current]).replace('#HEAD', '');
                break;
            case "#IFRM":
                var next = current;
                next = next+=1;
                var embed = document.createElement("IFRAME");
                if(String(text[next]).substring(0, 5) == "#IFWI"){
                    embed.setAttribute("width",String(text[next]).replace('#IFWI', ''));
                    next = next+=1;
                }
                else{
                    embed.setAttribute("width","560");
                    next = next+=1;
                }
                if(String(text[next]).substring(0, 5) == "#IFHE"){
                    embed.setAttribute("height",String(text[next]).replace('#IFHE', ''));
                }
                else{
                    embed.setAttribute("height","315");
                }
                embed.setAttribute("frameborder","0");
                embed.setAttribute("class","websiteembed");
                embed.setAttribute("src",String(text[current]).replace('#IFRM', ''));
                document.getElementById("render-box").appendChild(embed);
                break;
            case "#CODE":
                var next = current;
                next = next += 1;
                var pre = document.createElement("PRE");
                var code = document.createElement("CODE");
                readsnippet(String(text[current]).replace('#CODE', ''));
                code.appendChild(document.createTextNode(snippet));
                if(String(text[next]).substring(0, 5) == "#CLNG"){
                    code.setAttribute("class","language-"+String(text[next]).replace('#CLNG', ''));
                }
                pre.appendChild(code);
                document.getElementById("render-box").appendChild(pre);
                hljs.highlightAll();
                current += 1;
                break;
            case "#QUOT":
                var textelement = document.createElement("Q");
                textelement.appendChild(document.createTextNode(String(text[current]).replace('#QUOT', '')));
                textelement.setAttribute("class","normaltext");
                document.getElementById("render-box").appendChild(textelement);
                alltext += String(text[current]).replace('#QUOT', '');
                break;
        }
        current += 1;
        if(postlength == current){
            var wordcount = countWords(alltext);
            document.getElementById("words").innerHTML = wordcount + " words";
            readingTime(alltext);
        }
    }
}
// Activation function
//readTextFile("posts/test.pmd")