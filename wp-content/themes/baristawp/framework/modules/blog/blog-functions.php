<?php
if ( ! function_exists( 'barista_edge_get_blog' ) ) {
	/**
	 * Function which return holder for all blog lists
	 *
	 * @return holder.php template
	 */
	function barista_edge_get_blog( $type ) {

		$sidebar = barista_edge_sidebar_layout();

		$params = array(
			"blog_type" => $type,
			"sidebar"   => $sidebar
		);
		barista_edge_get_module_template_part( 'templates/lists/holder', 'blog', '', $params );
	}

}

if ( ! function_exists( 'barista_edge_get_blog_type' ) ) {

	/**
	 * Function which create query for blog lists
	 *
	 * @return blog list template
	 */

	function barista_edge_get_blog_type( $type ) {

		$blog_query = barista_edge_get_blog_query();

		$paged        = barista_edge_paged();
		$blog_classes = '';

		if ( barista_edge_options()->getOptionValue( 'blog_page_range' ) != "" ) {
			$blog_page_range = esc_attr( barista_edge_options()->getOptionValue( 'blog_page_range' ) );
		} else {
			$blog_page_range = $blog_query->max_num_pages;
		}
		$show_load_more = barista_edge_enable_load_more();

		if ( $show_load_more ) {
			$blog_classes .= ' edgtf-blog-load-more';
		}

		$params = array(
			'blog_query'      => $blog_query,
			'paged'           => $paged,
			'blog_page_range' => $blog_page_range,
			'blog_type'       => $type,
			'blog_classes'    => $blog_classes
		);

		barista_edge_get_module_template_part( 'templates/lists/' . $type, 'blog', '', $params );
	}

}

if ( ! function_exists( 'barista_edge_get_blog_query' ) ) {
	/**
	 * Function which create query for blog lists
	 *
	 * @return wp query object
	 */
	function barista_edge_get_blog_query() {
		global $wp_query;

		$id       = barista_edge_get_page_id();
		$category = esc_attr( get_post_meta( $id, "edgtf_blog_category_meta", true ) );
		if ( esc_attr( get_post_meta( $id, "edgtf_show_posts_per_page_meta", true ) ) != "" ) {
			$post_number = esc_attr( get_post_meta( $id, "edgtf_show_posts_per_page_meta", true ) );
		} else {
			$post_number = esc_attr( get_option( 'posts_per_page' ) );
		}

		$paged       = barista_edge_paged();
		$query_array = array(
			'post_type'      => 'post',
			'paged'          => $paged,
			'category_name'  => $category,
			'posts_per_page' => $post_number,
			'post_status'    => 'publish'
		);
		if ( is_archive() ) {
			$blog_query = $wp_query;
		} else {
			$blog_query = new WP_Query( $query_array );
		}

		return $blog_query;

	}
}


if ( ! function_exists( 'barista_edge_get_post_format_html' ) ) {

	/**
	 * Function which return html for post formats
	 *
	 * @param $type
	 *
	 * @return post hormat template
	 */

	function barista_edge_get_post_format_html( $type = "", $ajax = '' ) {

		$post_format = get_post_format();

		$supported_post_formats = array( 'audio', 'video', 'link', 'quote', 'gallery' );
		if ( in_array( $post_format, $supported_post_formats ) ) {
			$post_format = $post_format;
		} else {
			$post_format = 'standard';
		}

		$slug = '';
		if ( $type !== "" ) {
			$slug = $type;
		}

		$params              = array();
		$params['read_more'] = 'no';
		$params['type']      = $type;

		$chars_array = barista_edge_blog_lists_number_of_chars();
		if ( isset( $chars_array[ $type ] ) ) {
			$params['excerpt_length'] = $chars_array[ $type ];
		} else {
			$params['excerpt_length'] = '';
		}

		if ( $type == 'masonry' || $type == 'masonry-full-width' ) {
			$params['read_more'] = 'yes';
		}

		if ( $ajax == '' ) {
			barista_edge_get_module_template_part( 'templates/lists/post-formats/' . $post_format, 'blog', $slug, $params );
		}
		if ( $ajax == 'yes' ) {
			return barista_edge_get_blog_module_template_part( 'templates/lists/post-formats/' . $post_format, $slug, $params );
		}

	}

}

if ( ! function_exists( 'barista_edge_get_default_blog_list' ) ) {
	/**
	 * Function which return default blog list for archive post types
	 *
	 * @return post format template
	 */

	function barista_edge_get_default_blog_list() {

		$blog_list = barista_edge_options()->getOptionValue( 'blog_list_type' );

		return $blog_list;

	}

}


