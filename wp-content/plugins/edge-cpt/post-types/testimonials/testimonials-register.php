<?php
namespace EdgeCore\CPT\Testimonials;

use EdgeCore\Lib;


/**
 * Class TestimonialsRegister
 * @package EdgeCore\CPT\Testimonials
 */
class TestimonialsRegister implements Lib\PostTypeInterface {
    /**
     * @var string
     */
    private $base;

    public function __construct() {
        $this->base = 'testimonials';
        $this->taxBase = 'testimonials_category';
    }

    /**
     * @return string
     */
    public function getBase() {
        return $this->base;
    }

    /**
     * Registers custom post type with WordPress
     */
    public function register() {
        $this->registerPostType();
        $this->registerTax();
    }

    /**
     * Regsiters custom post type with WordPress
     */
    private function registerPostType() {
        global $barista_edge_Framework;

        $menuPosition = 5;
        $menuIcon = 'dashicons-admin-post';

        if(edgt_core_theme_installed()) {
            $menuPosition = $barista_edge_Framework->getSkin()->getMenuItemPosition('testimonial');
            $menuIcon = $barista_edge_Framework->getSkin()->getMenuIcon('testimonial');
        }

        register_post_type('testimonials',
            array(
                'labels' 		=> array(
                    'name' 				=> __('Testimonials','edge-cpt' ),
                    'singular_name' 	=> __('Testimonial','edge-cpt' ),
                    'add_item'			=> __('New Testimonial','edge-cpt'),
                    'add_new_item' 		=> __('Add New Testimonial','edge-cpt'),
                    'edit_item' 		=> __('Edit Testimonial','edge-cpt')
                ),
                'public'		=>	false,
                'show_in_menu'	=>	true,
                'rewrite' 		=> 	array('slug' => 'testimonials'),
                'menu_position' => 	$menuPosition,
                'show_ui'		=>	true,
                'has_archive'	=>	false,
                'hierarchical'	=>	false,
                'supports'		=>	array('title', 'thumbnail'),
                'menu_icon'  =>  $menuIcon
            )
        );
    }

    /**
     * Registers custom taxonomy with WordPress
     */
    private function registerTax() {
        $labels = array(
            'name' => __( 'Testimonials Categories', 'edge-cpt' ),
            'singular_name' => __( 'Testimonial Category', 'edge-cpt' ),
            'search_items' =>  __( 'Search Testimonials Categories','edge-cpt' ),
            'all_items' => __( 'All Testimonials Categories','edge-cpt' ),
            'parent_item' => __( 'Parent Testimonial Category','edge-cpt' ),
            'parent_item_colon' => __( 'Parent Testimonial Category:','edge-cpt' ),
            'edit_item' => __( 'Edit Testimonials Category','edge-cpt' ),
            'update_item' => __( 'Update Testimonials Category','edge-cpt' ),
            'add_new_item' => __( 'Add New Testimonials Category','edge-cpt' ),
            'new_item_name' => __( 'New Testimonials Category Name','edge-cpt' ),
            'menu_name' => __( 'Testimonials Categories','edge-cpt' ),
        );

        register_taxonomy($this->taxBase, array($this->base), array(
            'hierarchical' => true,
            'labels' => $labels,
            'show_ui' => true,
            'query_var' => true,
            'show_admin_column' => true,
            'rewrite' => array( 'slug' => 'testimonials-category' ),
        ));
    }

}