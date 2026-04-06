import { Page } from '@playwright/test';
export const productPageLocators = {
    burgerMenu: "#react-burger-menu-btn",
    logoutLink: "#logout_sidebar_link",
    aboutLink: "#about_sidebar_link",
    requestDemoButton: (page: Page) =>
        page.getByRole('button', { name: 'Request a demo' }),

    tryItFreeButton: (page: Page) =>
        page.getByRole('button', { name: 'Try it free' }),
    productNames : ".inventory_item_name ",
    productDescription:".inventory_item_desc",
    productPrices:".inventory_item_price",
    addToCartButton:".btn.btn_small.btn_inventory",
    filterDropdown : ".product_sort_container",
    filterNameAtoZ:"option[value='az']",
    filterNameZtoA:"option[value='za']",
    filterPriceLowToHigh:"option[value='lohi']",
    filterPriceHighToLow:"option[value='hilo']",
    cartLink :'.shopping_cart_link'

};