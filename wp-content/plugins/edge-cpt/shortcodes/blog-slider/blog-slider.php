<?php
namespace BaristaEdge\Modules\Shortcodes\BlogSlider;

use BaristaEdge\Modules\Shortcodes\Lib\ShortcodeInterface;
/**
 * Class Blog Slider
 */
class BlogSlider implements ShortcodeInterface {

	/**
	 * @var string
	 */
	private $base;

	public function __construct() {
		$this->base = 'edgtf_blog_slider';

		add_action('vc_before_init', array($this, 'vcMap'));
	}

	/**
	 * Returns base for shortcode
	 * @return string
	 */
	public function getBase() {
		return $this->base;
	}

	/**
	 * Maps shortcode to Visual Composer. Hooked on vc_before_init
	 *
	 * @see edgtf_core_get_carousel_slider_array_vc()
	 */
	public function vcMap() {

		$categories_array = array();

		vc_map( array(
			'name' => esc_html__('Blog Slider', 'edge-cpt'),
			'base' => $this->getBase(),
			'icon'  => 'icon-wpb-blog-slider extended-custom-icon',
			'allowed_container_element' => 'vc_row',
			'params' => array(
                array(
                    'type'			=> 'dropdown',
                    'heading'		=> esc_html__('Slider Type', 'edge-cpt'),
                    'param_name'	=> 'slider_type',
                    'value'			=> array(
                        esc_html__('Carousel', 'edge-cpt')		=> 'carousel',
                        esc_html__('Slider', 'edge-cpt')		=> 'slider',
                    ),
                    'admin_label'	=> true,
                    'description'	=> ''
                ),
				array(
					'type' => 'textfield',
					'heading' => esc_html__('Number of Posts', 'edge-cpt'),
					'param_name' => 'number_of_posts',
					'description' => esc_html__('Leave empty for all posts', 'edge-cpt')
				),
				array(
					'type'			=> 'textfield',
					'heading'		=> esc_html__('Selected Posts', 'edge-cpt'),
					'param_name'	=> 'selected_posts',
					'description'	=> esc_html__('Selected Posts (leave empty for all, delimit by comma)', 'edge-cpt')
				),
				array(
					'type'			=> 'dropdown',
					'heading'		=> esc_html__('Order by', 'edge-cpt'),
					'param_name'	=> 'order_by',
					'value'			=> array(
						esc_html__('Date', 'edge-cpt')		=> 'date',
						esc_html__('Title', 'edge-cpt')		=> 'title'
					),
					'admin_label'	=> true,
					'description'	=> ''
				),
				array(
					'type'			=> 'dropdown',
					'heading'		=> esc_html__('Order', 'edge-cpt'),
					'param_name'	=> 'order',
					'value'			=> array(
						esc_html__('DESC', 'edge-cpt')		=> 'desc',
						esc_html__('ASC', 'edge-cpt')		=> 'asc'
					),
					'admin_label'	=> true,
					'description'	=> ''
				),
				array(
					'type' => 'textfield',
					'heading' => esc_html__('Category Slug', 'edge-cpt'),
					'param_name' => 'category',
					'value' => '',
					'description' => esc_html__('Leave empty for all or use comma for list', 'edge-cpt')
				),
				array(
					'type'			=> 'dropdown',
					'heading'		=> esc_html__('Show Image', 'edge-cpt'),
					'param_name'	=> 'show_image',
					'value'			=> array(
						esc_html__('No', 'edge-cpt')		=> 'no',
						esc_html__('Yes', 'edge-cpt')		=> 'yes',
					),
					'description'	=> '',
					"dependency" => array("element" => "slider_type", "value" => array("carousel"))
				),
				array(
					'type'			=> 'dropdown',
					'heading'		=> esc_html__('Image Size', 'edge-cpt'),
					'param_name'	=> 'image_size',
					'value'			=> array(
						esc_html__('Default', 'edge-cpt')		=> 'default',
						esc_html__('Square', 'edge-cpt')		=> 'square',
					),
					'description'	=> '',
                    "dependency" => array("element" => "show_image", "value" => array("yes"))
				),
                array(
                    'type'			=> 'dropdown',
                    'heading'		=> esc_html__('Image Size', 'edge-cpt'),
                    'param_name'	=> 'image_size_slider',
                    'value'			=> array(
                        esc_html__('Default', 'edge-cpt')		=> 'default',
                        esc_html__('Square', 'edge-cpt')		=> 'square',
                        esc_html__('Custom', 'edge-cpt')		=> 'custom',
                    ),
                    "dependency" => array("element" => "slider_type", "value" => array("slider"))
                ),
				array(
					'type' => 'dropdown',
					'heading' => esc_html__('Title Tag', 'edge-cpt'),
					'param_name' => 'title_tag',
					'value' => array(
						''   => '',
						'h2' => 'h2',
						'h3' => 'h3',
						'h4' => 'h4',
						'h5' => 'h5',
						'h6' => 'h6',
					),
					'description' => ''
				),
                array(
                    "type" => "textfield",
                    "heading" => esc_html__("Image Width", 'edge-cpt'),
                    "param_name" => "image_width",
                    "value" => "",
                    "description" => esc_html__("Set custom image width", 'edge-cpt'),
                    "dependency" => array("element" => "image_size_slider", "value" => array("custom"))
                ),
                array(
                    "type" => "textfield",
                    "heading" => esc_html__("Image Height", 'edge-cpt'),
                    "param_name" => "image_height",
                    "value" => "",
                    "description" => esc_html__("Set custom image height", 'edge-cpt'),
                    "dependency" => array("element" => "image_size_slider", "value" => array("custom"))
                ),
				array(
					'type' => 'textfield',
					'heading' => esc_html__('Text length', 'edge-cpt'),
					'param_name' => 'text_length',
					'description' => esc_html__('Number of characters', 'edge-cpt')
				),
				array(
					'type' => 'colorpicker',
					'heading' => esc_html__('Box Color', 'edge-cpt'),
					'param_name' => 'box_color',
					'description' => '',
					'group' => esc_html__('Design Options', 'edge-cpt')
				)
			)
		) );

	}

