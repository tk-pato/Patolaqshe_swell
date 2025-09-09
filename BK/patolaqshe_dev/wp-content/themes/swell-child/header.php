<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?> data-loaded="false" data-scrolled="false" data-spmenu="closed">
<head>
<meta charset="<?php bloginfo('charset'); ?>"><?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<!-- child-active v3 -->
<?php get_template_part('parts/header/header_contents'); ?>
<?php // Main visual and the rest are rendered by the template as usual ?>
