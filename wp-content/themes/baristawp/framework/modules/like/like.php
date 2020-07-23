<?php

class BaristaEdgeLike {
	private static $instance;

	private function __construct() {
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		add_action( 'wp_ajax_barista_edge_like', array( $this, 'ajax' ) );
		add_action( 'wp_ajax_nopriv_barista_edge_like', array( $this, 'ajax' ) );
	}

	public static function get_instance() {
		if ( null == self::$instance ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	function enqueue_scripts() {
		wp_enqueue_script( 'barista-edge-like', EDGE_ASSETS_ROOT . '/js/like.min.js', 'jquery', '1.0', true );
		wp_localize_script( 'barista-edge-like', 'edgtfLike', array(
			'ajaxurl' => admin_url( 'admin-ajax.php' )
		) );
	}

	function ajax() {
		$likes_id = isset( $_POST['likes_id'] ) && ! empty( $_POST['likes_id'] ) ? sanitize_text_field( $_POST['likes_id'] ) : '';
		$post_id  = ! empty( $likes_id ) ? substr( str_replace( 'edgtf-like-', '', $likes_id ), 0, - 4 ) : '-1';

		check_ajax_referer( 'edgtf_like_nonce_' . $post_id, 'like_nonce' );

		//update
		if ( ! empty( $likes_id ) ) {
			$type = isset( $_POST['type'] ) ? sanitize_text_field( $_POST['type'] ) : '';

			echo wp_kses( $this->like_post( $post_id, 'update', $type ), array(
				'span' => array(
					'class'       => true,
					'aria-hidden' => true,
					'style'       => true,
					'id'          => true
				),
				'i'    => array(
					'class' => true,
					'style' => true,
					'id'    => true
				)
			) );
		} //get
		else {
			echo wp_kses( $this->like_post( $post_id, 'get' ), array(
				'span' => array(
					'class'       => true,
					'aria-hidden' => true,
					'style'       => true,
					'id'          => true
				),
				'i'    => array(
					'class' => true,
					'style' => true,
					'id'    => true
				)
			) );
		}

		exit;
	}

	public function like_post( $post_id, $action = 'get', $type = '' ) {
		if ( ! is_numeric( $post_id ) ) {
			return;
		}

		switch ( $action ) {

			case 'get':
				$like_count = get_post_meta( $post_id, '_edgt-like', true );
				if ( isset( $_COOKIE[ 'edgtf-like_' . $post_id ] ) ) {
					$icon = '<i class="icon_heart" aria-hidden="true"></i>';
				} else {
					$icon = '<i class="icon_heart_alt" aria-hidden="true"></i>';
				}
				if ( ! $like_count ) {
					$like_count = 0;
					add_post_meta( $post_id, '_edgt-like', $like_count, true );
					$icon = '<i class="icon_heart_alt" aria-hidden="true"></i>';
				}
				$return_value = $icon . "<span>" . $like_count . "</span>";

				return $return_value;
				break;

			case 'update':
				$like_count = get_post_meta( $post_id, '_edgt-like', true );

				if ( $type != 'portfolio_list' && isset( $_COOKIE[ 'edgtf-like_' . $post_id ] ) ) {
					return $like_count;
				}

				$like_count ++;

				update_post_meta( $post_id, '_edgt-like', $like_count );
				setcookie( 'edgtf-like_' . $post_id, $post_id, time() * 20, '/' );

				if ( $type != 'portfolio_list' ) {
					$return_value = "<i class='icon_heart' aria-hidden='true'></i><span>" . $like_count . "</span>";

					$return_value .= '</span>';

					return $return_value;
				}

				return '';
				break;
			default:
				return '';
				break;
		}
	}

	public function add_like() {
		global $post;

		$output = $this->like_post( $post->ID );

		$class       = 'edgtf-like';
		$rand_number = rand( 100, 999 );
		$title       = esc_html__( 'Like this', 'baristawp' );

		if ( isset( $_COOKIE[ 'edgtf-like_' . $post->ID ] ) ) {
			$class = 'edgtf-like liked';
			$title = esc_html__( 'You already like this!', 'baristawp' );
		}

		return '<a href="#" class="' . esc_attr( $class ) . '" id="edgtf-like-' . esc_attr( $post->ID ) . '-' . $rand_number . '" title="' . esc_attr( $title ) . '" data-post-id="' . esc_attr( $post->ID ) . '">' . $output . wp_nonce_field( 'edgtf_like_nonce_' . esc_attr( $post->ID ), 'edgtf_like_nonce_' . esc_attr( $post->ID ), true, false ) . '</a>';
	}

	public function add_like_blog_list( $blog_id ) {
		$class       = 'edgtf-like';
		$rand_number = rand( 100, 999 );
		$title       = esc_html__( 'Like this', 'baristawp' );

		if ( isset( $_COOKIE[ 'edgtf-like_' . $blog_id ] ) ) {
			$class = 'edgtf-like liked';
			$title = esc_html__( 'You already like this!', 'baristawp' );
		}

		return '<a href="#" class=" hover_icon ' . esc_attr( $class ) . '" id="qodef-like-' . esc_attr( $post->ID ) . '-' . $rand_number . '" title="' . esc_attr( $title ) . '" data-type="portfolio_list" data-post-id="' . esc_attr( $post->ID ) . '">' . $output . wp_nonce_field( 'edgtf_like_nonce_' . esc_attr( $post->ID ), 'edgtf_like_nonce_' . esc_attr( $post->ID ), true, false ) . '</a>';
	}
}

global $barista_edge_like;
$barista_edge_like = BaristaEdgeLike::get_instance();
