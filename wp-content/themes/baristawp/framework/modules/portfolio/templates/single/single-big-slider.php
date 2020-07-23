<div class="edgtf-big-image-holder">
	<?php
	$media = barista_edge_get_portfolio_single_media();

	if(is_array($media) && count($media)) : ?>
		<div class="edgtf-portfolio-media edgtf-slick-slider edgtf-slick-slider-navigation-style">
			<?php foreach($media as $single_media) : ?>
				<div class="edgtf-portfolio-single-media">
					<?php barista_edge_portfolio_get_media_html($single_media); ?>
				</div>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>
</div>

<div class="edgtf-two-columns-66-33 clearfix">
	<?php if(barista_edge_options()->getOptionValue('portfolio_single_hide_title') !== 'yes') : ?>
		<h3 class="edgtf-portfolio-title"><?php the_title(); ?></h3>
	<?php endif; ?>
	<div class="edgtf-column1">
		<div class="edgtf-column-inner">
			<?php barista_edge_portfolio_get_info_part('content'); ?>
		</div>
	</div>
	<div class="edgtf-column2">
		<div class="edgtf-column-inner">
			<div class="edgtf-portfolio-info-holder">
				<?php
				//get portfolio custom fields section
				barista_edge_portfolio_get_info_part('custom-fields');

				//get portfolio date section
				barista_edge_portfolio_get_info_part('date');

				//get portfolio categories section
				barista_edge_portfolio_get_info_part('categories');

				//get portfolio tags section
				barista_edge_portfolio_get_info_part('tags');

				//get portfolio share section
				barista_edge_portfolio_get_info_part('social');
				?>
			</div>
		</div>
	</div>
</div>