<div class="edgtf-testimonials <?php echo esc_attr($current_id) ?> edgtf-testimonial-content">
	<?php if (has_post_thumbnail($current_id) && $show_image != 'no') { ?>
		<div class="edgtf-testimonial-image-holder">
			<?php esc_html(the_post_thumbnail($current_id)) ?>
		</div>
	<?php } ?>
	<div class="edgtf-testimonial-content-inner">
		<div class="edgtf-testimonial-text-holder">
			<div class="edgtf-testimonial-text-inner">
				<?php if($show_title == "yes" && $title != ''){ ?>
					<h3 class="edgtf-testimonial-title" <?php if($title_color !== '') echo barista_edge_get_inline_style($title_color); ?>>
						<?php echo esc_attr($title) ?>
					</h3>
				<?php }?>
				<p class="edgtf-testimonial-text" <?php if($text_color !== '') echo barista_edge_get_inline_style($text_color); ?>><?php echo trim($text) ?></p>
				<?php if ($show_author == "yes") { ?>
					<div class = "edgtf-testimonial-author">
						<span class="edgtf-testimonial-author-text" <?php if($author_color !== '') echo barista_edge_get_inline_style($author_color); ?>><?php echo esc_attr($author)?>
							<?php if($show_position == "yes" && $job !== ''){ ?>
								<span class="edgtf-testimonials-job"> - <?php echo esc_attr($job)?></span>
							<?php }?>
						</span>
					</div>
				<?php } ?>				
			</div>
		</div>
	</div>	
</div>
