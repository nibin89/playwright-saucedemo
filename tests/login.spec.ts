import { test, expect } from '@playwright/test';

test.describe('SauceDemo Functional Tests', () => {
  
  const baseURL = 'https://www.saucedemo.com/';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test('Valid Login', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test('Invalid Login shows error message', async ({ page }) => {
    await page.fill('#user-name', 'invalid_user');
    await page.fill('#password', 'wrong_pass');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  });

  test('Add Sauce Labs Backpack to cart', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('.shopping_cart_link');

    await expect(page.locator('.cart_item')).toContainText('Sauce Labs Backpack');
  });

  test('Logout after login', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await page.click('#react-burger-menu-btn');
    await page.waitForTimeout(500); // wait for menu animation
    await page.click('#logout_sidebar_link');

    await expect(page).toHaveURL(baseURL);
    await expect(page.locator('#login-button')).toBeVisible();
  });

});

