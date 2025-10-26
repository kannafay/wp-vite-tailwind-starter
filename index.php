<?php get_header(); ?>

<section>
    <h2 class="font-bold text-2xl pb-4">Posts</h2>
    <ul>
        <?php
        foreach (get_posts(['posts_per_page' => 5]) as $post):
            setup_postdata($post);
            ?>
            <li class="list-disc">
                <a class="hover:text-primary underline my-2" href="<?php the_permalink(); ?>">
                    <?php the_title(); ?>
                </a>
            </li>
            <?php
        endforeach;
        wp_reset_postdata();
        ?>
    </ul>
</section>

<?php get_footer(); ?>