	/**
	 * Renders shortcodes HTML
	 *
	 * @param $atts array of shortcode params
	 * @return string
	 */
	public function render($atts, $content = null) {

		$args = array(
			'number_of_posts'	=> -1,
			'order_by'		 	=> 'date',
			'order'				=> 'DESC',
			'category'			=> '',
			'image_size'		=> 'full',
			'image_size_slider'	=> 'full',
			'slider_type'	 	=> 'carousel',
			'show_image'	 	=> 'no',
			'image_height'	 	=> '',
            'image_width'	 	=> '',
            'selected_posts' 	=> '',
            'text_length' 		=> '110',
            'box_color' 		=> '',
			'title_tag'			=> 'h3',
		);

		$params = shortcode_atts($args, $atts);

		extract($params);
		$params['box_style'] = '';
		if(!empty($params['box_color'])){
			$params['box_style'] = 'background-color:'.$params['box_color'];
		}

		if ( $params['title_tag'] == '' ) {
			if ( $params['slider_type'] == 'slider' ) {
				$params['title_tag'] = 'h2';
			} else {
				$params['title_tag'] = 'h4';
			}
		}

		$args = array(
			'post_type'			=> 'post',
			'posts_per_page'	=> $number_of_posts,
			'orderby'			=> $order_by,
			'order'				=> $order
		);
		if($category != ''){
			$args['category_name'] = $category;
		}

		$slider_class = 'edgtf-blog-slider-type-'.$slider_type;
		$post_ids = null;
		
		if($selected_posts != ''){
			$post_ids = explode(',', $selected_posts);
			$args['post__in'] = $post_ids;
		}

        if($slider_type == 'slider'){
           if($image_size_slider == 'custom' && $image_width != '' && $image_height != ''){
                $params['image_size_slider'] = 'custom';
                $params['image_width'] = $image_width;
                $params['image_height'] = $image_height;
            }elseif($image_size_slider == 'square') {
               $params['image_size_slider'] = 'barista_edge_square';
           }
        }elseif($image_size == 'square') {
            $params['image_size'] = 'barista_edge_square';
        }

		if($slider_type == 'carousel'){
			$params['classes'] = array('edgtf-blog-slide-info-holder');
			if($params['show_image'] == 'no')
			$params['classes'][] = 'edgtf-without-image';
		}

		$query = new \WP_Query($args);

		if ( $query->have_posts() ) {

			$html = '';

			$html .= '<div class="edgtf-blog-slider-outer">';
			

			$html .= '<div class="edgtf-blog-slider edgtf-slick-slider-navigation-style '. $slider_class .'" data-type="'.$slider_type.'">';

			while ( $query->have_posts() ) {

				$query->the_post();

				//Get slide HTML from template
				$html .= edge_core_get_shortcode_template_part('templates/blog-'.$slider_type, 'blog-slider', '', $params);

			}

			$html .= '</div></div>';


		} else {

			$html = esc_html__('There is no posts!', 'edge-cpt');

		}

		wp_reset_postdata();

		return $html;

	}
}