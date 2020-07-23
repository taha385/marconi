<?php
/*
Plugin Name: Edge Instagram Feed
Description: Plugin that adds Instagram feed functionality to our theme
Author: Edge Themes
Version: 1.0.2
*/

define( 'EDGEF_INSTAGRAM_FEED_VERSION', '1.0.2' );
define( 'EDGEF_INSTAGRAM_ABS_PATH', dirname( __FILE__ ) );
define( 'EDGEF_INSTAGRAM_REL_PATH', dirname( plugin_basename( __FILE__ ) ) );

include_once 'load.php';

if ( ! function_exists( 'edge_instagram_feed_text_domain' ) ) {
	/**
	 * Loads plugin text domain so it can be used in translation
	 */
	function edge_instagram_feed_text_domain() {
		load_plugin_textdomain( 'edge-instagram-feed', false, EDGEF_INSTAGRAM_REL_PATH . '/languages' );
	}

	add_action( 'plugins_loaded', 'edge_instagram_feed_text_domain' );
}