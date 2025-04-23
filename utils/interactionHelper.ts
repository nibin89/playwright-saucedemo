// utils/interactionHelper.ts
import { Locator, Page, expect } from '@playwright/test';

export class InteractionHelper {
  static async safeClick(page: Page, locator: Locator, stepDesc: string) {
    try {
      await locator.click();
      console.log(`✅ Clicked: ${stepDesc}`);
    } catch (err) {
      console.error(`❌ Click Failed: ${stepDesc}`, err);
      await page.screenshot({ path: `error-click-${stepDesc}-${Date.now()}.png` });
      throw err;
    }
  }

  static async safeFill(page: Page, locator: Locator, value: string, stepDesc: string) {
    try {
      await locator.fill(value);
      console.log(`✅ Filled: ${stepDesc} with "${value}"`);
    } catch (err) {
      console.error(`❌ Fill Failed: ${stepDesc}`, err);
      await page.screenshot({ path: `error-fill-${stepDesc}-${Date.now()}.png` });
      throw err;
    }
  }

  static async safeGoto(page: Page, url: string, stepDesc: string) {
    try {
      await page.goto(url);
      console.log(`✅ Navigated: ${stepDesc}`);
    } catch (err) {
      console.error(`❌ Navigation Failed: ${stepDesc}`, err);
      await page.screenshot({ path: `error-goto-${stepDesc}-${Date.now()}.png` });
      throw err;
    }
  }

  static async safeExpect(page: Page, locator: Locator, expectFn: (l: Locator) => Promise<void>, stepDesc: string) {
    try {
      await expectFn(locator);
      console.log(`✅ Expect Passed: ${stepDesc}`);
    } catch (err) {
      console.error(`❌ Expect Failed: ${stepDesc}`, err);
      await page.screenshot({ path: `error-expect-${stepDesc}-${Date.now()}.png` });
      throw err;
    }
  }
}
