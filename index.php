<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php
        $path = "./posts/";
        if(isset($_GET["post"]) && $_GET["post"] != "preview"){
            if(file_exists($path.$_GET["post"])){
                $post = file_get_contents($path.$_GET["post"]);
            }
            else{
                $post = file_get_contents("404.pmd");
            }
            $post = explode("\n",$post);
            $title = "";
            $description = "";
            $thumbnail = "https://www.pouekdev.one/miQZ2R.gif";
            foreach($post as $line){
                if(str_contains($line,"#TITL") && $title == ""){
                    $title = str_replace("#TITL","",$line);
                }
                if((str_contains($line,"#DESC") || str_contains($line,"#TEXT")) && $description == ""){
                    $description = str_replace("#DESC","",$line);
                    $description = str_replace("#TEXT","",$description);
                }
                if(str_contains($line,"#THBN") && $thumbnail == ""){
                    $thumbnail = str_replace("#DATE","",$line);
                }
                if($title != "" && $description != "" && $thumbnail != ""){
                    break;
                }
            }
            echo "<title>".$title."</title>";
            echo "<meta name='og:title' content='".str_replace("'","",str_replace('"',"",$title))."'>";
            echo "<meta name='description' content='".str_replace("'","",str_replace('"',"",$description))."'>";
            echo "<meta name='og:description' content='".str_replace("'","",str_replace('"',"",$description))."'>";
            echo "<meta name='og:url' content='https://blog.pouekdev.one/?post=".$_GET["post"]."'>";
            echo "<meta name='og:image' content='".str_replace(" ","",$thumbnail)."'>";
        }
        else if(isset($_GET["post"]) && $_GET["post"] == "preview"){
            $post = $_GET["content"];
            $post = explode("\n",$post);
        }
        else{
    ?>
    <title>Blog</title>
    <meta name="description" content="Pouek's all-over-the-place blog">
    <meta property="og:title" content="Pouek's Blog">
    <meta property="og:description" content="Pouek's all-over-the-place blog">
    <meta property="og:url" content="https://blog.pouekdev.one">
    <meta property="og:image" content="https://www.pouekdev.one/miQZ2R.gif">
    <?php
        }
    ?>
    <meta property="og:type" content="blog">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="icon" href="https://www.pouekdev.one/miQZ2R.gif">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
    <link rel="stylesheet" href="styles/lite-yt-embed.css">
    <link rel="stylesheet" href="styles/atom-one-dark.css">
    <script src="js/lite-yt-embed.js"></script>
    <link rel="stylesheet" href="styles/blog.css">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-KZ4YJ36K6F"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-KZ4YJ36K6F');
    </script>
