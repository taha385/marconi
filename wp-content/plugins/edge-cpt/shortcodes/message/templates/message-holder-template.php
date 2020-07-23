<div class="edgtf-message  <?php echo esc_attr($message_classes)?>" <?php echo barista_edge_get_inline_style($message_styles); ?>>
	<div class="edgtf-message-inner">
		<?php		
		if($type == 'with_icon'){
			$icon_html = edge_core_get_shortcode_template_part('templates/' . $type, 'message', '', $params);
			print barista_edge_get_module_part($icon_html);
		}
		?>
		<a href="#" class="edgtf-close"><i class="edgtf-font-elegant-icon icon_close" <?php barista_edge_inline_style($close_icon_style); ?>></i></a>
		<div class="edgtf-message-text-holder">
			<div class="edgtf-message-text">
				<div class="edgtf-message-text-inner"><?php echo do_shortcode($content); ?></div>
			</div>
		</div>
	</div>
</div>