import { test, expect } from '@playwright/test';
test('Login via API then check UI', async ({ request, page }) => {
    const loginResponse = await request.post('/api/login', {
      data: { username: 'standard_user', password: 'secret_sauce' }
    });
  
    const { token } = await loginResponse.json();
  
    // Set auth token in storage
    await page.addInitScript((token) => {
      window.localStorage.setItem('token', token);
    }, token);
  
    await page.goto('/inventory.html');
    await expect(page.locator('.inventory_item')).toBeVisible();
  });
  