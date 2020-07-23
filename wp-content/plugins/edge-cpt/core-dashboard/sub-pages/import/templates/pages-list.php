<label class="edgtf-cd-label"><?php esc_html_e('Select Page To Import', 'edge-cpt'); ?></label>
<select name="import_single_page" id="import_single_page"  class="edgtf-cd-import-single-page">
	<?php
	foreach ($pages as $page => $page_value){ ?>
		<option value="<?php echo esc_attr($page); ?>"><?php echo esc_attr($page_value); ?></option>
	<?php }
	?>
</select>