<?php
/*
Plugin Name: Edge CPT
Description: Plugin that adds all post types needed by our theme
Author: Edge Themes
Version: 1.3
*/

require_once 'load.php';

use EdgeCore\CPT;
use EdgeCore\Lib;

add_action( 'after_setup_theme', array( CPT\PostTypesRegister::getInstance(), 'register' ) );

Lib\ShortcodeLoader::getInstance()->load();

if ( ! function_exists( 'edgt_core_activation' ) ) {
	/**
	 * Triggers when plugin is activated. It calls flush_rewrite_rules
	 * and defines barista_edge_core_on_activate action
	 */
	function edgt_core_activation() {
		do_action( 'barista_edge_core_on_activate' );

		EdgeCore\CPT\PostTypesRegister::getInstance()->register();
		flush_rewrite_rules();
	}

	register_activation_hook( __FILE__, 'edgt_core_activation' );
}

if ( ! function_exists( 'edgt_core_text_domain' ) ) {
	/**
	 * Loads plugin text domain so it can be used in translation
	 */
	function edgt_core_text_domain() {
		load_plugin_textdomain( 'edge-cpt', false, EDGE_CORE_REL_PATH . '/languages' );
	}

	add_action( 'plugins_loaded', 'edgt_core_text_domain' );
}

if ( ! function_exists( 'edgt_core_themename_theme_menu' ) ) {
	/**
	 * Function that generates admin menu for options page.
	 * It generates one admin page per options page.
	 */
	function edgt_core_themename_theme_menu() {
		if ( edgt_core_theme_installed() ) {

			global $barista_edge_Framework;
			barista_edge_init_theme_options();

			$page_hook_suffix = add_menu_page(
				esc_html__( 'Edge Options', 'edge-cpt' ),                   // The value used to populate the browser's title bar when the menu page is active
				esc_html__( 'Edge Options', 'edge-cpt' ),                   // The text of the menu in the administrator's sidebar
				'administrator',                  // What roles are able to access the menu
				'barista_edge_theme_menu',                // The ID used to bind submenu items to this menu
				array(
					$barista_edge_Framework->getSkin(),
					'renderOptions'
				), // The callback function used to render this menu
				$barista_edge_Framework->getSkin()->getMenuIcon( 'options' ),             // Icon For menu Item
				$barista_edge_Framework->getSkin()->getMenuItemPosition( 'options' )            // Position
			);

			foreach ( $barista_edge_Framework->edgtOptions->adminPages as $key => $value ) {
				$slug = "";

				if ( ! empty( $value->slug ) ) {
					$slug = "_tab" . $value->slug;
				}

				$subpage_hook_suffix = add_submenu_page(
					'barista_edge_theme_menu',
					'Edge Options - ' . $value->title,                   // The value used to populate the browser's title bar when the menu page is active
					$value->title,                   // The text of the menu in the administrator's sidebar
					'administrator',                  // What roles are able to access the menu
					'barista_edge_theme_menu' . $slug,                // The ID used to bind submenu items to this menu
					array( $barista_edge_Framework->getSkin(), 'renderOptions' )
				);

				add_action( 'admin_print_scripts-' . $subpage_hook_suffix, 'barista_edge_enqueue_admin_scripts' );
				add_action( 'admin_print_styles-' . $subpage_hook_suffix, 'barista_edge_enqueue_admin_styles' );
			};

			add_action( 'admin_print_scripts-' . $page_hook_suffix, 'barista_edge_enqueue_admin_scripts' );
			add_action( 'admin_print_styles-' . $page_hook_suffix, 'barista_edge_enqueue_admin_styles' );

		}
	}

	add_action( 'admin_menu', 'edgt_core_themename_theme_menu' );
}

if ( ! function_exists( 'edgt_core_themename_theme_setup' ) ) {
	function edgt_core_themename_theme_setup() {

		add_filter( 'widget_text', 'do_shortcode' );
	}

	add_action( 'after_setup_theme', 'edgt_core_themename_theme_setup' );
}