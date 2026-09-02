import { chromium } from '@playwright/test';
import path from 'path';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(400);

  // Scroll to presets section
  const grid = page.locator('.trends-section');
  await grid.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  await grid.screenshot({ path: path.join('./scratch/screenshots', 'home_grid_fixed.png') });
  await browser.close();
}

main().catch(console.error);