if ( ! function_exists( 'barista_edge_pagination' ) ) {

	/**
	 * Function which return pagination
	 *
	 * @return blog list pagination html
	 */

	function barista_edge_pagination( $pages = '', $range = 4, $paged = 1 ) {

		$showitems = $range + 1;

		if ( $pages == '' ) {
			global $wp_query;
			$pages = $wp_query->max_num_pages;
			if ( ! $pages ) {
				$pages = 1;
			}
		}

		$show_load_more   = barista_edge_enable_load_more();
		$masonry_template = barista_edge_is_masonry_template();

		$search_template = 'no';
		if ( is_search() ) {
			$search_template = 'yes';
		}


		if ( $pages != 1 ) {
			if ( $show_load_more == 'yes' && $search_template !== 'yes' && ! $masonry_template ) {
				$params = array(
					'text' => esc_html__( 'Load More', 'baristawp' )
				);
				echo '<div class="edgtf-load-more-ajax-pagination">';
				echo barista_edge_get_button_html( $params );
				echo '</div>';

				$unique_id = rand( 1000, 9999 );
				wp_nonce_field( 'edgtf_blog_load_more_nonce_' . $unique_id, 'edgtf_blog_load_more_nonce_' . $unique_id );

			} else {
				echo '<div class="edgtf-pagination-holder">';
				echo '<div class="edgtf-pagination">';
				echo '<ul>';
				if ( $paged > 2 && $paged > $range + 1 && $showitems < $pages ) {
					echo '<li class="edgtf-pagination-first-page"><a itemprop="url"  href="' . esc_url( get_pagenum_link( 1 ) ) . '"><span class="arrow_carrot-2left"></span></a></li>';
				}
				echo '<li class="edgtf-pagination-prev';
				if ( $paged > 2 && $paged > $range + 1 && $showitems < $pages ) {
					echo ' edgtf-pagination-prev-first';
				}
				echo '"><a itemprop="url"  href="' . esc_url( get_pagenum_link( $paged - 1 ) ) . '"><span class="fa fa-arrow-left"></span></a></li>';

				for ( $i = 1; $i <= $pages; $i ++ ) {
					if ( 1 != $pages && ( ! ( $i >= $paged + $range + 1 || $i <= $paged - $range - 1 ) || $pages <= $showitems ) ) {
						echo esc_html( $paged == $i ) ? "<li class='active'><span>" . $i . "</span></li>" : "<li><a itemprop='url' href='" . get_pagenum_link( $i ) . "' class='inactive'>" . $i . "</a></li>";
					}
				}

				echo '<li class="edgtf-pagination-next';
				if ( $paged < $pages - 1 && $paged + $range - 1 < $pages && $showitems < $pages ) {
					echo ' edgtf-pagination-next-last';
				}
				echo '"><a itemprop="url" href="';
				if ( $pages > $paged ) {
					echo esc_url( get_pagenum_link( $paged + 1 ) );
				} else {
					echo esc_url( get_pagenum_link( $paged ) );
				}
				echo '"><span class="fa fa-arrow-right"></span></a></li>';
				if ( $paged < $pages - 1 && $paged + $range - 1 < $pages && $showitems < $pages ) {
					echo '<li class="edgtf-pagination-last-page"><a itemprop="url" href="' . esc_url( get_pagenum_link( $pages ) ) . '"><span class="arrow_carrot-2right"></span></a></li>';
				}
				echo '</ul>';
				echo "</div>";
				echo "</div>";
			}
		}
	}
}

if ( ! function_exists( 'barista_edge_post_info' ) ) {
	/**
	 * Function that loads parts of blog post info section
	 * Possible options are:
	 * 1. date
	 * 2. category
	 * 3. author
	 * 4. comments
	 * 5. like
	 * 6. share
	 *
	 * @param $config array of sections to load
	 */
	function barista_edge_post_info( $config ) {
		$default_config = array(
			'date'     => '',
			'category' => '',
			'author'   => '',
			'comments' => '',
			'like'     => '',
			'share'    => ''
		);

		extract( shortcode_atts( $default_config, $config ) );

		if ( $author == 'yes' ) {
			barista_edge_get_module_template_part( 'templates/parts/post-info-author', 'blog' );
		}
		if ( $category == 'yes' ) {
			barista_edge_get_module_template_part( 'templates/parts/post-info-category', 'blog' );
		}
		if ( $date == 'yes' ) {
			barista_edge_get_module_template_part( 'templates/parts/post-info-date', 'blog' );
		}

		if ( $comments == 'yes' ) {
			barista_edge_get_module_template_part( 'templates/parts/post-info-comments', 'blog' );
		}
		if ( $like == 'yes' ) {
			barista_edge_get_module_template_part( 'templates/parts/post-info-like', 'blog' );
		}
		if ( $share == 'yes' ) {
			barista_edge_get_module_template_part( 'templates/parts/post-info-share', 'blog' );
		}
	}
}

