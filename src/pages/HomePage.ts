import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly loginButton: Locator;
    readonly logoutButton: Locator;
    readonly loggedUser: Locator;
    readonly deleteAccountButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginButton = page.getByRole('link', {name: 'Signup / Login'});
        this.logoutButton = page.getByRole('link', {name: 'Logout'});
        this.loggedUser = page.getByText('Logged in as');
        this.deleteAccountButton = page.getByRole('link', {name: 'Delete Account'});
    }

    async acessarLogin() {
        await this.loginButton.click();
    }

    async validarUsuarioLogado() {
        await expect(this.page.getByText(/Logged in as/)).toBeVisible();
    }

    async validarUsuarioLogadoComo(nome: string) {
        await expect(this.page.getByText(`Logged in as ${nome}`)).toBeVisible();
    }

    async realizarLogout() {
        await this.logoutButton.click();
    }

    async excluirConta() {
        await this.deleteAccountButton.click();
    }

    async validarHomePage() {
        await expect(this.page).toHaveTitle(/Automation Exercise/);
    }

}