<?php
/**
 * The main template file for R Ceramica Luxury Surfaces.
 */
get_header();
?>
<main id="site-content" role="main">
    <?php
    if ( have_posts() ) :
        while ( have_posts() ) :
            the_post();
            the_content();
        endwhile;
    else :
        ?>
        <section class="no-results not-found">
            <header class="page-header">
                <h1><?php esc_html_e( 'Nothing Found', 'rceramica-luxury' ); ?></h1>
            </header>
            <div class="page-content">
                <p><?php esc_html_e( 'It seems we can’t find what you’re looking for. Perhaps searching can help.', 'rceramica-luxury' ); ?></p>
                <?php get_search_form(); ?>
            </div>
        </section>
        <?php
    endif;
    ?>
</main>
<?php
get_footer();