if ( ! function_exists( 'barista_edge_excerpt' ) ) {
	/**
	 * Function that cuts post excerpt to the number of word based on previosly set global
	 * variable $word_count, which is defined in edgt_set_blog_word_count function.
	 *
	 * It current post has read more tag set it will return content of the post, else it will return post excerpt
	 *
	 */
	function barista_edge_excerpt( $excerpt_length = '' ) {
		global $post;

		if ( post_password_required() ) {
			echo get_the_password_form();
		} //does current post has read more tag set?
        elseif ( barista_edge_post_has_read_more() ) {
			global $more;

			//override global $more variable so this can be used in blog templates
			$more = 0;
			the_content( true );
		} //is word count set to something different that 0?
        elseif ( $excerpt_length != '0' ) {
			//if word count is set and different than empty take that value, else that general option from theme options
			$word_count = '45';
			if ( isset( $excerpt_length ) && $excerpt_length != "" ) {
				$word_count = $excerpt_length;

			} elseif ( barista_edge_options()->getOptionValue( 'number_of_chars' ) != '' ) {
				$word_count = esc_attr( barista_edge_options()->getOptionValue( 'number_of_chars' ) );
			}
			//if post excerpt field is filled take that as post excerpt, else that content of the post
			$post_excerpt = $post->post_excerpt != "" ? $post->post_excerpt : strip_tags( $post->post_content );

			//remove leading dots if those exists
			$clean_excerpt = strlen( $post_excerpt ) && strpos( $post_excerpt, '...' ) ? strstr( $post_excerpt, '...', true ) : $post_excerpt;

			//if clean excerpt has text left
			if ( $clean_excerpt !== '' ) {
				//explode current excerpt to words
				$excerpt_word_array = explode( ' ', $clean_excerpt );

				//cut down that array based on the number of the words option
				$excerpt_word_array = array_slice( $excerpt_word_array, 0, $word_count );

				//add exerpt postfix
				$excert_postfix = apply_filters( 'barista_edge_excerpt_postfix', '...' );

				//and finally implode words together
				$excerpt = implode( ' ', $excerpt_word_array ) . $excert_postfix;

				//is excerpt different than empty string?
				if ( $excerpt !== '' ) {
					echo '<p itemprop="description" class="edgtf-post-excerpt">' . wp_kses_post( $excerpt ) . '</p>';
				}
			}
		}
	}
}

if ( ! function_exists( 'barista_edge_get_blog_single' ) ) {

	/**
	 * Function which return holder for single posts
	 *
	 * @return single holder.php template
	 */

	function barista_edge_get_blog_single() {
		$sidebar = barista_edge_sidebar_layout();

		$params = array(
			"sidebar" => $sidebar
		);

		barista_edge_get_module_template_part( 'templates/single/holder', 'blog', '', $params );
	}
}

if ( ! function_exists( 'barista_edge_get_single_html' ) ) {

	/**
	 * Function return all parts on single.php page
	 *
	 *
	 * @return single.php html
	 */

	function barista_edge_get_single_html() {

		$post_format            = get_post_format();
		$supported_post_formats = array( 'audio', 'video', 'link', 'quote', 'gallery' );
		if ( in_array( $post_format, $supported_post_formats ) ) {
			$post_format = $post_format;
		} else {
			$post_format = 'standard';
		}

		//Related posts
		$related_posts_params = array();
		$show_related         = ( barista_edge_options()->getOptionValue( 'blog_single_related_posts' ) == 'yes' ) ? true : false;
		if ( $show_related ) {
			$hasSidebar            = barista_edge_sidebar_layout();
			$post_id               = get_the_ID();
			$related_post_number   = ( $hasSidebar == '' || $hasSidebar == 'default' || $hasSidebar == 'no-sidebar' ) ? 4 : 3;
			$related_posts_options = array(
				'posts_per_page' => $related_post_number
			);
			$related_posts_params  = array(
				'related_posts' => barista_edge_get_related_post_type( $post_id, $related_posts_options )
			);
		}

		barista_edge_get_module_template_part( 'templates/single/post-formats/' . $post_format, 'blog' );
		barista_edge_get_module_template_part( 'templates/single/parts/author-info', 'blog' );
		if ( $show_related ) {
			barista_edge_get_module_template_part( 'templates/single/parts/related-posts', 'blog', '', $related_posts_params );
		}
		if ( barista_edge_show_comments() ) {
			comments_template( '', true );
		}
	}

}
if ( ! function_exists( 'barista_edge_container_additional_post_items' ) ) {

	/**
	 * Function which return parts on single.php which are just below content
	 *
	 * @return single.php html
	 */

	function barista_edge_container_additional_post_items() {

		$query = barista_edge_get_blog_query();

		$blog_array = array(
			'blog-standard.php',
			'blog-split-column.php',
			'blog-standard-whole-post.php'
		);

		$blog_array_option = array(
			'standard',
			'split-column',
			'standard-whole-post'
		);

		if ( is_singular( 'post' ) ) {
			return barista_edge_get_module_template_part( 'templates/single/parts/single-navigation', 'blog' );
		}

		if ( in_array( get_page_template_slug( barista_edge_get_page_id() ), $blog_array ) || ( ( is_home() || ( is_archive() && ! barista_edge_is_woocommerce_page() ) ) && in_array( barista_edge_options()->getOptionValue( 'blog_list_type' ), $blog_array_option ) ) ) {
			if ( barista_edge_options()->getOptionValue( 'pagination' ) == 'yes' && $query->max_num_pages > 1 ) { ?>
                <div class="edgtf-container edgtf-container-bottom-navigation">
                    <div class="edgtf-container-inner">
						<?php barista_edge_pagination( $query->max_num_pages, barista_edge_get_blog_page_range( $query ), barista_edge_paged() ); ?>
                    </div>
                </div>
			<?php }
		}
		if ( get_page_template_slug( barista_edge_get_page_id() ) == 'blog-masonry.php' || ( ( is_home() || ( is_archive() && ! barista_edge_is_woocommerce_page() ) ) && barista_edge_options()->getOptionValue( 'blog_list_type' ) == 'masonry' ) ) {
			$pagination_type = barista_edge_options()->getOptionValue( 'masonry_pagination' );
			if ( barista_edge_options()->getOptionValue( 'pagination' ) == 'yes' && ( $pagination_type != 'load-more' && $pagination_type != 'infinite-scroll' ) ) {
				barista_edge_pagination( $query->max_num_pages, barista_edge_get_blog_page_range( $query ), barista_edge_paged() );
			}
		}
	}

	add_action( 'barista_edge_after_container_close', 'barista_edge_container_additional_post_items' );
}

