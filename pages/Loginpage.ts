// pages/LoginPage.ts
import { Page } from '@playwright/test';
import { InteractionHelper } from '../utils/interactionHelper';

export class LoginPage {
  private username;
  private password;
  readonly loginButton;

  constructor(private page: Page) {
    this.username = this.page.locator('#user-name');
    this.password = this.page.locator('#password');
    this.loginButton = this.page.locator('#login-button');
  }

  async goto() {
    await InteractionHelper.safeGoto(this.page, 'https://www.saucedemo.com/', 'Login Page');
  }

  async login(user: string, pass: string) {
    await InteractionHelper.safeFill(this.page, this.username, user, 'Username');
    await InteractionHelper.safeFill(this.page, this.password, pass, 'Password');
    await InteractionHelper.safeClick(this.page, this.loginButton, 'Login Button');
  }

  async saveStorageState() {
    await this.page.context().storageState({ path: './state/storageState.json' });
  }
}
