<?php
/** @noinspection PhpIncludeInspection */
?>
<!DOCTYPE html>
<html lang="en-CA" dir="ltr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Elias's Portfolio</title>
    <?php
    @include './header.html'
    /* Using error suppression in case default grunt task is used (default doesn't generate icon header) */
    ?>

    <link rel="stylesheet" href="css/main.css">
    <script src="js/main.js" async></script>
<?php if(in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))){ ?>
    <script src="http://localhost:35729/livereload.js" async></script>
<?php } ?>
</head>
<body>
    <h1>Hello World!</h1>

    <div class="js-tilt">
        <div class="square"></div>
    </div>
</body>
</html>
