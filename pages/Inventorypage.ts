// pages/InventoryPage.ts
import { Page } from '@playwright/test';
import { InteractionHelper } from '../utils/interactionHelper';

export class InventoryPage {
  private cartIcon;
  readonly cartItems;
  private backpackAddToCart;

  constructor(private page: Page) {
    this.backpackAddToCart = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
    // more precise locator
    this.cartIcon = this.page.locator('.shopping_cart_link');
    this.cartItems = this.page.locator('.cart_item');
  }

  async addBackpackToCart() {
    await InteractionHelper.safeClick(this.page, this.backpackAddToCart, 'Add Backpack to Cart');
  }

  async openCart() {
    await InteractionHelper.safeClick(this.page, this.cartIcon, 'Cart Icon');
  }

  async logout() {
    await InteractionHelper.safeClick(this.page, this.page.locator('#react-burger-menu-btn'), 'Menu Button');
    await InteractionHelper.safeClick(this.page, this.page.locator('#logout_sidebar_link'), 'Logout Button');
  }
}
