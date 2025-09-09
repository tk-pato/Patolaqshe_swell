<?php
require __DIR__.'/wp-load.php';
echo "ABSPATH: ".ABSPATH.PHP_EOL;
echo "template (親): ".get_template_directory().PHP_EOL;
echo "stylesheet (子): ".get_stylesheet_directory().PHP_EOL;
