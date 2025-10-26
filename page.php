<?php get_header(); ?>

<section>
    <h2 class="font-bold text-2xl pb-6 text-center"><?php the_title(); ?></h2>
    <div class="prose dark:prose-invert max-w-[80ch] mx-auto">
        <?php the_content(); ?>
    </div>
</section>

<?php get_footer(); ?>