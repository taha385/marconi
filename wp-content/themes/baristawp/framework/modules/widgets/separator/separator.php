<?php

/**
 * Widget that adds separator boxes type
 *
 * Class Separator_Widget
 */
class BaristaEdgeSeparatorWidget extends BaristaEdgeWidget {
    /**
     * Set basic widget options and call parent class construct
     */
    public function __construct() {
        parent::__construct(
            'edgt_separator_widget', // Base ID
            esc_html__('Edge Separator Widget','baristawp')// Name
        );

        $this->setParams();
    }

    /**
     * Sets widget options
     */
    protected function setParams() {
        $this->params = array(
            array(
                'type' => 'dropdown',
                'title' => esc_html__('Type','baristawp'),
                'name' => 'type',
                'options' => array(
                    'normal' => esc_html__('Normal','baristawp'),
                    'full-width' => esc_html__('Full Width','baristawp'),
                )
            ),
            array(
                'type' => 'dropdown',
                'title' => esc_html__('Position','baristawp'),
                'name' => 'position',
                'options' => array(
                    'center' => esc_html__('Center','baristawp'),
                    'left' => esc_html__('Left','baristawp'),
                    'right' => esc_html__('Right','baristawp'),
                )
            ),
            array(
                'type' => 'dropdown',
                'title' => esc_html__('Style','baristawp'),
                'name' => 'border_style',
                'options' => array(
                    'solid' => esc_html__('Solid','baristawp'),
                    'dashed' => esc_html__('Dashed','baristawp'),
                    'dotted' => esc_html__('Dotted','baristawp'),
                )
            ),
            array(
                'type' => 'textfield',
                'title' => esc_html__('Color','baristawp'),
                'name' => 'color'
            ),
            array(
                'type' => 'textfield',
                'title' => esc_html__('Width','baristawp'),
                'name' => 'width',
                'description' => ''
            ),
            array(
                'type' => 'textfield',
                'title' => esc_html__('Thickness (px)','baristawp'),
                'name' => 'thickness',
                'description' => ''
            ),
            array(
                'type' => 'textfield',
                'title' => esc_html__('Top Margin','baristawp'),
                'name' => 'top_margin',
                'description' => ''
            ),
            array(
                'type' => 'textfield',
                'title' => esc_html__('Bottom Margin','baristawp'),
                'name' => 'bottom_margin',
                'description' => ''
            )
        );
    }

    /**
     * Generates widget's HTML
     *
     * @param array $args args from widget area
     * @param array $instance widget's options
     */
    public function widget($args, $instance) {

        extract($args);

        //prepare variables
        $params = '';

        //is instance empty?
        if(is_array($instance) && count($instance)) {
            //generate shortcode params
            foreach($instance as $key => $value) {
                $params .= " $key='$value' ";
            }
        }

        echo '<div class="widget edgtf-separator-widget">';

        //finally call the shortcode
        echo do_shortcode("[edgtf_separator $params]"); // XSS OK

        echo '</div>'; //close div.edgtf-separator-widget
    }
}