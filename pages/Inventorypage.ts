// pages/InventoryPage.ts
import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async addBackpackToCart() {
    await this.page.click('button[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  async openCart() {
    await this.page.click('.shopping_cart_link');
  }

  get cartItems() {
    return this.page.locator('.cart_item');
  }

  async logout() {
    await this.page.click('#react-burger-menu-btn');
    await this.page.waitForTimeout(500);
    await this.page.click('#logout_sidebar_link');
  }
}
