import { test, expect } from '@playwright/test'
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig'
import { ProductPage } from '../pages/ProductPage'
import { LoginPage } from '../pages/LoginPage'
import { LoginLocators } from '../locators/LoginLocators'
import { productPageLocators } from '../locators/ProductPageLocators'
import { productsToCart } from '../test-data/products'
import { CartPage } from '../pages/CartPage'


test.describe("Cart Page Validation", () => {
    console.log("Cart Page Validation");
    let loginPage: LoginPage
    let productPage: ProductPage
    let cartPage: CartPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page)

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    })

    test("Validate cart page URL and UI Elements", async ({ page }) => {
        await productPage.addFirstProductToCart();
        await productPage.clickOnCartLink();
        await expect(page).toHaveURL("https://www.saucedemo.com/cart.html")
        const ui = cartPage.getCartPageElements()
        await expect((await ui).cartTitle).toBeVisible();
        expect((await ui).shoppingCart).toBeVisible();
        expect((await ui).checkOut).toBeVisible();
    })
    test("Validate Continue Shopping Functionality", async ({ page }) => {
        await productPage.addFirstProductToCart();
        await productPage.clickOnCartLink();
        await cartPage.clickOnContinuesShopping();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })
    test("Validate First Product in the Cart Page", async ({ page }) => {
        const firstProduct = await productPage.getFirstProductsDetails();
        await productPage.addFirstProductToCart();
        await productPage.clickOnCartLink();
        await page.waitForTimeout(2000)
        const cartProducts = await cartPage.getAllCartProducts();
        expect(cartProducts[0]).toEqual(firstProduct);

    })
    test("Validate All Products added to the Cart Page", async ({ page }) => {
        const allProductsDetails = await productPage.getAllProductDetails();
        await productPage.addAllProductToCart();
        await productPage.clickOnCartLink();
        const cartProducts = await cartPage.getAllCartProducts();
        expect(cartProducts).toEqual(allProductsDetails);

    })
    test("Validate Specfic Products added to the Cart Page", async ({ page }) => {
        const getSpecificProductDetails = await productPage.getSpecificProductDetails(productsToCart); // add 3 products to cart
        await productPage.addSpecificProductToCart(productsToCart);
        await productPage.clickOnCartLink();
        const cartProducts = await cartPage.getAllCartProducts();
        expect(cartProducts).toEqual(getSpecificProductDetails);
    })
    test("Validate Remove Product functionality", async ({ page }) => {
        await productPage.addAllProductToCart();
        await productPage.clickOnCartLink();

        const initialProducts = await cartPage.getAllCartProducts();
        expect(initialProducts.length).toBeGreaterThan(0)
        await cartPage.removeFirstProduct();

        const updatedCartProducts = await cartPage.getAllCartProducts();
        expect(updatedCartProducts.length).toBe(initialProducts.length - 1);
    })
})