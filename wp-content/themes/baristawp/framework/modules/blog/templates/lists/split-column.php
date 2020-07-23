<div class="edgtf-blog-holder edgtf-blog-type-split-column <?php echo esc_attr($blog_classes)?>"   data-blog-type="<?php echo esc_attr($blog_type)?>" <?php echo esc_attr(barista_edge_set_blog_holder_data_params()); ?> >
	<?php
		if($blog_query->have_posts()) : while ( $blog_query->have_posts() ) : $blog_query->the_post();
			barista_edge_get_post_format_html($blog_type);
		endwhile;
		else:
			barista_edge_get_module_template_part('templates/parts/no-posts', 'blog');
		endif;
	?>
</div>
