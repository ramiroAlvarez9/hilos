import { chromium } from '@playwright/test';

async function testViewport(width, height) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();

  await page.goto('http://localhost:5173');
  await page.waitForTimeout(300);
  await page.locator('.preset-card', { hasText: 'OPENAI' }).click();
  await page.waitForSelector('.investigation-board');
  await page.waitForTimeout(400);

  const getMetrics = async () => {
    return await page.evaluate(() => {
      const board = document.querySelector('.investigation-board')?.getBoundingClientRect();
      const cardCount = document.querySelectorAll('.evidence-items .evidence-card').length;
      return {
        x: board?.x,
        y: board?.y,
        w: board?.width,
        h: board?.height,
        cardCount,
      };
    });
  };

  const initial = await getMetrics();

  // Quitar 3 capas
  await page.locator('.layer-chip', { hasText: 'Masónica' }).click();
  await page.locator('.layer-chip', { hasText: 'Saturno' }).click();
  await page.locator('.layer-chip', { hasText: 'Reptiliana' }).click();
  await page.waitForTimeout(300);
  const reduced = await getMetrics();

  // Reactivar capas
  await page.locator('.layer-chip', { hasText: 'Masónica' }).click();
  await page.locator('.layer-chip', { hasText: 'Saturno' }).click();
  await page.locator('.layer-chip', { hasText: 'Reptiliana' }).click();
  await page.waitForTimeout(300);
  const restored = await getMetrics();

  const diffY_reduced = Math.abs(reduced.y - initial.y);
  const diffY_restored = Math.abs(restored.y - initial.y);

  console.log(`Viewport ${width}x${height}:`);
  console.log(`  - 14 cards (inicial) -> y: ${initial.y}px, w: ${initial.w}px, h: ${initial.h}px`);
  console.log(`  - 2 cards  (reducido) -> y: ${reduced.y}px, diff: ${diffY_reduced}px`);
  console.log(`  - 14 cards (restored) -> y: ${restored.y}px, diff: ${diffY_restored}px`);

  if (diffY_reduced <= 0.5 && diffY_restored <= 0.5) {
    console.log(`  ✅ PASÓ (Invariable)\n`);
  } else {
    console.error(`  ❌ FALLÓ: hubo movimiento vertical de ${diffY_reduced}px\n`);
  }

  await browser.close();
}

async function main() {
  console.log('=== TEST MULTI-RESOLUCIÓN DE ESTABILIDAD DE IMAGEN ===\n');
  await testViewport(1920, 1080);
  await testViewport(1440, 900);
  await testViewport(1280, 800);
  await testViewport(1024, 768);
}

main().catch(console.error);