if ( ! function_exists( 'barista_edge_full_width_additional_post_items' ) ) {

	/**
	 * Function which return parts on single.php which are just below content
	 *
	 * @return single.php html
	 */

	function barista_edge_full_width_additional_post_items() {
		$query = barista_edge_get_blog_query();

		if ( get_page_template_slug( barista_edge_get_page_id() ) == 'blog-masonry-full-width.php' || ( ( is_home() || is_archive() ) && barista_edge_options()->getOptionValue( 'blog_list_type' ) == 'blog-masonry-full-width' ) ) {
			$pagination_type = barista_edge_options()->getOptionValue( 'masonry_pagination' );
			if ( barista_edge_options()->getOptionValue( 'pagination' ) == 'yes' && ( $pagination_type != 'load-more' && $pagination_type != 'infinite-scroll' ) ) { ?>
                <div class="edgtf-container edgtf-container-bottom-navigation">
					<?php barista_edge_pagination( $query->max_num_pages, barista_edge_get_blog_page_range( $query ), barista_edge_paged() ); ?>
                </div>
			<?php }
		}
	}

	add_action( 'barista_edge_after_full_width_container_close', 'barista_edge_full_width_additional_post_items' );
}


if ( ! function_exists( 'barista_edge_comment' ) ) {

	/**
	 * Function which modify default wordpress comments
	 *
	 * @return comments html
	 */

	function barista_edge_comment( $comment, $args, $depth ) {

		$GLOBALS['comment'] = $comment;

		global $post;

		$is_pingback_comment = $comment->comment_type == 'pingback';
		$is_author_comment   = $post->post_author == $comment->user_id;

		$comment_class = 'edgtf-comment clearfix';

		if ( $is_author_comment ) {
			$comment_class .= ' edgtf-post-author-comment';
		}

		if ( $is_pingback_comment ) {
			$comment_class .= ' edgtf-pingback-comment';
		}

		?>

    <li <?php comment_class(); ?>>
        <div class="<?php echo esc_attr( $comment_class ); ?>">
			<?php if ( ! $is_pingback_comment ) { ?>
                <div class="edgtf-comment-image"> <?php echo barista_edge_kses_img( get_avatar( $comment, 85 ) ); ?> </div>
			<?php } ?>
            <div class="edgtf-comment-text">
                <div class="edgtf-comment-info">
                    <h4 class="edgtf-comment-name">
						<?php if ( $is_pingback_comment ) {
							esc_html_e( 'Pingback:', 'baristawp' );
						} ?>
						<?php echo wp_kses_post( get_comment_author_link() ); ?>
						<?php if ( $is_author_comment ) { ?>
                            <i class="fa fa-user post-author-comment-icon"></i>
						<?php } ?>
                    </h4>
                    <span class="edgtf-reply-edit-holder">
						<?php
						edit_comment_link();
						comment_reply_link( array_merge( $args, array(
							'depth'     => $depth,
							'max_depth' => $args['max_depth']
						) ) );
						?>
					</span>
                    <span class="edgtf-comment-date"><?php comment_time( get_option( 'date_format' ) ); ?><?php comment_time( get_option( 'time_format' ) ); ?></span>
                </div>
				<?php if ( ! $is_pingback_comment ) { ?>
                    <div class="edgtf-text-holder" id="comment-<?php echo comment_ID(); ?>">
						<?php comment_text(); ?>
                    </div>
				<?php } ?>
            </div>
        </div>
		<?php //li tag will be closed by WordPress after looping through child elements ?>

		<?php
	}
}

