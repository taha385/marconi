<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<div class="edgtf-post-content">
		<div class="edgtf-post-text">
			<div class="edgtf-post-mark edgtf-quote-mark">
				<span class="fa fa-quote-right"></span>
			</div>
			<div class="edgtf-post-text-inner clearfix">
				<h3 itemprop="name" class="edgtf-post-title entry-title">
					<a itemprop="url" href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>"><?php echo esc_html(get_post_meta(get_the_ID(), "edgtf_post_quote_text_meta", true)); ?></a>
				</h3>
				<span class="edgtf-quote-author">&mdash; <?php the_title(); ?></span>
			</div>
		</div>
		<div class="edgtf-post-info">
			<?php barista_edge_post_info(array('author' => 'yes', 'category' => 'yes', 'date' => 'yes')) ?>
		</div>
		<?php the_content(); ?>
		<?php barista_edge_get_module_template_part('templates/lists/parts/pages-navigation', 'blog');  ?>
		<?php if(has_tag() || barista_edge_get_social_share_html() != '') : ?>
			<div class="edgtf-post-info-bottom">
				<div class="edgtf-post-info-bottom-left">
					<?php has_tag() ? the_tags('', ', ', '') : ''; ?>
				</div>
				<div class="edgtf-post-info-bottom-right">
					<?php barista_edge_post_info(array('share' => 'yes')) ?>
				</div>
			</div>
		<?php endif; ?>
	</div>
</article>