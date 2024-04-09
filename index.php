<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Pouek's all-over-the-place blog">
    <meta property="og:type" content="blog">
    <meta property="og:title" content="Pouek's Blog">
    <meta property="og:description" content="Pouek's all-over-the-place blog">
    <meta property="og:url" content="blog.pouekdev.one">
    <meta property="og:image" content="https://www.pouekdev.one/miQZ2R.gif">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="icon" href="https://www.pouekdev.one/miQZ2R.gif">
    <link rel="stylesheet" href="styles/blog.css">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-KZ4YJ36K6F"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-KZ4YJ36K6F');
    </script>
    <title>Posts - PouekDEV Blog</title>
</head>
<body>
    <div class="p-5 text-center">
        <h1 class="mb-3" style="display: inline-block;">Pouek's Blog</h1>
        <a href="RSS.xml" style="display: inline-block; margin-right: 0px;"><img src="src/rss.png" alt="rss" height="25" width="25"></a>
    </div>
    <div class="d-flex justify-content-center container" style="display: block !important;">
        <?php
            $path = "./posts/";
            $files = array_diff(scandir($path,SCANDIR_SORT_DESCENDING), array('.', '..', 'snippets'));
            foreach($files as $file){
                $post = file_get_contents($path.$file);
                $post = explode("\n",$post);
                $title = "";
                $description = "";
                $date = "";
                foreach($post as $line){
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
                    if($title != "" && $description != "" && $date != ""){
                        break;
                    }
                }
                echo '<a href="?post='.$file.'">';
                echo '<div class="card" style="background-color: rgb(33, 33, 33); margin-right: auto; margin-left: auto; max-width: 1000px;" id="post">';
                echo '<div class="card-body text-white">';
                echo '<h4 class="card-title" style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-weight: bold;">'.$title.'</h4>';
                echo '<h5 class="card-text" style="color: rgb(155, 155, 155); overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">'.$description.'</h5>';
                echo '<h6 style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; color: rgb(155, 155, 155);">'.$date.'</h6>';
                echo '</div>';
                echo '</div>';
                echo '</a>';
                echo '<br>';
            }
        ?>
        <!--
        <a href="#">
            <div class="card" style="background-color: rgb(33, 33, 33); margin-right: auto; margin-left: auto; max-width: 1000px;" id="post">
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
</html>