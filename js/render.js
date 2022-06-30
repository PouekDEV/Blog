var content;
var snippet;
var alltext = "";
setTimeout(() =>{
    if(window.location.href.includes("#")){
        var path = window.location.hash;
        path = path.replace("#","");
        readTextFile("posts/"+path);
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
        if(String(text[current]).substring(0, 5) == "#TITL"){
            document.getElementById('title').textContent = String(text[current]).replace('#TITL', '');
            alltext += String(text[current]).replace('#TITL', '');
        }
        else if(String(text[current]).substring(0, 5) == "#LANG"){
            document.documentElement.setAttribute("lang", String(text[current]).replace('#LANG', ''));
        }
        else if(String(text[current]).substring(0, 5) == "#NOTL"){
            document.getElementById('title').textContent = "";
        }
        else if(String(text[current]).substring(0, 5) == "#IMAG"){
            var next = current;
            next = next+=1;
            var image = document.createElement("IMG");
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
            document.getElementById("render-box").appendChild(image);
        }
        else if(String(text[current]).substring(0, 5) == "#DATE"){
            var date = document.createElement("P");
            date.appendChild(document.createTextNode(String(text[current]).replace('#DATE', '')));
            date.setAttribute("class","timestamps");
            document.getElementById("render-box").appendChild(date);
            alltext += String(text[current]).replace('#DATE', '');
        }
        else if(String(text[current]).substring(0, 5) == "#IMGA"){
            var date = document.createElement("P");
            date.appendChild(document.createTextNode(String(text[current]).replace('#IMGA', '')));
            date.setAttribute("class","imageattribution");
            document.getElementById("render-box").appendChild(date);
        }
        else if(String(text[current]).substring(0, 5) == "#TEXT"){
            var textelement = document.createElement("P");
            textelement.appendChild(document.createTextNode(String(text[current]).replace('#TEXT', '')));
            textelement.setAttribute("class","normaltext");
            document.getElementById("render-box").appendChild(textelement);
            alltext += String(text[current]).replace('#TEXT', '');
        }
        else if(String(text[current]).substring(0, 5) == "#BOLD"){
            var textelement = document.createElement("P");
            textelement.appendChild(document.createTextNode(String(text[current]).replace('#BOLD', '')));
            textelement.setAttribute("class","bold");
            document.getElementById("render-box").appendChild(textelement);
            alltext += String(text[current]).replace('#BOLD', '');
        }
        else if(String(text[current]).substring(0, 5) == "#UNDT"){
            var textelement = document.createElement("P");
            textelement.appendChild(document.createTextNode(String(text[current]).replace('#UNDT', '')));
            textelement.setAttribute("class","underline");
            document.getElementById("render-box").appendChild(textelement);
            alltext += String(text[current]).replace('#UNDT', '');
        }
        else if(String(text[current]).substring(0, 5) == "#YTEM"){
            var ytembed = document.createElement("IFRAME");
            ytembed.setAttribute("width","560");
            ytembed.setAttribute("height","315");
            ytembed.setAttribute("frameborder","0");
            ytembed.setAttribute("allow","accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
            ytembed.setAttribute("src","https://www.youtube.com/embed/"+String(text[current]).replace('#YTEM', ''));
            document.getElementById("render-box").appendChild(ytembed);
        }
        else if(String(text[current]).substring(0, 5) == "#SPAC"){
            document.getElementById("render-box").appendChild(document.createElement("BR"));
        }
        else if(String(text[current]).substring(0, 5) == "#TEXR"){
            var textelement = document.createElement("P");
            textelement.appendChild(document.createTextNode(String(text[current]).replace('#TEXR', '')));
            textelement.setAttribute("class","redtext");
            document.getElementById("render-box").appendChild(textelement);
            alltext += String(text[current]).replace('#TEXR', '');
        }
        else if(String(text[current]).substring(0, 5) == "#LINK"){
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
        }
        else if(String(text[current]).substring(0, 5) == "#HEAD"){
            var textelement = document.createElement("H1");
            textelement.appendChild(document.createTextNode(String(text[current]).replace('#HEAD', '')));
            textelement.setAttribute("class","texthead");
            document.getElementById("render-box").appendChild(textelement);
            alltext += String(text[current]).replace('#HEAD', '');
        }
        else if(String(text[current]).substring(0, 5) == "#IFRM"){
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
        }
        else if(String(text[current]).substring(0, 5) == "#CODE"){
            var next = current;
            next = next+=1;
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
            current+=1;
        }
        else if(String(text[current]).substring(0, 5) == "#QUOT"){
            var textelement = document.createElement("Q");
            textelement.appendChild(document.createTextNode(String(text[current]).replace('#QUOT', '')));
            textelement.setAttribute("class","normaltext");
            document.getElementById("render-box").appendChild(textelement);
            alltext += String(text[current]).replace('#QUOT', '');
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