import { Page } from "@playwright/test";
import { checkoutOverviewPageLocators } from "../locators/checkoutOverviewLocators"; 

export class CheckoutOverviewPage
{
    constructor(private page: Page){}

    async getCheckoutOverviewElements()
    {
        return {
            pageInfo : this.page.locator(checkoutOverviewPageLocators.pageInfo),
            cancel : this.page.locator(checkoutOverviewPageLocators.cancelButton),
            continue : this.page.locator(checkoutOverviewPageLocators.finishButton)
        }
    }
async getAllOverviewProducts() {
        const allNames = await this.page.locator(checkoutOverviewPageLocators.productNames).allTextContents();
        const allDescription = await this.page.locator(checkoutOverviewPageLocators.productDescription).allTextContents();
        const allPrice = await this.page.locator(checkoutOverviewPageLocators.productPrices).allTextContents();
        // Array of object [{name, description, price}, {}, {}]

        const allCartProducts = allNames.map((_, i) =>
        ({
            name: allNames[i].trim(),
            description: allDescription[i].trim(),
            price: allPrice[i].trim()
        }))
        return allCartProducts;

    }
    async getItemTotal()
    {
        const itemTotalText = await this.page.locator(checkoutOverviewPageLocators.itemTotal).textContent();
        const itemTotal = parseFloat(itemTotalText?.replace("Item total: $", "").trim() || "0");
        return itemTotal;
    }

    async getTax()
    {
        const taxText = await this.page.locator(checkoutOverviewPageLocators.tax).textContent();
        const tax = parseFloat(taxText?.replace("Tax: $", "").trim() || "0");
        return tax;
    }   
    async getTotal()
    {
        const totalText = await this.page.locator(checkoutOverviewPageLocators.total).textContent();
        const total = parseFloat(totalText?.replace("Total: $", "").trim() || "0");
        return total;
    }

    async clickOnCancel()
    {
        await this.page.click(checkoutOverviewPageLocators.cancelButton);
    }
      async clickOnFinish()
    {
        await this.page.click(checkoutOverviewPageLocators.finishButton);
    }
}