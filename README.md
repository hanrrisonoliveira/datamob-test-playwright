# datamob-test-playwright

[![Playwright Tests](https://github.com/hanrrisonoliveira/datamob-test-playwright/actions/workflows/playwright.yml/badge.svg)](https://github.com/hanrrisonoliveira/datamob-test-playwright/actions/workflows/playwright.yml)

Suíte de testes automatizados E2E com **Playwright + TypeScript** para o site público [Automation Exercise](https://automationexercise.com), cobrindo o fluxo de autenticação.

## Cenários de teste

| Cenário | Tipo | O que valida |
|---|---|---|
| **Test Case 2:** Login User with correct email and password | Positivo | Login com credenciais válidas, "Logged in as \<nome\>" e exclusão da conta pela tela ("ACCOUNT DELETED!") |
| **Test Case 3:** Login User with incorrect email and password | Negativo | Login com credenciais inválidas exibe "Your email or password is incorrect!" |
| **Test Case 4:** Logout User | Positivo | Login com usuário válido, logout e retorno à tela de login |

Os cenários seguem a lista oficial do site: <https://automationexercise.com/test_cases>.

> **⚠️ Falha proposital:** o Test Case 3 está configurado para **falhar de propósito**, para gerar evidência de falha (screenshot, vídeo e trace) no relatório. Em vez de validar a mensagem de erro, ele espera que o usuário esteja logado. Para restaurar o comportamento esperado, em [tests/autenticacao.spec.ts](tests/autenticacao.spec.ts) troque `await homePage.validarUsuarioLogado();` pela linha comentada `await loginPage.validarMensagemErroLogin();`.

## Tecnologias

- [Playwright](https://playwright.dev) `@playwright/test`: runner, navegadores e cliente HTTP
- TypeScript
- [Faker](https://fakerjs.dev): geração de massa de teste
- GitHub Actions: pipeline de CI

## Estrutura do projeto

```
├── .github/workflows/
│   └── playwright.yml        # Pipeline de CI (GitHub Actions)
├── src/
│   ├── api/UserApi.ts        # Criação, verificação de login e exclusão de usuários via API
│   ├── data/users.ts         # Gerador de usuários com dados aleatórios (Faker)
│   ├── pages/                # Page Objects
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   └── AccountDeletedPage.ts
│   └── types/user.ts         # Tipo User (corpo esperado pela API de cadastro)
├── tests/
│   └── autenticacao.spec.ts  # Cenários de teste
└── playwright.config.ts      # Configuração do Playwright
```

### Organização

- **Page Object Model:** cada tela é uma classe em `src/pages/`, com os locators e as ações dela. Os testes só descrevem o fluxo; se um seletor mudar, a correção fica em um único lugar.
- **Preparação de dados via API:** os cenários que precisam de um usuário cadastrado criam a conta por `POST /api/createAccount` antes do teste, sem depender do formulário de cadastro. O Test Case 4 também apaga a conta via API (`DELETE /api/deleteAccount`) ao final.
- **Massa de teste isolada:** cada execução gera um usuário novo, com e-mail único (`crypto.randomUUID()`). Por isso os testes podem rodar em paralelo sem disputar a mesma conta.

## Pré-requisitos

- [Node.js](https://nodejs.org) 20 ou superior (o CI usa a versão 24)
- npm
- Git

## Instalação

```bash
git clone https://github.com/hanrrisonoliveira/datamob-test-playwright.git
cd datamob-test-playwright
npm ci
npx playwright install --with-deps
```

O último comando baixa o Chromium, o Firefox e o WebKit usados pelo Playwright. No Windows e no macOS, o `--with-deps` pode ser omitido.

## Execução

| Comando | O que faz |
|---|---|
| `npm test` | Executa a suíte completa nos 3 navegadores, em paralelo |
| `npm run test:chromium` | Executa somente no Chromium |
| `npm run test:firefox` | Executa somente no Firefox |
| `npm run test:webkit` | Executa somente no WebKit (Safari) |
| `npm run test:headed` | Executa no Chromium com o navegador visível |
| `npm run test:ui` | Abre o modo UI do Playwright para executar e inspecionar os testes |
| `npm run test:debug` | Executa no Chromium passo a passo, com o Playwright Inspector |
| `npm run report` | Abre o relatório HTML da última execução |

Para passar argumentos extras ao Playwright, use `--`. Por exemplo, para executar um cenário específico:

```bash
npm run test:chromium -- -g "Test Case 2"
```

## Relatório e evidências

Ao fim de cada execução, o Playwright gera um relatório HTML em `playwright-report/`. Para abrir:

```bash
npm run report
```

Quando um teste falha, ficam guardados também, anexados ao relatório e salvos em `test-results/`:

- **Screenshot** da tela no momento da falha
- **Vídeo** da execução
- **Trace**: linha do tempo com cada ação, os seletores, as requisições de rede e o console. Para abrir: `npx playwright show-trace <caminho>/trace.zip`

## Integração contínua

A pipeline em [.github/workflows/playwright.yml](.github/workflows/playwright.yml) roda:

- a cada **push** e **pull request** na branch `main`;
- **manualmente**, na aba **Actions** → **Playwright Tests** → **Run workflow**.

Cada navegador roda em um job separado e em paralelo (matriz `chromium`, `firefox` e `webkit`). O relatório HTML de cada um é publicado como artefato (`playwright-report-<navegador>`) e fica disponível por 30 dias na página da execução, inclusive quando há falhas.

No CI, a configuração aplica `retries: 2` (até 2 novas tentativas para um teste que falhou) e `forbidOnly` (a execução falha se algum `test.only` tiver sido commitado por engano).

## Observações

- **Site público e instável:** o Automation Exercise carrega muitos anúncios, o que deixa as páginas lentas. Os testes podem chegar perto do limite padrão de 30 segundos por teste, principalmente no modo `--headed`.
- **Contas de teste:** as contas criadas são excluídas ao final dos Test Cases 2 e 4. Se um teste falhar antes da etapa de exclusão, a conta permanece no site; como o e-mail é sempre único, isso não afeta execuções seguintes.
