<?php
/**
 * Counter shortcode template
 */
?>
<div class="edgtf-counter-holder <?php echo esc_attr($position); ?>" <?php echo barista_edge_get_inline_style($counter_holder_styles); ?>>

	<span class="edgtf-counter <?php echo esc_attr($type) ?>" <?php echo barista_edge_get_inline_style($counter_styles); ?>>
		<?php echo esc_attr($digit); ?>
	</span>
	<?php if($title != '') { ?>
		<span class="edgtf-counter-title" <?php echo barista_edge_get_inline_attrs($title_data); ?> <?php echo barista_edge_get_inline_style($title_styles); ?>>
			<?php echo esc_attr($title); ?>
		</span>
	<?php } ?>
	<?php if ($text != "") { ?>
		<p class="edgtf-counter-text" <?php echo barista_edge_get_inline_style($text_styles); ?>><?php echo esc_html($text); ?></p>
	<?php } ?>

</div>