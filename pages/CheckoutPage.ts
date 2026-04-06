import { Page } from "@playwright/test";
import { checkoutPageLocators } from "../locators/checkoutPageLocators";

export class CheckoutPage
{
    constructor(private page: Page){}

    async getCheckoutElements()
    {
        return {
            pageInfo : this.page.locator(checkoutPageLocators.pageInfo),
            cancel : this.page.locator(checkoutPageLocators.cancelButton),
            continue : this.page.locator(checkoutPageLocators.continueButton)
        }
    }

    async fillCheckoutDetail(firstName : string, lastName : string, postalCode : string)
    {
        await this.page.fill(checkoutPageLocators.firstName,firstName);
        await this.page.fill(checkoutPageLocators.lastName,lastName);
        await this.page.fill(checkoutPageLocators.postalcoe,postalCode);
    }
    async clickCancel()
    {
        await this.page.click(checkoutPageLocators.cancelButton);
    }
    async clickOnContinue()
    {
        await this.page.click(checkoutPageLocators.continueButton);
    }

    async getErrorMessage()
    {
        return await this.page.locator(checkoutPageLocators.errorMsg).textContent();
    }
}