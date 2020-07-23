<?php
namespace BaristaEdge\Modules\Shortcodes\Process;

use BaristaEdge\Modules\Shortcodes\Lib\ShortcodeInterface;

class ProcessItem implements ShortcodeInterface {
	private $base;

	public function __construct() {
		$this->base = 'edgtf_process_item';

		add_action('vc_before_init', array($this, 'vcMap'));
	}

	public function getBase() {
		return $this->base;
	}

	public function vcMap() {
		vc_map(array(
			'name'                    => esc_html__('Process Item','edge-cpt'),
			'base'                    => $this->getBase(),
			'as_child'                => array('only' => 'edgtf_process_holder'),
			'category'                => esc_html__('by EDGE','edge-cpt'),
			'icon'                    => 'icon-wpb-process-item extended-custom-icon',
			'show_settings_on_create' => true,
			'params'                  => array(
				array(
					'type'        => 'textfield',
					'heading'     => esc_html__('Number','edge-cpt'),
					'param_name'  => 'number',
					'admin_label' => true
				),
				array(
					'type'        => 'attach_image',
					'heading'     => esc_html__('Image','edge-cpt'),
					'param_name'  => 'image'
				),
				array(
					'type'        => 'textfield',
					'heading'     => esc_html__('Title','edge-cpt'),
					'param_name'  => 'title',
					'admin_label' => true
				),
				array(
					'type'        => 'textarea',
					'heading'     => esc_html__('Text','edge-cpt'),
					'param_name'  => 'text'
				),
				array(
					'type'        => 'dropdown',
					'heading'     => esc_html__('Highlight Item?','edge-cpt'),
					'param_name'  => 'highlighted',
					'value'       => array(
						esc_html__('No','edge-cpt')  => 'no',
						esc_html__('Yes','edge-cpt') => 'yes'
					)
				)
			)
		));
	}

	public function render($atts, $content = null) {
		$default_atts = array(
			'number'     => '',
			'image'     => '',
			'title'     => '',
			'text'      => '',
			'highlighted' => 'no'
		);

		$params = shortcode_atts($default_atts, $atts);

		$params['item_classes'] = array(
			'edgtf-process-item-holder'
		);

		if($params['highlighted'] === 'yes') {
			$params['item_classes'][] = 'edgtf-pi-highlighted';
		}
		$params['number_holder_style'] = '';
		if($params['image'] != ''){
			$params['number_holder_style'] = 'background-image: url(' . wp_get_attachment_url($params['image']) . ')';
		}

		return edge_core_get_shortcode_template_part('templates/process-item-template', 'process', '', $params);
	}

}