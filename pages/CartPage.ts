import { Page } from "@playwright/test"
import { cartPageLocators } from "../locators/cartPageLocator"

export class CartPage {
    constructor(private page: Page) { }

    async clickOnContinuesShopping() {
        await this.page.locator(cartPageLocators.continuesShoppingButton).click();
    }
    async getCartPageElements() {
        return {
            cartTitle: this.page.locator(cartPageLocators.cartTitle),
            shoppingCart: this.page.locator(cartPageLocators.continuesShoppingButton),
            checkOut: this.page.locator(cartPageLocators.checkOutButton)
        }
    }
    async getAllCartProducts() {
        const allNames = await this.page.locator(cartPageLocators.productNames).allTextContents();
        const allDescription = await this.page.locator(cartPageLocators.productDescription).allTextContents();
        const allPrice = await this.page.locator(cartPageLocators.productPrices).allTextContents();
        // Array of object [{name, description, price}, {}, {}]

        const allCartProducts = allNames.map((_, i) =>
        ({
            name: allNames[i].trim(),
            description: allDescription[i].trim(),
            price: allPrice[i].trim()
        }))
        return allCartProducts;

    }
    async removeFirstProduct() {
        await this.page.locator(cartPageLocators.removeButton).first().click();
    }
    async clickCheckoutButton(){
        await this.page.locator(cartPageLocators.checkOutButton).click();
    }
}