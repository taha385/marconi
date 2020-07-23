<?php

if(!function_exists('barista_edge_loading_spinners')) {
    function barista_edge_loading_spinners($return = false) {
        global $barista_edge_options;

        $spinner_html = '';
        if(isset($barista_edge_options['smooth_pt_spinner_type'])){

            switch ($barista_edge_options['smooth_pt_spinner_type']) {
                case "3d_cube":
                    $spinner_html = barista_edge_loading_spinner_3d_cube();
                break;
                case "nodes":
                    $spinner_html = barista_edge_loading_spinner_nodes();
                break;
                case "pulse":
                    $spinner_html = barista_edge_loading_spinner_pulse();
                break;
                case "double_pulse":
                    $spinner_html =  barista_edge_loading_spinner_double_pulse();
                break;
                case "cube":
                    $spinner_html =  barista_edge_loading_spinner_cube();
                break;
                case "rotating_cubes":
                    $spinner_html =  barista_edge_loading_spinner_rotating_cubes();
                break;
                case "stripes":
                    $spinner_html =  barista_edge_loading_spinner_stripes();
                break;
                case "wave":
                    $spinner_html =  barista_edge_loading_spinner_wave();
                break;
                case "two_rotating_circles":
                    $spinner_html =  barista_edge_loading_spinner_two_rotating_circles();
                break;
                case "five_rotating_circles":
                    $spinner_html =  barista_edge_loading_spinner_five_rotating_circles();
                break;
				case "atom":
                    $spinner_html = barista_edge_loading_spinner_atom();
                break;
				case "clock":
                    $spinner_html = barista_edge_loading_spinner_clock();
                break;
				case "mitosis":
                    $spinner_html = barista_edge_loading_spinner_mitosis();
                break;
				case "lines":
                    $spinner_html = barista_edge_loading_spinner_lines();
                break;
				case "fussion":
                    $spinner_html = barista_edge_loading_spinner_fussion();
                break;
				case "wave_circles":
                    $spinner_html = barista_edge_loading_spinner_wave_circles();
                break;
				case "pulse_circles":
                    $spinner_html = barista_edge_loading_spinner_pulse_circles();
                break;
            }
        }else{
            $spinner_html = barista_edge_loading_spinner_3d_cube();
        }

        if($return === true) {
            return $spinner_html;
        }

        echo wp_kses($spinner_html, array(
            'div' => array(
                'class' => true,
                'style' => true,
                'id' => true
            ),
            'img' => array (
                'class' => true,
                'src' => true,
                'alt' => true
            )
        ));
    }
}

if(!function_exists('barista_edge_loading_spinner_3d_cube')) {
    function barista_edge_loading_spinner_3d_cube() {
        $html = '';
        $html .=  '<div class="edgtf-3d-cube-holder">';
        $html .=  '<div class="edgtf-3d-cube">';
        $html .=  '<div class="edgtf-cube-face"></div>';
        $html .=  '<div class="edgtf-cube-face"></div>';
        $html .=  '<div class="edgtf-cube-face"></div>';
        $html .=  '<div class="edgtf-cube-face"></div>';
        $html .=  '<div class="edgtf-cube-face"></div>';
        $html .=  '<div class="edgtf-cube-face"></div>';
        $html .=  '</div>';
        $html .=  '</div>';
        return $html;
    }
}

if(!function_exists('barista_edge_loading_spinner_nodes')) {
    function barista_edge_loading_spinner_nodes() {
        $html = '';
        $html .= '<div class="edgtf-nodes">';
        $html .=  '<div class="edgtf-node-1"></div>';
        $html .=  '<div class="edgtf-node-2"></div>';
        $html .=  '<div class="edgtf-node-3"></div>';
        $html .=  '<div class="edgtf-node-4"></div>';
        $html .=  '<div class="edgtf-node-5"></div>';
        $html .=  '<div class="edgtf-node-6"></div>';
        $html .=  '<div class="edgtf-node-7"></div>';
        $html .=  '<div class="edgtf-node-8"></div>';
        $html .=  '<div class="edgtf-node-9"></div>';
        $html .=  '<div class="edgtf-node-10"></div>';
        $html .=  '<div class="edgtf-node-11"></div>';
        $html .=  '<div class="edgtf-node-12"></div>';
        $html .=  '<div class="edgtf-node-13"></div>';
        $html .=  '<div class="edgtf-node-14"></div>';
        $html .=  '<div class="edgtf-node-15"></div>';
        $html .=  '<div class="edgtf-node-16"></div>';
        $html .=  '</div>';
        return $html;
    }
}

if(!function_exists('barista_edge_loading_spinner_pulse')) {
    function barista_edge_loading_spinner_pulse() {
        $html = '';
        $html .= '<div class="pulse"></div>';
        return $html;
    }
}

if(!function_exists('barista_edge_loading_spinner_double_pulse')) {
    function barista_edge_loading_spinner_double_pulse() {
        $html = '';
        $html .= '<div class="double_pulse">';
        $html .= '<div class="double-bounce1"></div>';
        $html .= '<div class="double-bounce2"></div>';
        $html .= '</div>';

        return $html;
    }
}

if(!function_exists('barista_edge_loading_spinner_cube')) {
    function barista_edge_loading_spinner_cube() {
        $html = '';
        $html .= '<div class="cube"></div>';
        return $html;
    }
}

if(!function_exists('barista_edge_loading_spinner_rotating_cubes')) {
    function barista_edge_loading_spinner_rotating_cubes() {
        $html = '';
        $html .= '<div class="rotating_cubes">';
        $html .= '<div class="cube1"></div>';
        $html .= '<div class="cube2"></div>';
        $html .= '</div>';

        return $html;
    }
}

