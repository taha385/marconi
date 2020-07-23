<?php
if(!defined('ABSPATH')) exit;

class EdgefInstagramWidget extends WP_Widget {

	protected $params;

	public function __construct() {
		parent::__construct(
			'edgtf_instagram_widget',
			esc_html__('Edge Instagram Widget','edge-instagram-feed'),
			array( 'description' => __( 'Display instagram images','edge-instagram-feed') )
		);

		$this->setParams();
	}

	protected function setParams() {
		$this->params = array(
			array(
				'name' => 'title',
				'type' => 'textfield',
				'title' => esc_html__('Title','edge-instagram-feed')
			),
			array(
				'name' => 'tag',
				'type' => 'textfield',
				'title' => esc_html__('Tag','edge-instagram-feed')
			),
			array(
				'name' => 'number_of_photos',
				'type' => 'textfield',
				'title' => esc_html__('Number of photos','edge-instagram-feed')
			),
			array(
				'name' => 'number_of_cols',
				'type' => 'dropdown',
				'title' => esc_html__('Number of columns','edge-instagram-feed'),
				'options' => array(
					'2' => esc_html__('Two','edge-instagram-feed'),
					'3' => esc_html__('Three','edge-instagram-feed'),
					'4' => esc_html__('Four','edge-instagram-feed'),
					'6' => esc_html__('Six','edge-instagram-feed'),
					'8' => esc_html__('Eight','edge-instagram-feed'),
					'9' => esc_html__('Nine','edge-instagram-feed'),
				)
			),
			array(
				'name' => 'image_size',
				'type' => 'dropdown',
				'title' => esc_html__('Image Size','edge-instagram-feed'),
				'options' => array(
					'thumbnail' => esc_html__('Small','edge-instagram-feed'),
					'low_resolution' => esc_html__('Medium','edge-instagram-feed'),
					'standard_resolution' => esc_html__('Large','edge-instagram-feed')
				)
			),
			array(
				'name' => 'transient_time',
				'type' => 'textfield',
				'title' => esc_html__('Images Cache Time','edge-instagram-feed')
			),
		);
	}
	public function getParams() {
		return $this->params;
	}

	public function widget($args, $instance) {
		extract($instance);
		
		echo wp_kses_post( $args['before_widget'] );
		if ( ! empty( $title ) ) {
			echo wp_kses_post( $args['before_title'] ) . esc_html( $title ) . wp_kses_post( $args['after_title'] );
		}

		$instagram_api = EdgefInstagramApi::getInstance();
		$images_array = $instagram_api->getImages($number_of_photos, $tag, array(
			'use_transients' => true,
			'transient_name' => $args['widget_id'],
			'transient_time' => $transient_time
		));

		$number_of_cols = $number_of_cols == '' ? 3 : $number_of_cols;

		if(is_array($images_array) && count($images_array)) { ?>
			<ul class="edgtf-instagram-feed clearfix edgtf-col-<?php echo esc_attr($number_of_cols); ?>">
				<?php
				foreach ($images_array as $image) { ?>
					<li>
						<a href="<?php echo esc_url($instagram_api->getHelper()->getImageLink($image)); ?>" target="_blank">
							<?php echo barista_edge_kses_img($instagram_api->getHelper()->getImageHTML($image, $image_size)); ?>
						</a>
						<i class="fa fa-instagram" aria-hidden="true"></i>
					</li>
				<?php } ?>
			</ul>
		<?php }
		
		echo wp_kses_post( $args['after_widget'] );
	}

	public function form($instance) {
		foreach ($this->params as $param_array) {
			$param_name = $param_array['name'];
			${$param_name} = isset( $instance[$param_name] ) ? esc_attr( $instance[$param_name] ) : '';
		}

		$instagram_api = EdgefInstagramApi::getInstance();

		//user has connected with instagram. Show form
		if($instagram_api->hasUserConnected()) {
			foreach ($this->params as $param) {
				switch($param['type']) {
					case 'textfield':
						?>
						<p>
							<label for="<?php echo esc_attr($this->get_field_id( $param['name'] )); ?>"><?php echo
								esc_html($param['title']); ?></label>
							<input class="widefat" id="<?php echo esc_attr($this->get_field_id( $param['name'] )); ?>" name="<?php echo esc_attr($this->get_field_name( $param['name'] )); ?>" type="text" value="<?php echo esc_attr( ${$param['name']} ); ?>" />
						</p>
						<?php
						break;
					case 'dropdown':
						?>
						<p>
							<label for="<?php echo esc_attr($this->get_field_id( $param['name'] )); ?>"><?php echo
								esc_html($param['title']); ?></label>
							<?php if(isset($param['options']) && is_array($param['options']) && count($param['options'])) { ?>
								<select class="widefat" name="<?php echo esc_attr($this->get_field_name( $param['name'] )); ?>" id="<?php echo esc_attr($this->get_field_id( $param['name'] )); ?>">
									<?php foreach ($param['options'] as $param_option_key => $param_option_val) {
										$option_selected = '';
										if(${$param['name']} == $param_option_key) {
											$option_selected = 'selected';
										}
										?>
										<option <?php echo esc_attr($option_selected); ?> value="<?php echo esc_attr($param_option_key); ?>"><?php echo esc_attr($param_option_val); ?></option>
									<?php } ?>
								</select>
							<?php } ?>
						</p>

						<?php
						break;
				}
			}
		}
	}
}

function edgtf_instagram_widget_load(){
	register_widget('EdgefInstagramWidget');
}

add_action('widgets_init', 'edgtf_instagram_widget_load');