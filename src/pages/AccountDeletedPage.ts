import { Page, Locator, expect } from '@playwright/test';

export class AccountDeletedPage {
    readonly page: Page;
    readonly accountDeletedTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.accountDeletedTitle = page.getByText('Account Deleted!');
    }

    async validarContaExcluida() {
        await expect(this.accountDeletedTitle).toBeVisible();
    }
}