if ( ! function_exists( 'barista_edge_blog_archive_pages_classes' ) ) {

	/**
	 * Function which create classes for container in archive pages
	 *
	 * @return array
	 */

	function barista_edge_blog_archive_pages_classes( $blog_type ) {

		$classes = array();
		if ( in_array( $blog_type, barista_edge_blog_full_width_types() ) ) {
			$classes['holder'] = 'edgtf-full-width';
			$classes['inner']  = 'edgtf-full-width-inner';
		} elseif ( in_array( $blog_type, barista_edge_blog_grid_types() ) ) {
			$classes['holder'] = 'edgtf-container';
			$classes['inner']  = 'edgtf-container-inner clearfix';
		}

		return $classes;

	}

}

if ( ! function_exists( 'barista_edge_blog_full_width_types' ) ) {

	/**
	 * Function which return all full width blog types
	 *
	 * @return array
	 */

	function barista_edge_blog_full_width_types() {

		$types = array( 'masonry-full-width' );

		return $types;

	}

}

if ( ! function_exists( 'barista_edge_blog_grid_types' ) ) {

	/**
	 * Function which return in grid blog types
	 *
	 * @return array
	 */

	function barista_edge_blog_grid_types() {

		$types = array( 'standard', 'masonry', 'split-column', 'standard-whole-post' );

		return $types;

	}

}

if ( ! function_exists( 'barista_edge_blog_types' ) ) {

	/**
	 * Function which return all blog types
	 *
	 * @return array
	 */

	function barista_edge_blog_types() {

		$types = array_merge( barista_edge_blog_grid_types(), barista_edge_blog_full_width_types() );

		return $types;

	}

}

if ( ! function_exists( 'barista_edge_blog_templates' ) ) {

	/**
	 * Function which return all blog templates names
	 *
	 * @return array
	 */

	function barista_edge_blog_templates() {

		$templates      = array();
		$grid_templates = barista_edge_blog_grid_types();
		$full_templates = barista_edge_blog_full_width_types();
		foreach ( $grid_templates as $grid_template ) {
			array_push( $templates, 'blog-' . $grid_template );
		}
		foreach ( $full_templates as $full_template ) {
			array_push( $templates, 'blog-' . $full_template );
		}

		return $templates;

	}

}

if ( ! function_exists( 'barista_edge_blog_lists_number_of_chars' ) ) {

	/**
	 * Function that return number of characters for different lists based on options
	 *
	 * @return int
	 */

	function barista_edge_blog_lists_number_of_chars() {

		$number_of_chars = array();

		if ( barista_edge_options()->getOptionValue( 'standard_number_of_chars' ) ) {
			$number_of_chars['standard'] = barista_edge_options()->getOptionValue( 'standard_number_of_chars' );
		}
		if ( barista_edge_options()->getOptionValue( 'masonry_number_of_chars' ) ) {
			$number_of_chars['masonry'] = barista_edge_options()->getOptionValue( 'masonry_number_of_chars' );
		}
		if ( barista_edge_options()->getOptionValue( 'split_column_number_of_chars' ) ) {
			$number_of_chars['split-column'] = barista_edge_options()->getOptionValue( 'split_column_number_of_chars' );
		}

		return $number_of_chars;

	}

}

if ( ! function_exists( 'barista_edge_excerpt_length' ) ) {
	/**
	 * Function that changes excerpt length based on theme options
	 *
	 * @param $length int original value
	 *
	 * @return int changed value
	 */
	function barista_edge_excerpt_length( $length ) {

		if ( barista_edge_options()->getOptionValue( 'number_of_chars' ) !== '' ) {
			return esc_attr( barista_edge_options()->getOptionValue( 'number_of_chars' ) );
		} else {
			return 45;
		}
	}

	add_filter( 'excerpt_length', 'barista_edge_excerpt_length', 999 );
}

if ( ! function_exists( 'barista_edge_excerpt_more' ) ) {
	/**
	 * Function that adds three dotes on the end excerpt
	 *
	 * @param $more
	 *
	 * @return string
	 */
	function barista_edge_excerpt_more( $more ) {
		return '...';
	}

	add_filter( 'excerpt_more', 'barista_edge_excerpt_more' );
}

