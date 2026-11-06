import { test, expect } from '../src/fixtures/fixtures';
import { gerarUsuario } from '../src/data/users';

test.describe('Test Case 2: Login User with correct email and password', () => {
    test('Deve realizar login com sucesso e excluir a conta', async ({ page, homePage, loginPage, accountDeletedPage, userApi }) => {
        const usuario = gerarUsuario();

        await userApi.criarUsuario(usuario);
        await page.goto('/');
        await homePage.validarHomePage();
        await homePage.acessarLogin();
        await loginPage.validarTelaLogin();
        await loginPage.preencherLogin(usuario.email, usuario.password);
        await loginPage.realizarLogin();
        await homePage.validarUsuarioLogadoComo(usuario.name);
        await homePage.excluirConta();
        await accountDeletedPage.validarContaExcluida();

    });
});

test.describe('Test Case 3: Login User with incorrect email and password', () => {
    test('Deve exibir erro ao logar com e-mail e senha incorretos', async ({ page, homePage, loginPage }) => {

        await page.goto('/');
        await homePage.validarHomePage();
        await homePage.acessarLogin();
        await loginPage.validarTelaLogin();
        await loginPage.preencherLogin("usernaoencontrado@example.com", "senhaInvalida");
        await loginPage.realizarLogin();
        // FALHA PROPOSITAL para gerar evidência: com credenciais inválidas o site não loga,
        // então "Logged in as" nunca aparece. Para voltar ao normal, use:
        // await loginPage.validarMensagemErroLogin();
        await homePage.validarUsuarioLogado();

    });
});

test.describe('Test Case 4: Logout User', () => {
    test('Deve realizar logout com sucesso', async ({ page, homePage, loginPage, userApi }) => {
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
