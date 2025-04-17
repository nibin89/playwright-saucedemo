// tests/auth.setup.ts
import { chromium } from '@playwright/test';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  // Create folder if it doesn't exist
  if (!fs.existsSync('./state')) {
    fs.mkdirSync('./state');
  }

  // Save storage state
  await page.context().storageState({ path: './state/storageState.json' });

  console.log('✅ Storage state saved to ./state/storageState.json');
  await browser.close();
})();