if ( ! function_exists( 'barista_edge_post_has_read_more' ) ) {
	/**
	 * Function that checks if current post has read more tag set
	 * @return int position of read more tag text. It will return false if read more tag isn't set
	 */
	function barista_edge_post_has_read_more() {
		global $post;

		return strpos( $post->post_content, '<!--more-->' );
	}
}

if ( ! function_exists( 'barista_edge_post_has_title' ) ) {
	/**
	 * Function that checks if current post has title or not
	 * @return bool
	 */
	function barista_edge_post_has_title() {
		return get_the_title() !== '';
	}
}

if ( ! function_exists( 'barista_edge_modify_read_more_link' ) ) {
	/**
	 * Function that modifies read more link output.
	 * Hooks to the_content_more_link
	 * @return string modified output
	 */
	function barista_edge_modify_read_more_link() {
		$link = '<div class="edgtf-more-link-container">';
		if ( barista_edge_core_installed() ) {
			$link .= barista_edge_get_button_html( array(
				'link' => get_permalink() . '#more-' . get_the_ID(),
				'text' => esc_html__( 'Continue reading', 'baristawp' )
			) );
		} else {
			$link .= '<a itemprop="url" href="' . get_permalink() . '" target="_self" class="edgtf-btn edgtf-btn-medium edgtf-btn-solid"><span class="edgtf-btn-text">' . esc_html__( 'Continue reading', 'baristawp' ) . '</span></a>';
		}

		$link .= '</div>';

		return $link;
	}

	add_filter( 'the_content_more_link', 'barista_edge_modify_read_more_link' );
}


if ( ! function_exists( 'barista_edge_has_blog_widget' ) ) {
	/**
	 * Function that checks if latest posts widget is added to widget area
	 * @return bool
	 */
	function barista_edge_has_blog_widget() {
		$widgets_array = array(
			'edgt_latest_posts_widget'
		);

		foreach ( $widgets_array as $widget ) {
			$active_widget = is_active_widget( false, false, $widget );

			if ( $active_widget ) {
				return true;
			}
		}

		return false;
	}
}

if ( ! function_exists( 'barista_edge_has_blog_shortcode' ) ) {
	/**
	 * Function that checks if any of blog shortcodes exists on a page
	 * @return bool
	 */
	function barista_edge_has_blog_shortcode() {
		$blog_shortcodes = array(
			'edgtf_blog_list',
			'edgtf_blog_slider',
			'edgtf_blog_carousel'
		);

		$slider_field = get_post_meta( barista_edge_get_page_id(), 'edgtf_page_slider_meta', true ); //TODO change

		foreach ( $blog_shortcodes as $blog_shortcode ) {
			$has_shortcode = barista_edge_has_shortcode( $blog_shortcode ) || barista_edge_has_shortcode( $blog_shortcode, $slider_field );

			if ( $has_shortcode ) {
				return true;
			}
		}

		return false;
	}
}


if ( ! function_exists( 'barista_edge_load_blog_assets' ) ) {
	/**
	 * Function that checks if blog assets should be loaded
	 *
	 * @return bool
	 * @see barista_edge_is_ajax_enabled_is_blog_template()
	 * @see is_home()
	 * @see is_single()
	 * @see edgt_has_blog_shortcode()
	 * @see is_archive()
	 * @see is_search()
	 * @see edgt_has_blog_widget()
	 * @see barista_edge_is_ajax_enabled()
	 */
	function barista_edge_load_blog_assets() {
		return barista_edge_is_ajax_enabled() || barista_edge_is_blog_template() || is_home() || is_single() || barista_edge_has_blog_shortcode() || is_archive() || is_search() || barista_edge_has_blog_widget();
	}
}

if ( ! function_exists( 'barista_edge_is_blog_template' ) ) {
	/**
	 * Checks if current template page is blog template page.
	 *
	 * @param string current page. Optional parameter.
	 *
	 * @return bool
	 *
	 * @see barista_edge_get_page_template_name()
	 */
	function barista_edge_is_blog_template( $current_page = '' ) {

		if ( $current_page == '' ) {
			$current_page = barista_edge_get_page_template_name();
		}

		$blog_templates = barista_edge_blog_templates();

		return in_array( $current_page, $blog_templates );
	}
}