if(!function_exists('barista_edge_loading_spinner_stripes')) {
    function barista_edge_loading_spinner_stripes() {
        $html = '';
        $html .= '<div class="stripes">';
        $html .= '<div class="rect1"></div>';
        $html .= '<div class="rect2"></div>';
        $html .= '<div class="rect3"></div>';
        $html .= '<div class="rect4"></div>';
        $html .= '<div class="rect5"></div>';
        $html .= '</div>';
        return $html;
    }
}

if(!function_exists('barista_edge_loading_spinner_wave')) {
    function barista_edge_loading_spinner_wave() {
        $html = '';
        $html .= '<div class="wave">';
        $html .= '<div class="bounce1"></div>';
        $html .= '<div class="bounce2"></div>';
        $html .= '<div class="bounce3"></div>';
        $html .= '</div>';

        return $html;
    }
}

if(!function_exists('barista_edge_loading_spinner_two_rotating_circles')) {
    function barista_edge_loading_spinner_two_rotating_circles() {
        $html = '';
        $html .= '<div class="two_rotating_circles">';
        $html .= '<div class="dot1"></div>';
        $html .= '<div class="dot2"></div>';
        $html .= '</div>';

        return $html;
    }
}

if(!function_exists('barista_edge_loading_spinner_five_rotating_circles')) {
    function barista_edge_loading_spinner_five_rotating_circles() {
        $html = '';
        $html .= '<div class="five_rotating_circles">';
        $html .= '<div class="spinner-container container1">';
        $html .= '<div class="circle1"></div>';
        $html .= '<div class="circle2"></div>';
        $html .= '<div class="circle3"></div>';
        $html .= '<div class="circle4"></div>';
        $html .= '</div>';
        $html .= '<div class="spinner-container container2">';
        $html .= '<div class="circle1"></div>';
        $html .= '<div class="circle2"></div>';
        $html .= '<div class="circle3"></div>';
        $html .= '<div class="circle4"></div>';
        $html .= '</div>';
        $html .= '<div class="spinner-container container3">';
        $html .= '<div class="circle1"></div>';
        $html .= '<div class="circle2"></div>';
        $html .= '<div class="circle3"></div>';
        $html .= '<div class="circle4"></div>';
        $html .= '</div>';
        $html .= '</div>';
        return $html;
    }
}

if(!function_exists('barista_edge_loading_spinner_atom')) {
    function barista_edge_loading_spinner_atom(){
        $html = '';
        $html .= '<div class="atom">';
        $html .= '<div class="ball ball-1"></div>';
		$html .= '<div class="ball ball-2"></div>';
		$html .= '<div class="ball ball-3"></div>';
		$html .= '<div class="ball ball-4"></div>';
        $html .= '</div>';
        return $html;
    }
}

if(!function_exists('barista_edge_loading_spinner_clock')) {
    function barista_edge_loading_spinner_clock(){
        $html = '';
        $html .= '<div class="clock">';
        $html .= '<div class="ball ball-1"></div>';
		$html .= '<div class="ball ball-2"></div>';
		$html .= '<div class="ball ball-3"></div>';
		$html .= '<div class="ball ball-4"></div>';
        $html .= '</div>';
        return $html;
    }
}

if(!function_exists('barista_edge_loading_spinner_mitosis')) {
    function barista_edge_loading_spinner_mitosis(){
        $html = '';
        $html .= '<div class="mitosis">';
        $html .= '<div class="ball ball-1"></div>';
		$html .= '<div class="ball ball-2"></div>';
		$html .= '<div class="ball ball-3"></div>';
		$html .= '<div class="ball ball-4"></div>';
        $html .= '</div>';
        return $html;
    }
}

if(!function_exists('barista_edge_loading_spinner_lines')) {
    function barista_edge_loading_spinner_lines(){
        $html = '';
        $html .= '<div class="lines">';
        $html .= '<div class="line1"></div>';
		$html .= '<div class="line2"></div>';
		$html .= '<div class="line3"></div>';
		$html .= '<div class="line4"></div>';
        $html .= '</div>';
        return $html;
    }
}

if(!function_exists('barista_edge_loading_spinner_fussion')) {
    function barista_edge_loading_spinner_fussion(){
        $html = '';
        $html .= '<div class="fussion">';
        $html .= '<div class="ball ball-1"></div>';
		$html .= '<div class="ball ball-2"></div>';
		$html .= '<div class="ball ball-3"></div>';
		$html .= '<div class="ball ball-4"></div>';
        $html .= '</div>';
        return $html;
    }
}

if(!function_exists('barista_edge_loading_spinner_wave_circles')) {
    function barista_edge_loading_spinner_wave_circles(){
        $html = '';
        $html .= '<div class="wave_circles">';
        $html .= '<div class="ball ball-1"></div>';
		$html .= '<div class="ball ball-2"></div>';
		$html .= '<div class="ball ball-3"></div>';
		$html .= '<div class="ball ball-4"></div>';
        $html .= '</div>';
        return $html;
    }
}

if(!function_exists('barista_edge_loading_spinner_pulse_circles')) {
    function barista_edge_loading_spinner_pulse_circles(){
        $html = '';
        $html .= '<div class="pulse_circles">';
        $html .= '<div class="ball ball-1"></div>';
		$html .= '<div class="ball ball-2"></div>';
		$html .= '<div class="ball ball-3"></div>';
		$html .= '<div class="ball ball-4"></div>';
        $html .= '</div>';
        return $html;
    }
}
