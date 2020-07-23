<a itemprop="url" href="<?php echo esc_url($link); ?>" target="<?php echo esc_attr($target); ?>" <?php barista_edge_inline_style($button_styles); ?> <?php barista_edge_class_attribute($button_classes); ?> <?php echo barista_edge_get_inline_attrs($button_data); ?> <?php echo barista_edge_get_inline_attrs($button_custom_attrs); ?>>
	<span class="edgtf-btn-text"><?php echo esc_html($text); ?></span>
    <?php echo barista_edge_icon_collections()->renderIcon($icon, $icon_pack); ?>
</a>