</head>
<body>
    <div class="p-5 text-center">
        <h1 class="mb-3" style="display: inline-block;"><a href="index.php" style="color: white;">Pouek's Blog</a></h1>
        <a href="RSS.xml" class="links"><i class="bi bi-rss-fill"></i></a><br>
        <a class="links" href="https://www.pouekdev.one"><i class="bi bi-arrow-90deg-up"></i></a>
        <button class="plain"><i class="bi bi-funnel-fill"></i></button>
        <button class="plain"><i class="bi bi-search"></i></button>
    </div>
    <div class="d-flex justify-content-center container" style="display: block !important;">
        <?php
            if(!isset($_GET["post"])){
                $files = array_diff(scandir($path,SCANDIR_SORT_DESCENDING), array('.', '..', 'snippets'));
                foreach($files as $file){
                    $post = file_get_contents($path.$file);
                    $post = explode("\n",$post);
                    $title = "";
                    $description = "";
                    $date = "";
                    $thumbnail = "";
                    foreach($post as $line){
                        if(str_contains($line,"#NRDY")){
                            break;
                        }
                        if(str_contains($line,"#TITL") && $title == ""){
                            $title = str_replace("#TITL","",$line);
                        }
                        if((str_contains($line,"#DESC") || str_contains($line,"#TEXT")) && $description == ""){
                            $description = str_replace("#DESC","",$line);
                            $description = str_replace("#TEXT","",$description);
                        }
                        if(str_contains($line,"#DATE") && $date == ""){
                            $date = str_replace("#DATE","",$line);
                        }
                        if(str_contains($line,"#THBN") && $thumbnail == ""){
                            $thumbnail = str_replace("#THBN","",$line);
                        }
                        if($title != "" && $description != "" && $date != "" && $thumbnail != ""){
                            break;
                        }
                    }
                    echo '<a href="?post='.$file.'">';
                    echo '<div class="card" style="background-color: rgb(33, 33, 33); margin-right: auto; margin-left: auto; max-width: 1000px;" id="post">';
                    if($thumbnail != ""){
                        echo '<img src="'.$thumbnail.'" alt="thumbnail">';
                    }
                    echo '<div class="card-body text-white">';
                    echo '<h4 class="card-title" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-weight: bold;">'.$title.'</h4>';
                    echo '<h5 class="card-text" style="color: rgb(155, 155, 155); overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">'.$description.'</h5>';
                    echo '<h6 style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: rgb(155, 155, 155);">'.$date.'</h6>';
                    echo '</div>';
                    echo '</div>';
                    echo '</a>';
                    echo '<br>';
                }
            }
            else{
                foreach($post as $line){
                    switch($line){
                        case str_contains($line,"#TITL"):
                            echo "<h1 style='font-weight: bold;'>".str_replace("#TITL","",$line)."</h1>";
                            break;
                        case str_contains($line,"#DATE"):
                            echo "<h6 style='color: rgb(155, 155, 155);'>".str_replace("#DATE","",$line)."</h6>";
                            break;
                        case str_contains($line,"#DESC"):
                            echo "<p>".str_replace("#DESC","",$line)."</p>";
                            break;
                        case str_contains($line,"#NWLN"):
                            echo "<br>";
                            break;
                        case str_contains($line,"#TEXT"):
                            $values = str_replace("#TEXT","",$line);
                            $values = explode("~",$values);
                            $font_size = "20px";
                            $color = "white";
                            $text_decoration = "none";
                            if(isset($values[1])){
                                $font_size = ltrim($values[1]);
                            }
                            if(isset($values[2])){
                                $color = ltrim($values[2]);
                            }
                            if(isset($values[3])){
                                $text_decoration = ltrim($values[3]);
                            }
                            echo "<span style='font-size: ".$font_size."; color: ".$color."; text-decoration: ".$text_decoration.";'>".$values[0]."</span>";
                            break;
                        case str_contains($line,"#HEAD"):
                            $values = str_replace("#HEAD","",$line);
                            $values = explode("~",$values);
                            $level = ltrim($values[1]);
                            $id = ltrim($values[2]);
                            echo "<p></p>";
                            echo "<h".$level." id='".$id."' style='font-weight: bold;'>".$values[0]."<a href='#".$id."' style='display: inline-block; text-decoration: none; font-size: 30px; color: rgb(155, 155, 155);'>#</a></h".$level.">";
                            echo "<p></p>";
                            break;
                        case str_contains($line,"#YTEM"):
                            echo "<lite-youtube videoid='".str_replace(" ","",str_replace("#YTEM","",$line))."'></lite-youtube>";
                            break;
                        case str_contains($line,"#IMAG"):
                            $values = str_replace("#IMAG","",$line);
                            $values = explode("~",$values);
                            $height = "";
                            $width = "";
                            if(isset($values[1])){
                                $height = ltrim($values[1]);
                            }
                            if(isset($values[2])){
                                $width = ltrim($values[2]);
                            }
                            echo "<p></p>";
                            echo "<img src='".$values[0]."' height='".$height."' width='".$width."'>";
                            echo "<p></p>";
                            break;
                        case str_contains($line,"#LINK"):
                            $values = str_replace("#LINK","",$line);
                            $values = explode("~",$values);
                            $text = $values[0];
                            if(isset($values[1])){
                                $text = $values[1];
                            }
                            echo "<a style='color: white; text-decoration: underline; font-size: 20px;' href='".$values[0]."' target='blank'>".$text."</a>";
                            break;
                        case str_contains($line,"#IFRM"):
                            $values = str_replace("#IFRM","",$line);
                            $values = explode("~",$values);
                            $height = ltrim($values[1]);
                            $width = ltrim($values[2]);
                            echo "<p></p>";
                            echo "<iframe src='".$values[0]."' width='".$width."' height='".$height."'></iframe>";
                            echo "<p></p>";
                            break;
                        case str_contains($line,"#CODE"):
                            $values = str_replace("#CODE","",$line);
                            $values = explode("~",$values);
                            $language = ltrim($values[1]);
                            $code = file_get_contents(str_replace(" ","",$values[0]));
                            echo "<pre>";
                            echo "<code class='language-".$language."'>".$code."</code>";
                            echo "</pre>";
                            break;
                    }
                }
            }
        ?>
        <!--
        <a href="#">
            <div class="card" style="background-color: rgb(33, 33, 33); margin-right: auto; margin-left: auto; max-width: 1000px;" id="post">
                <img src="https://placehold.co/1000x400" alt="thumbnail">
                <div class="card-body text-white">
                    <h4 class="card-title" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-weight: bold;">Special title treatment</h4>
                    <h5 class="card-text" style="color: rgb(155, 155, 155); overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis hic numquam, porro dolores quia saepe repellendus animi rem nemo in iste modi facere officia, quidem et eligendi similique necessitatibus maiores?</h5>
                    <h6 style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: rgb(155, 155, 155);">Date</h6>
                </div>
            </div>
        </a>
        <br>
        -->
    </div>
</body>
<script>
    hljs.highlightAll();
</script>
<script src="js/menu.js"></script>
</html>