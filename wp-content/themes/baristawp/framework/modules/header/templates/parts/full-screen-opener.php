<?php
$icon_size              = '';

if(barista_edge_options()->getOptionValue('fullscreen_menu_icon_size') !== '') {
	$icon_size = barista_edge_options()->getOptionValue('fullscreen_menu_icon_size');
}

?>

<?php do_action('barista_edge_before_top_navigation'); ?>
<a href="javascript:void(0)" class="edgtf-fullscreen-menu-opener <?php echo esc_attr($icon_size) ?>">
	<span class="edgtf-fullscreen-menu-opener-inner">
		<i class="edgtf-line">&nbsp;</i>
	</span>
</a>
<?php do_action('barista_edge_after_top_navigation'); ?>
