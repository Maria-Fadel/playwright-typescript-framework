import { test, expect} from '@playwright/test'
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfig'
import { ProductPage } from '../pages/ProductPage'
import { LoginPage } from '../pages/LoginPage'
//import { LoginLocators } from '../locators/LoginLocators'
import { CartPage } from '../pages/CartPage'
import { CheckoutPage } from '../pages/CheckoutPage'
import { checkoutData } from '../test-data/checkoutData'
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage'

test.describe("Checkout Overview Page Validation", () => {
    console.log("Checkout Overview Page Validatio");
    let loginPage: LoginPage
    let productPage: ProductPage
    let cartPage : CartPage
    let checkoutPage : CheckoutPage
    let checkoutOverviewPage : CheckoutOverviewPage
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page)
        checkoutPage = new CheckoutPage(page)
        checkoutOverviewPage = new CheckoutOverviewPage(page)


        await page.goto(BASE_URL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        await productPage.addFirstProductToCart();
        await productPage.clickOnCartLink();
        await cartPage.clickCheckoutButton();
        await checkoutPage.fillCheckoutDetail(checkoutData.firstName, checkoutData.lastName, checkoutData.postalcode);
        await checkoutPage.clickOnContinue();
    })

    test("Validate Checkout Overview Page UI Elements and url", async({page})=>
    {
        //await cartPage.clickCheckoutButton();
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
        const elements = await checkoutOverviewPage.getCheckoutOverviewElements();
        await expect(elements.cancel).toBeVisible();
        await expect(elements.pageInfo).toBeVisible();
         await expect(elements.continue).toBeVisible();
    })
     test("Validate Cancel button Functionality", async({page})=>
    {
        await checkoutOverviewPage.clickOnCancel();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html")
    })
 test("Validate Item Total calculation", async({page})=>
{
    const overviewProducts = await checkoutOverviewPage.getAllOverviewProducts(); 
    const calculatedTotal = overviewProducts.reduce((sum, {price}) => sum + parseFloat(price.replace("$","" )), 0)
    const UIItemTotal = await checkoutOverviewPage.getItemTotal();
    expect(calculatedTotal).toBe(UIItemTotal)
})
test("Validate Final Toal (ItemTotal + Tax)", async({page})=>
{
    const itemTotal = await checkoutOverviewPage.getItemTotal();
    const tax = await checkoutOverviewPage.getTax();
    const finalTotal = await checkoutOverviewPage.getTotal();

    const expectedFinalTotal = itemTotal + tax; 
    expect(finalTotal).toBe(expectedFinalTotal)
})
})