<?php 
$tab_data_str = '';
$icon_html = '';
$tab_data_str .= 'data-icon-pack="'.$icon_pack.'" ';
$icon_html .=  barista_edge_icon_collections()->renderIcon($icon, $icon_pack,array());
$tab_data_str .= 'data-icon-html="'. esc_attr($icon_html) .'"';
?>
<div class="edgtf-tab-container" id="tab-<?php echo sanitize_title($title); ?>" <?php print esc_attr($tab_data_str)?>><?php echo do_shortcode($content); ?></div>