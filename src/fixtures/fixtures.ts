import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { AccountDeletedPage } from '../pages/AccountDeletedPage';
import { UserApi } from '../api/UserApi';

type Fixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    accountDeletedPage: AccountDeletedPage;
    userApi: UserApi;
};

export const test = base.extend<Fixtures>({
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    accountDeletedPage: async ({ page }, use) => {
        await use(new AccountDeletedPage(page));
    },
    userApi: async ({ request }, use) => {
        await use(new UserApi(request));
    },
});

export { expect };