if ( ! function_exists( 'barista_edge_read_more_button' ) ) {
	/**
	 * Function that outputs read more button html if necessary.
	 * It checks if read more button should be outputted only if option for given template is enabled and post does'nt have read more tag
	 * and if post isn't password protected
	 *
	 * @param string $option name of option to check
	 * @param string $class additional class to add to button
	 *
	 */
	function barista_edge_read_more_button( $option = '', $class = '' ) {
		if ( $option != '' ) {
			$show_read_more_button = barista_edge_options()->getOptionValue( $option ) == 'yes';
		} else {
			$show_read_more_button = 'yes';
		}
		if ( $show_read_more_button && ! barista_edge_post_has_read_more() && ! post_password_required() ) {
			echo barista_edge_get_button_html( array(
				'size'         => 'small',
				'link'         => get_the_permalink(),
				'text'         => esc_html__( 'Read More', 'baristawp' ),
				'custom_class' => $class
			) );
		}
	}
}

if ( ! function_exists( 'barista_edge_set_blog_holder_data_params' ) ) {
	/**
	 * Function which set data params on blog holder div
	 */
	function barista_edge_set_blog_holder_data_params() {

		$show_load_more = barista_edge_enable_load_more();
		if ( $show_load_more ) {
			$current_query = barista_edge_get_blog_query();

			$data_params        = array();
			$data_return_string = '';

			$paged = barista_edge_paged();

			$posts_number = '';
			if ( get_post_meta( get_the_ID(), "edgtf_show_posts_per_page_meta", true ) != "" ) {
				$posts_number = get_post_meta( get_the_ID(), "edgtf_show_posts_per_page_meta", true );
			} else {
				$posts_number = get_option( 'posts_per_page' );
			}
			$category = get_post_meta( barista_edge_get_page_id(), 'edgtf_blog_category_meta', true );


			//set data params
			$data_params['data-next-page'] = $paged + 1;
			$data_params['data-max-pages'] = $current_query->max_num_pages;

			if ( $posts_number != '' ) {
				$data_params['data-post-number'] = $posts_number;
			}

			if ( $category != '' ) {
				$data_params['data-category'] = $category;
			}
			if ( is_archive() ) {
				if ( is_category() ) {
					$cat_id                               = get_queried_object_id();
					$data_params['data-archive-category'] = $cat_id;
				}
				if ( is_author() ) {
					$author_id                          = get_queried_object_id();
					$data_params['data-archive-author'] = $author_id;
				}
				if ( is_tag() ) {
					$current_tag_id                  = get_queried_object_id();
					$data_params['data-archive-tag'] = $current_tag_id;
				}
				if ( is_date() ) {
					$day   = get_query_var( 'day' );
					$month = get_query_var( 'monthnum' );
					$year  = get_query_var( 'year' );

					$data_params['data-archive-day']   = $day;
					$data_params['data-archive-month'] = $month;
					$data_params['data-archive-year']  = $year;
				}
			}
			if ( is_search() ) {
				$search_query                              = get_search_query();
				$data_params['data-archive-search-string'] = $search_query; // to do, not finished
			}

			foreach ( $data_params as $key => $value ) {
				if ( $key !== '' ) {
					$data_return_string .= $key . '= ' . esc_attr( $value ) . ' ';
				}
			}

			return $data_return_string;

		}
	}
}

if ( ! function_exists( 'barista_edge_enable_load_more' ) ) {
	/**
	 * Function that check if load more is enabled
	 *
	 * return boolean
	 */
	function barista_edge_enable_load_more() {
		$enable_load_more = false;

		if ( barista_edge_options()->getOptionValue( 'enable_load_more_pag' ) == 'yes' ) {
			$enable_load_more = true;
		}

		return $enable_load_more;
	}
}
if ( ! function_exists( 'barista_edge_is_masonry_template' ) ) {
	/**
	 * Check if is masonry template enabled
	 * return boolean
	 */
	function barista_edge_is_masonry_template() {

		$page_id               = barista_edge_get_page_id();
		$page_template         = get_page_template_slug( $page_id );
		$page_options_template = barista_edge_options()->getOptionValue( 'blog_list_type' );

		if ( ! is_archive() ) {
			if ( $page_template == 'blog-masonry.php' || $page_template == 'blog-masonry-full-width.php' ) {
				return true;
			}
		} elseif ( is_archive() || is_home() ) {
			if ( $page_options_template == 'masonry' || $page_options_template == 'masonry-full-width' ) {
				return true;
			}
		} else {
			return false;
		}
	}


}

if ( ! function_exists( 'barista_edge_set_ajax_url' ) ) {
	/**
	 * load themes ajax functionality
	 *
	 */
	function barista_edge_set_ajax_url() {
		echo '<script type="application/javascript">var EdgefAjaxUrl = "' . admin_url( 'admin-ajax.php' ) . '"</script>';
	}

	add_action( 'wp_enqueue_scripts', 'barista_edge_set_ajax_url' );

}

/**
 * Loads more function for blog posts.
 *
 */
