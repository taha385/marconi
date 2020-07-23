<?php
namespace BaristaEdge\Modules\Shortcodes\PricingTables;

use BaristaEdge\Modules\Shortcodes\Lib\ShortcodeInterface;

class PricingTables implements ShortcodeInterface{
	private $base;
	function __construct() {
		$this->base = 'edgtf_pricing_tables';
		add_action('vc_before_init', array($this, 'vcMap'));
	}
	public function getBase() {
		return $this->base;
	}
	
	public function vcMap() {

		vc_map( array(
				'name' => esc_html__('Edge Pricing Tables', 'edge-cpt'),
				'base' => $this->base,
				'as_parent' => array('only' => 'edgtf_pricing_table'),
				'content_element' => true,
				'category' => esc_html__('by EDGE', 'edge-cpt'),
				'icon' => 'icon-wpb-pricing-tables extended-custom-icon',
				'show_settings_on_create' => true,
				'params' => array(
					array(
						'type' => 'dropdown',
						'admin_label' => true,
						'heading' => esc_html__('Columns','edge-cpt'),
						'param_name' => 'columns',
						'value' => array(
							esc_html__('Two','edge-cpt')       => 'edgtf-two-columns',
							esc_html__('Three' ,'edge-cpt')    => 'edgtf-three-columns',
							esc_html__('Four','edge-cpt')      => 'edgtf-four-columns',
						),
						'save_always' => true,
						'description' => ''
					)
				),
				'js_view' => 'VcColumnView'
		) );
	}

	public function render($atts, $content = null) {
		$args = array(
			'columns'         => 'edgtf-two-columns'
		);
		
		$params = shortcode_atts($args, $atts);
		extract($params);
		
		$html = '<div class="edgtf-pricing-tables clearfix '.$columns.'">';
		$html .= do_shortcode($content);
		$html .= '</div>';

		return $html;
	}
}