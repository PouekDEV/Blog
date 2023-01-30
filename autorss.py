import sys
import os
import datetime
import xml.etree.ElementTree as ET
post_file = ""
rss_file = "rsstest.xml"
lines = []
today = datetime.datetime.now()
post_number = str(sys.argv[1])
for file in os.listdir("posts/"):
    if file.startswith(post_number):
        post_file = file
if post_file == "":
    raise Exception("File not found")
else:
    print(post_file)
    with open("./posts/"+post_file, 'r', encoding='UTF-8') as file:
        while (line := file.readline().rstrip()):
            lines.append(line)
    tree = ET.parse(rss_file)
    root = tree.getroot()
    root = root[0]
    item = ET.Element("item")
    title = ET.Element("title")
    title.text = lines[1].replace("#TITL","")
    link = ET.Element("link")
    link.text = "https://blog.pouekdev.one/?post="+str(post_file)
    guid = ET.Element("guid")
    guid.text = "?post="+str(post_file)
    guid.set("isPermaLink","false")
    day_name = today.strftime("%A")
    day_name = day_name[0:3]
    day_name += ","
    day_number = today.strftime("%d")
    month = today.strftime("%B")
    month = month[0:3]
    year = today.strftime("%Y")
    other = today.strftime("%H:%M:%S")
    pdate = ET.Element("pubDate")
    pdate.text = day_name + " " + day_number + " " + month + " " + year + " " + other + " +0100"
    for line in lines:
        try:
            line.index("#TEXT")
        except ValueError:
            pass
        else:
            description_text = line
            break
    description_text = description_text.replace("#TEXT","")
    description_text = description_text[:-1]
    description_text += " [...]"
    description = ET.Element("description")
    description.text = description_text
    item.insert(0,title)
    item.insert(1,link)
    item.insert(2,guid)
    item.insert(3,pdate)
    item.insert(4,description)
    root.insert(4,item)
    tree.write(rss_file, "UTF-8")