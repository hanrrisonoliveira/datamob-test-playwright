import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly loginButton: Locator;
    readonly logoutButton: Locator;
    readonly loggedUser: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('link', {name: 'Signup / Login'});
        this.logoutButton = page.getByRole('link', {name: 'Logout'});
        this.loggedUser = page.getByText('Logged in as');
    }

    async acessarLogin() {
        await this.loginButton.click();
    }

    async validarUsuarioLogado() {
        await expect(this.page.getByText(/Logged in as/)).toBeVisible();
    }

    async realizarLogout() {
        await this.logoutButton.click();
    }

    async validarHomePage() {
        await expect(this.page).toHaveTitle(/Automation Exercise/);
    }

}