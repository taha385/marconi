<article class="edgtf-portfolio-item <?php echo esc_attr($article_masonry_size)?> <?php echo esc_attr($categories)?>">
	<?php if ($appear_effect != 'none') { ?>
		<div class="edgtf-ptf-inner">
	<?php } ?>
		<a class ="edgtf-portfolio-link" href="<?php echo esc_url($item_link); ?>"></a>
		<div class = "edgtf-item-image-holder">
		<?php
			echo get_the_post_thumbnail(get_the_ID(),$thumb_size);
		?>				
		</div>
		<div class="edgtf-item-text-overlay">
			<div class="edgtf-item-text-overlay-inner">
				<div class="edgtf-item-text-holder">
					<<?php echo esc_attr($title_tag)?> class="edgtf-item-title">
					<span class="edgtf-item-title-inner"><?php echo esc_attr(get_the_title()); ?></span>
					</<?php echo esc_attr($title_tag)?>>	
					<?php
					print barista_edge_get_module_part($category_html);
					print barista_edge_get_module_part($icon_html);
					?>
				</div>
			</div>	
		</div>
	<?php if ($appear_effect != 'none') { ?>
		</div>
	<?php } ?>
</article>
