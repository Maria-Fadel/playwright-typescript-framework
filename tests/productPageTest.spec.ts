import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig';
import { LoginLocators } from '../locators/LoginLocators';
import { productPageLocators } from '../locators/ProductPageLocators';
import { productsToCart } from '../test-data/products';

test.describe("product page validation", () => {
    console.log("product page validation");
    let loginPage: LoginPage;
    let productpage: ProductPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productpage = new ProductPage(page);

        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    })


    test("validate logout fuctionality ", async ({ page }) => {
        await productpage.logout();
        await expect(page.locator(LoginLocators.loginButton)).toBeVisible();
    })
    test("validate About Page and navigate back", async ({ page }) => {
        await productpage.openAboutPage();
        await expect(productPageLocators.requestDemoButton(page)).toBeVisible();
        await expect(productPageLocators.tryItFreeButton(page)).toBeVisible();
        await page.goBack();
        await expect(page.locator(productPageLocators.burgerMenu)).toBeVisible();

    })

    test("validate product page", async ({ page }) => {
        await productpage.validateAllProductsDieplayed();
        await productpage.addFirstProductToCart();
    })


    test("validate adding spesific product to cart", async ({ page }) => {
        await productpage.addSpecificProductToCart(productsToCart);
    })

    test("Filer By Name A to Z", async ({ page }) => {
        await productpage.filterByNameAtoZ();
        const names =await productpage.getProductNames();
        const sorted = [...names].sort();
        expect(names).toEqual(sorted);
    })
    test("Filer By Name Z to A", async ({ page }) => {
        await productpage.filterByNameZtoA();
        const names =await productpage.getProductNames();
        const sorted = [...names].sort().reverse();
        expect(names).toEqual(sorted);
    })
    test("Filer By Price Low to High", async ({ page }) => {
        await productpage.filterByPriceLowToHigh();
        const preices = await productpage.getProductPrices();
        const sortedPreice =[...preices].sort((a,b) => a-b)
        expect(preices).toEqual(sortedPreice);
    })
    test("Filer By Name High to Low", async ({ page }) => {
             await productpage.filterByPriceHighToLow();
        const preices = await productpage.getProductPrices();
        const sortedPreice =[...preices].sort((a,b) => b-a)
        expect(preices).toEqual(sortedPreice);
    })
})




test('login to sauceDemo application with vaild credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD)

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
});