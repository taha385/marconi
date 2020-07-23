<?php

if (!defined('ABSPATH')) {
    exit;
}

use Coderun\BuyOneClick\Help;
use Coderun\BuyOneClick\BuyCore;

class BuyShortcode {

    protected $options = array();

    /**
     * Кнопка купить
     * Возможно размещение только в цикле вывода товаров
     */
    public function __construct() {

        $this->options = Help::getInstance()->get_options();

        if (!shortcode_exists('viewBuyButton')) {
            add_shortcode('viewBuyButton', array($this, 'viewBuyButton'));
        }
        if (!shortcode_exists('viewBuyButtonCustom')) {
            add_shortcode('viewBuyButtonCustom', array($this, 'viewBuyButtonCustom'));
        }
    }

    /**
     * Класическая кнопка покупки в один клик
     * Используется везде где можно получить ИД товара из Объекта WP
     * @return string
     */
    public function viewBuyButton() {
        $buyoptions = $this->options['buyoptions'];
        
        if (!empty($buyoptions['enable_button_shortcod']) and $buyoptions['enable_button_shortcod'] == 'on') {
            $core = BuyCore::getInstance();
            $core->styleAddFrontPage();
            $core->scriptAddFrontPage();
            return BuyFunction::viewBuyButton(true);
        } else {
            return '';
        }
    }

    /**
     * @param array $arParams id - код товара, name- наименование, count-количество,price- цена(число)
     * Кнопка с возможностью передать параметры
     */
    public function viewBuyButtonCustom($arParams) {
        $buyoptions = $this->options['buyoptions'];
        if (!empty($buyoptions['enable_button_shortcod']) and $buyoptions['enable_button_shortcod'] == 'on') {
            $arParams = shortcode_atts(array(
                'id' => '1',
                'name' => 'noname',
                'count' => 1,
                'price' => 5,
                    ), $arParams);
            $core = BuyCore::getInstance();
            $core->styleAddFrontPage();
            $core->scriptAddFrontPage();
            return BuyFunction::viewBuyButtonCustrom($arParams);
        } else {
            return '';
        }
    }

}
