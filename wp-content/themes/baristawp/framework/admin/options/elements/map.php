<?php

if ( ! function_exists('barista_edge_load_elements_map') ) {
	/**
	 * Add Elements option page for shortcodes
	 */
	function barista_edge_load_elements_map() {

		barista_edge_add_admin_page(
			array(
				'slug' => '_elements_page',
				'title' => esc_html__('Elements', 'baristawp'),
				'icon' => 'fa fa-header'
			)
		);

		do_action( 'barista_edge_options_elements_map' );

	}

	add_action('barista_edge_options_map', 'barista_edge_load_elements_map', 11);

}