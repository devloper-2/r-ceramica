<?php
defined('ABSPATH') || exit;

get_header();

$current_cat = get_queried_object();

$subcategories = get_terms([
    'taxonomy'   => 'product_cat',
    'parent'     => $current_cat->term_id,
    'hide_empty' => false,
]);
?>

<section class="luxury-category-page">

    <div class="container">

        <div class="category-header">
            <h1>
                <?php echo esc_html($current_cat->name); ?>
            </h1>

            <?php if ($current_cat->description) : ?>
                <p>
                    <?php echo esc_html($current_cat->description); ?>
                </p>
            <?php endif; ?>
        </div>

        <div class="subcategory-grid">

            <?php foreach ($subcategories as $subcategory) :

                $thumbnail_id = get_term_meta(
                    $subcategory->term_id,
                    'thumbnail_id',
                    true
                );

                $image = wp_get_attachment_url($thumbnail_id);

                $link = get_term_link($subcategory);
            ?>

                <a href="<?php echo esc_url($link); ?>" class="subcategory-card">

                    <div class="subcategory-image">
                        <img src="<?php echo esc_url($image); ?>" alt="">
                    </div>

                    <div class="subcategory-content">
                        <h3>
                            <?php echo esc_html($subcategory->name); ?>
                        </h3>

                        <span>
                            ARCHITECTURAL SERIES
                        </span>
                    </div>

                </a>

            <?php endforeach; ?>

        </div>

    </div>

</section>

<?php get_footer(); ?>