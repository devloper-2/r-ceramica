<?php
/**
 * The header for our theme.
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" sizes="32x32"
      href="<?php echo get_template_directory_uri(); ?>/assets/favicon/favicon.png">

<link rel="shortcut icon"
      href="<?php echo get_template_directory_uri(); ?>/assets/favicon/favicon.png">

<link rel="apple-touch-icon"
      href="<?php echo get_template_directory_uri(); ?>/assets/favicon/favicon.png">
    <?php wp_head(); ?>
</head>
<body <?php body_class( 'bg-[#0a0a0a] text-white font-sans font-light selection:bg-white/20' ); ?>>
<?php wp_body_open(); ?>
<?php get_template_part( 'partials/nav' ); ?>