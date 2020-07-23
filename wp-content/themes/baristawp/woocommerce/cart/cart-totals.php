<?php
/**
 * Cart totals
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/cart/cart-totals.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see 	    https://docs.woothemes.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     2.3.6
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<div class="cart_totals <?php if ( WC()->customer->has_calculated_shipping() ) echo 'calculated_shipping'; ?>">

	<?php do_action( 'woocommerce_before_cart_totals' ); ?>

	<h3><?php esc_html_e( 'Сумма Корзины', 'baristawp' ); ?></h3>

	<div class="edgtf-total-pricing clearfix">

		<!--<div class="cart-subtotal">
			<h4><?php esc_html_e( 'Subtotal:', 'baristawp' ); ?></h4>
			<span data-title="<?php esc_attr_e( 'Subtotal', 'baristawp' ); ?>"><?php wc_cart_totals_subtotal_html(); ?></span>
		</div> -->

		<?php foreach ( WC()->cart->get_coupons() as $code => $coupon ) : ?>
			<div class="cart-discount coupon-<?php echo esc_attr( sanitize_title( $code ) ); ?>">
				<h4><?php wc_cart_totals_coupon_label( $coupon ); ?></h4>
				<span data-title="<?php echo esc_attr( wc_cart_totals_coupon_label( $coupon, false ) ); ?>"><?php wc_cart_totals_coupon_html( $coupon ); ?></span>
			</div>
		<?php endforeach; ?>

		<?php if ( WC()->cart->needs_shipping() && WC()->cart->show_shipping() ) : ?>

			<?php do_action( 'woocommerce_cart_totals_before_shipping' ); ?>

			<?php wc_cart_totals_shipping_html(); ?>

			<?php do_action( 'woocommerce_cart_totals_after_shipping' ); ?>

		<?php elseif ( WC()->cart->needs_shipping() ) : ?>

			<div class="shipping">
				<h4><?php esc_html_e( 'Shipping:', 'baristawp' ); ?></h4>
				<span data-title="<?php esc_attr_e( 'Shipping', 'baristawp' ); ?>"><?php woocommerce_shipping_calculator(); ?></span>
			</div>

		<?php endif; ?>

		<?php foreach ( WC()->cart->get_fees() as $fee ) : ?>
			<div class="fee">
				<h4><?php echo esc_html( $fee->name ); ?></h4>
				<span data-title="<?php echo esc_attr( $fee->name ); ?>"><?php wc_cart_totals_fee_html( $fee ); ?></span>
			</div>
		<?php endforeach; ?>
<?php if ( wc_tax_enabled() && 'excl' === WC()->cart->tax_display_cart ) :
			$taxable_address = WC()->customer->get_taxable_address();
			$estimated_text  = WC()->customer->is_customer_outside_base() && ! WC()->customer->has_calculated_shipping()
					? sprintf( ' <small>(' . esc_html__( 'estimated for %s', 'baristawp' ) . ')</small>', WC()->countries->estimated_for_prefix( $taxable_address[0] ) . WC()->countries->countries[ $taxable_address[0] ] )
					: '';

			if ( 'itemized' === get_option( 'woocommerce_tax_total_display' ) ) : ?>
				<?php foreach ( WC()->cart->get_tax_totals() as $code => $tax ) : ?>
					<div class="tax-rate tax-rate-<?php echo sanitize_title( $code ); ?>">
						<h4><?php echo esc_html( $tax->label ) . $estimated_text; ?></h4>
						<span data-title="<?php echo esc_attr( $tax->label ); ?>"><?php echo wp_kses_post( $tax->formatted_amount ); ?></span>
					</div>
				<?php endforeach; ?>
			<?php else : ?>
				<div class="tax-total">
					<h4><?php echo esc_html( WC()->countries->tax_or_vat() ) . $estimated_text; ?></h4>
					<span data-title="<?php echo esc_attr( WC()->countries->tax_or_vat() ); ?>"><?php wc_cart_totals_taxes_total_html(); ?></span>
				</div>
			<?php endif; ?>
		<?php endif; ?>

		<?php do_action( 'woocommerce_cart_totals_before_order_total' ); ?>

		<div class="order-total">
			<h4><?php _e( 'Сумма', 'baristawp' ); ?></h4>
			<span data-title="<?php esc_attr_e( 'Total', 'baristawp' ); ?>"><?php wc_cart_totals_order_total_html(); ?></span>
		</div>

		<?php do_action( 'woocommerce_cart_totals_after_order_total' ); ?>

	</div>


	<?php do_action( 'woocommerce_after_cart_totals' ); ?>

</div>
