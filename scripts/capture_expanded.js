import { chromium } from '@playwright/test';
import path from 'path';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(400);
  await page.locator('.preset-card', { hasText: 'OPENAI' }).click();
  await page.waitForSelector('.investigation-board');
  await page.waitForTimeout(1600);

  // Click on first card
  await page.locator('.evidence-items .evidence-card').first().click();
  await page.waitForTimeout(300);

  await page.screenshot({ path: path.join('./scratch/screenshots', 'expanded_card_view.png') });
  await browser.close();
}

main().catch(console.error);
