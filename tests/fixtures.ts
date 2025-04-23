import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/Loginpage';
import { InventoryPage } from '../pages/Inventorypage';

type MyFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
});

export { expect } from '@playwright/test';
