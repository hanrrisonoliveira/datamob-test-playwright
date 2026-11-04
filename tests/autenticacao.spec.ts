import { test, expect } from '@playwright/test';
import { HomePage } from '../src/pages/HomePage';
import { LoginPage } from '../src/pages/LoginPage';
import { UserApi } from '../src/api/UserApi';
import { gerarUsuario } from '../src/data/users';

test.describe('Test Case 4: Logout User', () => {
    test('Deve realizar logout com sucesso', async ({ page, request }) => {

        const homePage = new HomePage(page);
        const loginPage = new LoginPage(page);
        const userApi = new UserApi(request);
        const usuario = gerarUsuario();

        await userApi.criarUsuario(usuario);
        await userApi.verificarLogin(usuario.email, usuario.password);
        await page.goto('/login');
        await loginPage.preencherLogin(usuario.email, usuario.password);
        await loginPage.realizarLogin();
        await homePage.validarUsuarioLogado();
        await homePage.realizarLogout();
        await expect(page).toHaveURL(/\/login$/);
        await loginPage.validarTelaLogin();
        await userApi.deletarUsuario(usuario.email, usuario.password);

    });
});