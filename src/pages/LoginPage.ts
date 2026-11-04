import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly loginTitle: Locator;
    readonly loginErrorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('[data-qa="login-email"]');
        this.passwordInput = page.locator('[data-qa="login-password"]');
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.loginTitle = page.getByText('Login to your account');
        this.loginErrorMessage = page.getByText('Your email or password is incorrect!');
    }

    async preencherLogin(email: string, senha: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(senha);
    }

    async realizarLogin() {
        await this.loginButton.click();
    }

    async validarTelaLogin() {
        await expect(this.loginTitle).toBeVisible();
    }

    async validarMensagemErroLogin() {
        await expect(this.loginErrorMessage).toBeVisible();
    }
}