<div class="edgtf-image-gallery-masonry">
	<div class="edgtf-image-masonry-grid-sizer"></div>
	<?php foreach ($images as $image) { ?>
		<div class="edgtf-gallery-image <?php echo esc_attr($image['class']);?>">
			<div class="edgtf-gallery-image-inner">
				<?php if ($pretty_photo) { ?>
				<a href="<?php echo esc_url($image['url'])?>" data-rel="prettyPhoto[single_pretty_photo]" title="<?php echo esc_attr($image['title']); ?>">
					<?php } ?>
						<?php echo wp_get_attachment_image($image['image_id'],$image['masonry_size']); ?>
					<?php if ($pretty_photo) { ?>
				</a>
			<?php } ?>
			</div>
		</div>
	<?php } ?>
</div>