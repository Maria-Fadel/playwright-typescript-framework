import { Page } from "@playwright/test";
import { productPageLocators } from "../locators/ProductPageLocators";
import { error } from "node:console";
import { cartPageLocators } from "../locators/cartPageLocator";

export class ProductPage {

    constructor(private page: Page) { }
    async logout() {
        await this.page.click(productPageLocators.burgerMenu);
        await this.page.click(productPageLocators.logoutLink);
    }

    async openAboutPage() {
        await this.page.click(productPageLocators.burgerMenu);
        await this.page.click(productPageLocators.aboutLink)
    }

    async validateAllProductsDieplayed() {
        const names = await this.page.locator(productPageLocators.productNames).allTextContents();
        const descriptions = await this.page.locator(productPageLocators.productDescription).allTextContents();
        const price = await this.page.locator(productPageLocators.productPrices).allTextContents();
        const buttonCount = await this.page.locator(productPageLocators.addToCartButton).count();

        if (names.length === 0) {
            throw new Error("No Product found");
        }
        if (names.length !== descriptions.length || names.length !== price.length || names.length !== buttonCount) {
            throw new Error("mismatch between the product Details");
        }
    }
    async addFirstProductToCart() {
        await this.page.locator(productPageLocators.addToCartButton).first().click();
    }
    async addAllProductToCart() {
        const buttons = this.page.locator(productPageLocators.addToCartButton);
        const count = await buttons.count();
        for (let i = 0; i < count; i++) {
            await buttons.nth(i).click();
        }
    }
    async addSpecificProductToCart(productName: string[]) {
        const allProducts = this.page.locator(productPageLocators.productNames);
        const count = await allProducts.count();
        for (let i = 0; i < count; i++) {
            const name = await allProducts.nth(i).textContent();
            if (name && productName.includes(name.trim())) {
                await this.page.locator(productPageLocators.addToCartButton).nth(i).click();
                await this.page.waitForTimeout(3000);
            }
        }
    }

    async filterByNameAtoZ() {
        await this.page.selectOption(productPageLocators.filterDropdown, "az")
    }
    async filterByNameZtoA() {
        await this.page.selectOption(productPageLocators.filterDropdown, "za")
    }
    async filterByPriceLowToHigh() {
        await this.page.selectOption(productPageLocators.filterDropdown, "lohi")
    }
    async filterByPriceHighToLow() {
        await this.page.selectOption(productPageLocators.filterDropdown, "hilo")
    }

    async getProductNames() {
        return await this.page.locator(productPageLocators.productNames).allTextContents();
    }
    async getProductPrices() {
        const prices = await this.page.locator(productPageLocators.productPrices).allTextContents();
        return prices.map(price => parseFloat(price.replace('$', '')))
    }
    async clickOnCartLink() {
        await this.page.locator(productPageLocators.cartLink).click();
    }
    async getFirstProductsDetails() {
        const name = await this.page.locator(productPageLocators.productNames).first().textContent();
        const description = await this.page.locator(productPageLocators.productDescription).first().textContent();
        const price = await this.page.locator(productPageLocators.productPrices).first().textContent();
        return {
            name: name?.trim(),
            description: description?.trim(),
            price: price?.trim()
        }
    }
    async getAllProductDetails() {
        const allNames = await this.page.locator(productPageLocators.productNames).allTextContents();
        const allDescription = await this.page.locator(productPageLocators.productDescription).allTextContents();
        const allPrice = await this.page.locator(productPageLocators.productPrices).allTextContents();
        // Array of object [{name, description, price}, {}, {}]

        const allProducts = allNames.map((_, i) =>
        ({
            name: allNames[i].trim(),
            description: allDescription[i].trim(),
            price: allPrice[i].trim()
        }))
        return allProducts;

    }
    async getSpecificProductDetails(productName: string[]) {
        const allNames = await this.page.locator(productPageLocators.productNames).allTextContents();console.log(allNames);
        const allDescripitons = await this.page.locator(productPageLocators.productDescription).allTextContents();
        const allPrice = await this.page.locator(productPageLocators.productPrices).allTextContents();
        // Array of object [{name, description, price}, {}, {}]

        const allProducts = allNames.map((_, i) =>
        ({
            name: allNames[i].trim(),
            description: allDescripitons[i].trim(),
            price: allPrice[i].trim()
        }))
        return allProducts.filter(p => productName.includes(p.name));
    }
    
}