if ( ! function_exists( 'barista_edge_blog_load_more' ) ) {
	function barista_edge_blog_load_more() {
		$return_obj       = array();
		$paged            = $post_number = $category = $blog_type = '';
		$archive_category = $archive_author = $archive_tag = $archive_day = $archive_month = $archive_year = '';

		check_ajax_referer( 'edgtf_blog_load_more_nonce_' . sanitize_text_field( $_POST['blog_load_more_id'] ), 'blog_load_more_nonce' );

		if ( ! empty( $_POST['nextPage'] ) ) {
			$paged = $_POST['nextPage'];
		}
		if ( ! empty( $_POST['number'] ) ) {
			$post_number = $_POST['number'];
		}
		if ( ! empty( $_POST['category'] ) ) {
			$category = $_POST['category'];
		}
		if ( ! empty( $_POST['blogType'] ) ) {
			$blog_type = $_POST['blogType'];
		}
		if ( ! empty( $_POST['archiveCategory'] ) ) {
			$archive_category = $_POST['archiveCategory'];
		}
		if ( ! empty( $_POST['archiveAuthor'] ) ) {
			$archive_author = $_POST['archiveAuthor'];
		}
		if ( ! empty( $_POST['archiveTag'] ) ) {
			$archive_tag = $_POST['archiveTag'];
		}
		if ( ! empty( $_POST['archiveDay'] ) ) {
			$archive_day = $_POST['archiveDay'];
		}
		if ( ! empty( $_POST['archiveMonth'] ) ) {
			$archive_month = $_POST['archiveMonth'];
		}
		if ( ! empty( $_POST['archiveYear'] ) ) {
			$archive_year = $_POST['archiveYear'];
		}


		$html        = '';
		$query_array = array(
			'post_type'      => 'post',
			'paged'          => $paged,
			'posts_per_page' => $post_number
		);
		if ( $category != '' ) {
			$query_array['cat'] = $category;
		}
		if ( $archive_category != '' ) {
			$query_array['cat'] = $archive_category;
		}
		if ( $archive_author != '' ) {
			$query_array['author'] = $archive_author;
		}
		if ( $archive_tag != '' ) {
			$query_array['tag'] = $archive_tag;
		}
		if ( $archive_day != '' && $archive_month != '' && $archive_year != '' ) {
			$query_array['day']      = $archive_day;
			$query_array['monthnum'] = $archive_month;
			$query_array['year']     = $archive_year;
		}
		$query_results = new \WP_Query( $query_array );

		if ( $query_results->have_posts() ):
			while ( $query_results->have_posts() ) : $query_results->the_post();
				$html .= barista_edge_get_post_format_html( $blog_type, 'yes' );
			endwhile;
		else:
			$html .= '<p>' . esc_html__( 'Sorry, no posts matched your criteria.', 'baristawp' ) . '</p>';
		endif;

		$return_obj = array(
			'html' => $html,
		);

		echo json_encode( $return_obj );
		exit;
	}
}

add_action( 'wp_ajax_nopriv_barista_edge_blog_load_more', 'barista_edge_blog_load_more' );
add_action( 'wp_ajax_barista_edge_blog_load_more', 'barista_edge_blog_load_more' );

if ( ! function_exists( 'barista_edge_get_max_number_of_pages' ) ) {
	/**
	 * Function that return max number of posts/pages for pagination
	 * @return int
	 *
	 * @version 0.1
	 */
	function barista_edge_get_max_number_of_pages() {
		global $wp_query;

		$max_number_of_pages = 10; //default value

		if ( $wp_query ) {
			$max_number_of_pages = $wp_query->max_num_pages;
		}

		return $max_number_of_pages;
	}
}

if ( ! function_exists( 'barista_edge_get_blog_page_range' ) ) {
	/**
	 * Function that return current page for blog list pagination
	 * @return int
	 *
	 * @version 0.1
	 */
	function barista_edge_get_blog_page_range( $query = '' ) {
		global $wp_query;

		if ( $query == '' ) {
			$query = $wp_query;
		}

		if ( barista_edge_options()->getOptionValue( 'blog_page_range' ) != "" ) {
			$blog_page_range = esc_attr( barista_edge_options()->getOptionValue( 'blog_page_range' ) );
		} else {
			$blog_page_range = $query->max_num_pages;
		}

		return $blog_page_range;
	}
}

if ( ! function_exists( 'barista_edge_comment_form_submit_button' ) ) {
	/**
	 * Override comment form submit button
	 *
	 * @return mixed|string
	 */
	function barista_edge_comment_form_submit_button() {

		$comment_form_button = barista_edge_get_button_html( array(
			'html_type'  => 'input',
			'type'       => 'solid',
			'input_name' => 'submit',
			'text'       => esc_html__( 'Submit', 'baristawp' ),
		) );

		return $comment_form_button;
	}

	add_filter( 'comment_form_submit_button', 'barista_edge_comment_form_submit_button' );

}
?>