<?php
namespace EdgeCore\CPT\Portfolio\Shortcodes;

use EdgeCore\Lib;

/**
 * Class PortfolioList
 * @package EdgeCore\CPT\Portfolio\Shortcodes
 */
class PortfolioList implements Lib\ShortcodeInterface {
    /**
     * @var string
     */
    private $base;

    public function __construct() {
        $this->base = 'edgtf_portfolio_list';

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
     * Maps shortcode to Visual Composer
     *
     * @see vc_map
     */
    public function vcMap() {
        if(function_exists('vc_map')) {

            $icons_array= array();
            if(edgt_core_theme_installed()) {
                $icons_array = \BaristaEdgeIconCollections::get_instance()->getVCParamsArray();
            }

            vc_map( array(
                'name' => esc_html__('Portfolio List', 'edge-cpt'),
                'base' => $this->getBase(),
                'category' => esc_html__('by EDGE', 'edge-cpt'),
                'icon' => 'icon-wpb-portfolio extended-custom-icon',
                'allowed_container_element' => 'vc_row',
                'params' => array(
						array(
							'type' => 'dropdown',								
							'heading' => esc_html__('Portfolio List Template', 'edge-cpt'),
							'param_name' => 'type',
							'value' => array(
								esc_html__('Standard', 'edge-cpt') => 'standard',
								esc_html__('Gallery', 'edge-cpt') => 'gallery',
								esc_html__('Gallery With Space', 'edge-cpt') => 'gallery-with-space',
								esc_html__('Masonry', 'edge-cpt') => 'masonry',
								esc_html__('Masonry With Space', 'edge-cpt') => 'masonry-with-space',
								esc_html__('Pinterest', 'edge-cpt') => 'pinterest',
								esc_html__('Pinterest With Space', 'edge-cpt') => 'pinterest-with-space'
							),
							'admin_label' => true,
							'description' => ''
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
							'admin_label' => true,
							'description' => ''
						),
						array(
							'type' => 'dropdown',
							'heading' => esc_html__('Image Proportions', 'edge-cpt'),
							'param_name' => 'image_size',
							'value' => array(
								esc_html__('Original', 'edge-cpt') => 'full',
								esc_html__('Square', 'edge-cpt') => 'square',
								esc_html__('Landscape', 'edge-cpt') => 'landscape',
								esc_html__('Portrait', 'edge-cpt') => 'portrait'
							),
							'save_always' => true,
							'admin_label' => true,
							'description' => '',
							'dependency' => array('element' => 'type', 'value' => array('standard', 'gallery','gallery-with-space'))
						),
						array(
							'type' => 'dropdown',
							'heading' => esc_html__('Show Load More', 'edge-cpt'),
							'param_name' => 'show_load_more',
							'value' => array(
								esc_html__('Yes', 'edge-cpt') => 'yes',
								esc_html__('No', 'edge-cpt') => 'no'
							),
							'save_always' => true,
							'admin_label' => true,
							'description' => esc_html__('Default value is Yes', 'edge-cpt')
						),
		                array(
			                'type' => 'dropdown',
			                'heading' => esc_html__('Animation Type', 'edge-cpt'),
			                'param_name' => 'animation_type',
			                'value' => array(
								esc_html__('Overlay', 'edge-cpt') => 'edgtf-standard',
				                esc_html__('Overlay - Light', 'edge-cpt') => 'edgtf-light',
				                esc_html__('Overlay - Dark', 'edge-cpt') => 'edgtf-dark',
				                esc_html__('Follow', 'edge-cpt') => 'edgtf-follow'
			                ),
			                'dependency' => array('element' => 'type', 'value' => array('masonry','masonry-with-space','gallery','gallery-with-space','pinterest','pinterest-with-space')),
		                ),
		                array(
			                'type' => 'dropdown',
			                'heading' => esc_html__('Appear Effect', 'edge-cpt'),
			                'param_name' => 'appear_effect',
			                'value' => array(
								esc_html__('None', 'edge-cpt') => 'none',
				                esc_html__('Fade In and Scale Up', 'edge-cpt') => 'fade-scale',
			                ),
							'dependency' => array('element' => 'type', 'value' => array('masonry','masonry-with-space','pinterest','pinterest-with-space'))
		                ),
						array(
							'type' => 'dropdown',
							'heading' => esc_html__('Order By', 'edge-cpt'),
							'param_name' => 'order_by',
							'value' => array(
								esc_html__('Menu Order', 'edge-cpt') => 'menu_order',
								esc_html__('Title', 'edge-cpt') => 'title',
								esc_html__('Date', 'edge-cpt') => 'date'
							),
							'admin_label' => true,
							'save_always' => true,
							'description' => '',
							'group' => esc_html__('Query and Layout Options', 'edge-cpt')
						),
						array(
							'type' => 'dropdown',
							'heading' => esc_html__('Order', 'edge-cpt'),
							'param_name' => 'order',
							'value' => array(
								'ASC' => 'ASC',
								'DESC' => 'DESC',
							),
							'admin_label' => true,
							'save_always' => true,
							'description' => '',
							'group' => esc_html__('Query and Layout Options', 'edge-cpt')
						),
						array(
							'type' => 'textfield',
							'heading' => esc_html__('One-Category Portfolio List', 'edge-cpt'),
							'param_name' => 'category',
							'value' => '',
							'admin_label' => true,
							'description' => esc_html__('Enter one category slug (leave empty for showing all categories)', 'edge-cpt'),
							'group' => esc_html__('Query and Layout Options', 'edge-cpt')
						),
						 array(
							'type' => 'textfield',
							'heading' => esc_html__('Number of Portfolios Per Page', 'edge-cpt'),
							'param_name' => 'number',
							'value' => '-1',
							'admin_label' => true,
							'description' => esc_html__('(enter -1 to show all)', 'edge-cpt'),
							'group' => esc_html__('Query and Layout Options', 'edge-cpt')
						),
						array(
							'type' => 'dropdown',
							'heading' => esc_html__('Number of Columns', 'edge-cpt'),
							'param_name' => 'columns',
							'value' => array(
								'' => '',
								esc_html__('One', 'edge-cpt') => '1',
								esc_html__('Two', 'edge-cpt') => '2',
								esc_html__('Three', 'edge-cpt') => '3',
								esc_html__('Four', 'edge-cpt') => '4',
								esc_html__('Five', 'edge-cpt') => '5',
								esc_html__('Six', 'edge-cpt') => '6'
							),
							'admin_label' => true,
							'description' => esc_html__('Default value is Three', 'edge-cpt'),
							'dependency' => array('element' => 'type', 'value' => array('standard','gallery','gallery-with-space')),
							'group' => esc_html__('Query and Layout Options', 'edge-cpt')
						),
						array(
							'type' => 'dropdown',
							'heading' => esc_html__('Grid Size', 'edge-cpt'),
							'param_name' => 'grid_size',								
							'value' => array(
								esc_html__('Default', 'edge-cpt') => '',
								esc_html__('3 Columns Grid', 'edge-cpt') => 'three',
								esc_html__('4 Columns Grid', 'edge-cpt') => 'four',
								esc_html__('5 Columns Grid', 'edge-cpt') => 'five'
							),
							'admin_label' => true,
							'description' => esc_html__('This option is only for Full Width Page Template', 'edge-cpt'),
							'dependency' => array('element' => 'type', 'value' => array('pinterest','pinterest-with-space')),
							'group' => esc_html__('Query and Layout Options', 'edge-cpt')
						),
						array(
							'type' => 'textfield',
							'heading' => esc_html__('Show Only Projects with Listed IDs', 'edge-cpt'),
							'param_name' => 'selected_projects',
							'value' => '',
							'admin_label' => true,
							'description' => esc_html__('Delimit ID numbers by comma (leave empty for all)', 'edge-cpt'),
							'group' => esc_html__('Query and Layout Options', 'edge-cpt')
						),
						array(
							'type' => 'dropdown',
							'heading' => esc_html__('Enable Category Filter', 'edge-cpt'),
							'param_name' => 'filter',
							'value' => array(
								esc_html__('No', 'edge-cpt') => 'no',
								esc_html__('Yes', 'edge-cpt') => 'yes'                               
							),
							'admin_label' => true,
							'save_always' => true,
							'description' => esc_html__('Default value is No', 'edge-cpt'),
							'group' => esc_html__('Query and Layout Options', 'edge-cpt')
						),
						array(
							'type' => 'dropdown',
							'heading' => esc_html__('Filter Order By', 'edge-cpt'),
							'param_name' => 'filter_order_by',
							'value' => array(
								esc_html__('Name', 'edge-cpt')  => 'name',
								esc_html__('Count', 'edge-cpt') => 'count',
								esc_html__('Id', 'edge-cpt')    => 'id',
								esc_html__('Slug', 'edge-cpt')  => 'slug'
							),
							'admin_label' => true,
							'save_always' => true,
							'description' => esc_html__('Default value is Name', 'edge-cpt'),
							'dependency' => array('element' => 'filter', 'value' => array('yes')),
							'group' => esc_html__('Query and Layout Options', 'edge-cpt')
						)
						)
				)
			);
        }
    }

    /**
     * Renders shortcodes HTML
     *
     * @param $atts array of shortcode params
     * @param $content string shortcode content
     * @return string
     */
    public function render($atts, $content = null) {
        
        $args = array(
            'type' => 'standard',
            'columns' => '3',
            'grid_size' => 'three',
            'image_size' => 'full',
            'order_by' => 'date',
            'order' => 'ASC',
            'number' => '-1',
            'filter' => 'no',
            'filter_order_by' => 'name',
            'category' => '',
            'selected_projects' => '',
            'show_load_more' => 'yes',
            'title_tag' => 'h4',
			'next_page' => '',
			'portfolio_slider' => '',
			'portfolios_shown' => '',
	        'animation_type'   => 'edgtf-standard',
	        'appear_effect'	=> 'none'
        );

		$params = shortcode_atts($args, $atts);
		extract($params);
		
		$query_array = $this->getQueryArray($params);
		$query_results = new \WP_Query($query_array);		
		$params['query_results'] = $query_results;
		
		$classes = $this->getPortfolioClasses($params);
		$data_atts = $this->getDataAtts($params);
		$data_atts .= 'data-max-num-pages = '.$query_results->max_num_pages;
		$params['masonry_filter'] = '';
		
		$html = '';
		
		if($filter == 'yes' && ($type == 'masonry' || $type =='masonry-with-space' || $type =='pinterest' || $type =='pinterest-with-space')){
			$params['filter_categories'] = $this->getFilterCategories($params);	
			$params['masonry_filter'] = 'edgtf-masonry-filter';
			$html .= edgt_core_get_shortcode_module_template_part('portfolio','portfolio-filter', '', $params);
		}
		
		$html .= '<div class = "edgtf-portfolio-list-holder-outer '.$classes.'" '.$data_atts. '>';
		
		if($filter == 'yes' && ($type == 'standard' || $type =='gallery' || $type =='gallery-with-space')){
			$params['filter_categories'] = $this->getFilterCategories($params);	
			$html .= edgt_core_get_shortcode_module_template_part('portfolio','portfolio-filter', '', $params);
		}
		
		$html .= '<div class = "edgtf-portfolio-list-holder clearfix" >';
		if($type == 'masonry' || $type =='masonry-with-space' || $type == 'pinterest' || $type == 'pinterest-with-space'){
			$html .= '<div class="edgtf-portfolio-list-masonry-grid-sizer"></div>';
			$html .= '<div class="edgtf-portfolio-list-masonry-grid-gutter"></div>';
		}
		
		if($query_results->have_posts()):			
			while ( $query_results->have_posts() ) : $query_results->the_post(); 
			
				$params['current_id'] = get_the_ID();
				$params['thumb_size'] = $this->getImageSize($params);
				$params['icon_html'] = $this->getPortfolioIconsHtml($params);
				$params['category_html'] = $this->getItemCategoriesHtml($params);
				$params['categories'] = $this->getItemCategories($params);
				$params['article_masonry_size'] = $this->getMasonrySize($params);
                $params['item_link'] = $this->getItemLink($params);
				
				$html .= edgt_core_get_shortcode_module_template_part('portfolio',$type,'',$params);
				
			endwhile;
		else: 
			
			$html .= '<p>'. esc_html__( 'Sorry, no posts matched your criteria.', 'edge-cpt' ) .'</p>';
		
		endif;
	    if($type =='gallery-with-space' || $type == 'standard'){
		    for($i=0;$i<(int)$columns;$i++){
		        $html .= "<div class='edgtf-portfolio-gap'></div>";
			    $html .= "\n";
		    }
	    }
		$html .= '</div>'; //close edgtf-portfolio-list-holder
		if($show_load_more == 'yes' && empty($params['portfolio_slider'])){
			$html .= edgt_core_get_shortcode_module_template_part('portfolio','load-more-template','',$params);
		}
		wp_reset_postdata();
		$html .= '</div>'; // close edgtf-portfolio-list-holder-outer
        return $html;
	}
	
	/**
    * Generates portfolio list query attribute array
    *
    * @param $params
    *
    * @return array
    */
	public function getQueryArray($params){
		
		$query_array = array();
		
		$query_array = array(
			'post_type' => 'portfolio-item',
			'orderby' =>$params['order_by'],
			'order' => $params['order'],
			'posts_per_page' => $params['number']
		);
		
		if(!empty($params['category'])){
			$query_array['portfolio-category'] = $params['category'];
		}
		
		$project_ids = null;
		if (!empty($params['selected_projects'])) {
			$project_ids = explode(',', $params['selected_projects']);
			$query_array['post__in'] = $project_ids;
		}
		
		$paged = '';
		if(empty($params['next_page'])) {
            if(get_query_var('paged')) {
                $paged = get_query_var('paged');
            } elseif(get_query_var('page')) {
                $paged = get_query_var('page');
            }
        }
		
		if(!empty($params['next_page'])){
			$query_array['paged'] = $params['next_page'];
			
		}else{
			$query_array['paged'] = 1;
		}
		
		return $query_array;
	}
	
	/**
    * Generates portfolio icons html
    *
    * @param $params
    *
    * @return html
    */
	public function getPortfolioIconsHtml($params){
		
		$html ='';
		//$id = $params['current_id'];
		//$slug_list_ = 'pretty_photo_gallery';
		
		//$featured_image_array = wp_get_attachment_image_src(get_post_thumbnail_id($id), 'full'); //original size
		//$large_image = $featured_image_array[0];
				
		//$html .= '<div class="edgtf-item-separator-holder">';
		
		//$html .= '<a class="edgtf-portfolio-lightbox" title="' . get_the_title($id) . '" href="' . $large_image . '" data-rel="prettyPhoto[' . $slug_list_ . ']"></a>';
		
		
		//if (function_exists('barista_edge_get_separator_html')) {
			//$html .= barista_edge_get_separator_html();
		//}
		
		//$html .= '<a class="edgtf-preview" title="Go to Project" href="' . $this->getItemLink($params) . '" data-type="portfolio_list"></a>';
		
		//$html .= '</div>';
		
		return $html;
        
	}

	/**
    * Generates portfolio classes
    *
    * @param $params
    *
    * @return string
    */
	public function getPortfolioClasses($params){
		$classes = array();
		$type = $params['type'];
		$columns = $params['columns'];
		$grid_size = $params['grid_size'];
		switch($type):
			case 'standard':
				$classes[] = 'edgtf-ptf-standard';
			break;
			case 'gallery':
				$classes[] = 'edgtf-ptf-gallery';
				$classes[] = $params['animation_type'];
			break;
			case 'gallery-with-space':
				$classes[] = 'edgtf-ptf-gallery-with-space';
				$classes[] = $params['animation_type'];
				break;
			case 'masonry':
				$classes[] = 'edgtf-ptf-masonry';
				$classes[] = $params['animation_type'];
				$classes[] = 'edgtf-appear-'.$params['appear_effect'];
			break;
			case 'masonry-with-space':
				$classes[] = 'edgtf-ptf-masonry-with-space';
				$classes[] = $params['animation_type'];
				$classes[] = 'edgtf-appear-'.$params['appear_effect'];
				break;
			case 'pinterest':
				$classes[] = 'edgtf-ptf-pinterest';
				$classes[] = $params['animation_type'];
				$classes[] = 'edgtf-appear-'.$params['appear_effect'];
			break;
			case 'pinterest-with-space':
				$classes[] = 'edgtf-ptf-pinterest-with-space';
				$classes[] = $params['animation_type'];
				$classes[] = 'edgtf-appear-'.$params['appear_effect'];
			break;
		endswitch;
		
		if(empty($params['portfolio_slider'])){ // portfolio slider mustn't have this classes
			
			if($type == 'standard' || $type == 'gallery' || $type == 'gallery-with-space' ){
				switch ($columns):
					case '1':
						$classes[] = 'edgtf-ptf-one-column';
					break;
					case '2':
						$classes[] = 'edgtf-ptf-two-columns';
					break;
					case '3':
						$classes[] = 'edgtf-ptf-three-columns';
					break;
					case '4':
						$classes[] = 'edgtf-ptf-four-columns';
					break;
					case '5':
						$classes[] = 'edgtf-ptf-five-columns';
					break;
					case '6':
						$classes[] = 'edgtf-ptf-six-columns';
					break;
				endswitch;
			}
			if($params['show_load_more']== 'yes'){ 
				$classes[] = 'edgtf-ptf-load-more';
			}
		}
		
		if($type == "pinterest" || $type=='pinterest-with-space'){
			switch ($grid_size):
				case 'three': 
					$classes[] = 'edgtf-ptf-pinterest-three-columns';
				break;
				case 'four': 
					$classes[] = 'edgtf-ptf-pinterest-four-columns';
				break;
				case 'five': 
					$classes[] = 'edgtf-ptf-pinterest-five-columns';
				break;
			endswitch;
		}
		if($params['filter'] == 'yes'){
			$classes[] = 'edgtf-ptf-has-filter';
			if($params['type'] == 'masonry' || $params['type'] == 'masonry-with-space' || $params['type'] == 'pinterest' || $params['type'] == 'pinterest-with-space'){
				if($params['filter'] == 'yes'){
					$classes[] = 'edgtf-ptf-masonry-filter';
				}
			}
		}
		
		if(!empty($params['portfolio_slider']) && $params['portfolio_slider'] == 'yes'){
			$classes[] = 'edgtf-portfolio-slider-holder';
		}
		
		return implode(' ',$classes);
        
	}
	/**
    * Generates portfolio image size
    *
    * @param $params
    *
    * @return string
    */
	public function getImageSize($params){
		
		$thumb_size = 'full';
		$type = $params['type'];
		
		if($type == 'standard' || $type == 'gallery' || $type == 'gallery-with-space'){
			if(!empty($params['image_size'])){
				$image_size = $params['image_size'];

				switch ($image_size) {
					case 'landscape':
						$thumb_size = 'barista_edge_landscape';
						break;
					case 'portrait':
						$thumb_size = 'barista_edge_portrait';
						break;
					case 'square':
						$thumb_size = 'barista_edge_square';
						break;
					case 'full':
						$thumb_size = 'full';
						break;
				}
			}
		}
		elseif($type == 'masonry' || $type == 'masonry-with-space'){
			
			$id = $params['current_id'];
			$masonry_size = get_post_meta($id, 'portfolio_masonry_dimenisions',true);
			
			switch($masonry_size):
				default :
					$thumb_size = 'barista_edge_square';
				break;
				case 'large_width' : 
					$thumb_size = 'barista_edge_large_width';
				break;
				case 'large_height' : 
					$thumb_size = 'barista_edge_large_height';
				break;
				case 'large_width_height' : 
					$thumb_size = 'barista_edge_large_width_height';
				break;
			endswitch;
		}
		
		
		return $thumb_size;
	}
	/**
    * Generates portfolio item categories ids.This function is used for filtering
    *
    * @param $params
    *
    * @return array
    */
	public function getItemCategories($params){
		$id = $params['current_id'];
		$category_return_array = array();
		
		$categories = wp_get_post_terms($id, 'portfolio-category');
		
		foreach($categories as $cat){
			$category_return_array[] = 'portfolio_category_'.$cat->term_id;
		}
		return implode(' ', $category_return_array);
	}
	/**
    * Generates portfolio item categories html based on id
    *
    * @param $params
    *
    * @return html
    */
	public function getItemCategoriesHtml($params){
		$id = $params['current_id'];
		
		$categories = wp_get_post_terms($id, 'portfolio-category');
		$category_html = '<div class="edgtf-ptf-category-holder">';
		$k = 1;
		foreach ($categories as $cat) {
			$category_html .= '<span>'.$cat->name.'</span>';
			if (count($categories) != $k) {
				$category_html .= ' / ';
			}
			$k++;
		}
		$category_html .= '</div>'; 
		return $category_html;
	}
	/**
    * Generates masonry size class for each article( based on id)
    *
    * @param $params
    *
    * @return string
    */
	public function getMasonrySize($params){
		$masonry_size_class = '';
		
		if($params['type'] == 'masonry' || $params['type'] == 'masonry-with-space'){
			
			$id = $params['current_id'];
			$masonry_size = get_post_meta($id, 'portfolio_masonry_dimenisions',true);
			switch($masonry_size):
				default :
					$masonry_size_class = 'edgtf-default-masonry-item';
				break;
				case 'large_width' : 
					$masonry_size_class = 'edgtf-large-width-masonry-item';
				break;
				case 'large_height' : 
					$masonry_size_class = 'edgtf-large-height-masonry-item';
				break;
				case 'large_width_height' : 
					$masonry_size_class = 'edgtf-large-width-height-masonry-item';
				break;
			endswitch;
		}
		
		return $masonry_size_class;
	}
	/**
    * Generates filter categories array
    *
    * @param $params
    *
    
	 * 
	 * 
	 * 
	 * * @return array
    */
	public function getFilterCategories($params){
		
		$cat_id = 0;

		if(!empty($params['category'])){	
			
			$top_category = get_term_by('slug', $params['category'], 'portfolio-category');
			if(isset($top_category->term_id)){
				$cat_id = $top_category->term_id;
			}
			
		}

		$order = $params['filter_order_by'] === 'count' ? 'DESC' : 'ASC';

        $args = array(
            'taxonomy' => 'portfolio-category',
            'child_of' => $cat_id,
            'orderby' => $params['filter_order_by'],
            'order'  => $order
        );

        $filter_categories = get_terms($args);

		
		return $filter_categories;
		
	}

	/**
    * Generates datta attributes array
    *
    * @param $params
    *
    * @return array
    */
	public function getDataAtts($params){
		
		$data_attr = array();
		$data_return_string = '';
		
		if(get_query_var('paged')) {
            $paged = get_query_var('paged');
        } elseif(get_query_var('page')) {
            $paged = get_query_var('page');
        } else {
            $paged = 1;
        }
		
		if(!empty($paged)) {
            $data_attr['data-next-page'] = $paged+1;
        }		
		if(!empty($params['type'])){
			$data_attr['data-type'] = $params['type'];
		}
		if(!empty($params['columns'])){
			$data_attr['data-columns'] = $params['columns'];
		}
		if(!empty($params['grid_size'])){
			$data_attr['data-grid-size'] = $params['grid_size'];
		}
		if(!empty($params['order_by'])){
			$data_attr['data-order-by'] = $params['order_by'];
		}
		if(!empty($params['order'])){
			$data_attr['data-order'] = $params['order'];
		}
		if(!empty($params['number'])){
			$data_attr['data-number'] = $params['number'];
		}
		if(!empty($params['image_size'])){
			$data_attr['data-image-size'] = $params['image_size'];
		}
		if(!empty($params['filter'])){
			$data_attr['data-filter'] = $params['filter'];
		}
		if(!empty($params['filter_order_by'])){
			$data_attr['data-filter-order-by'] = $params['filter_order_by'];
		}
		if(!empty($params['category'])){
			$data_attr['data-category'] = $params['category'];
		}
		if(!empty($params['selected_projects'])){
			$data_attr['data-selected-projects'] = $params['selected_projects'];
		}
		if(!empty($params['show_load_more'])){
			$data_attr['data-show-load-more'] = $params['show_load_more'];
		}
		if(!empty($params['title_tag'])){
			$data_attr['data-title-tag'] = $params['title_tag'];
		}
		if(!empty($params['portfolio_slider']) && $params['portfolio_slider']=='yes'){
			$data_attr['data-items'] = $params['portfolios_shown'];
		}
		
		foreach($data_attr as $key => $value) {
			if($key !== '') {
				$data_return_string .= $key.'= '.esc_attr($value).' ';
			}
		}
		return $data_return_string;
	}

    public function getItemLink($params){

        $id = $params['current_id'];
        $portfolio_link = get_permalink($id);
        if (get_post_meta($id, 'portfolio_external_link',true) !== ''){
            $portfolio_link = get_post_meta($id, 'portfolio_external_link',true);
        }

        return $portfolio_link;

    }
}