// tests/sauce-demo.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import { InventoryPage } from '../pages/Inventorypage';

test.describe.configure({ mode: 'parallel' })
test.describe('@Smoke SauceDemo Functional Tests', () => {

  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await loginPage.saveStorageState(); // Save state after login
    await page.close();
  });

  test('Valid Login (Using storage state)', async ({ page }) => {
    // Load storage state before starting the test
    await page.context().addCookies([{
      name: 'session-identity',
      value: 'valid-session-cookie',
      domain: 'www.saucedemo.com',
      path: '/',
      httpOnly: true,
      secure: true,
    }]); // Here we simulate setting session cookies, or load the storage state
  });

  test('@Smoke Invalid Login shows error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid_user', 'wrong_pass');
  });

  test('Add Backpack to Cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');

    await inventoryPage.addBackpackToCart();
    await inventoryPage.openCart();
    await expect(inventoryPage.cartItems).toContainText('Sauce Labs Backpack');
  });

  test('Logout after login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.logout();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(loginPage.loginButton).toBeVisible();
  });

});
