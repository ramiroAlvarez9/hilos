import { test, expect } from '@playwright/test';

test.describe('Comprobación de Integridad de Textos en Home y Presets', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.presets-grid');
  });

  test('1. El tag de expedientes no debe mostrar texto obsoleto (WIKI LIVE)', async ({ page }) => {
    const liveTag = page.locator('.live-tag');
    await expect(liveTag).toBeVisible();
    const tagText = await liveTag.textContent();
    expect(tagText).not.toContain('WIKI LIVE');
    expect(tagText).toContain('BASE DE DATOS');
  });

  test('2. Todas las tarjetas de presets deben mostrar sus textos completos sin recortes ni desbordamientos', async ({ page }) => {
    const cards = page.locator('.preset-card');
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(6);

    for (let i = 0; i < count; i++) {
      const card = cards.nth(i);

      // 1. Nombre del logo
      const nameEl = card.locator('.preset-name');
      await expect(nameEl).toBeVisible();
      const nameText = await nameEl.textContent();
      expect(nameText.length).toBeGreaterThan(2);

      // 2. Facción (debe leerse completa sin truncamiento)
      const factionEl = card.locator('.preset-faction');
      await expect(factionEl).toBeVisible();
      const factionText = await factionEl.textContent();
      expect(factionText.length).toBeGreaterThan(5);

      // 3. Subtítulo / Pregunta conspirativa (no debe tener texto roto)
      const queryEl = card.locator('.preset-query');
      await expect(queryEl).toBeVisible();
      const queryText = await queryEl.textContent();
      expect(queryText.startsWith('¿')).toBe(true);

      // 4. Footer con DEFCON y TRAZAR HILOS →
      const cueEl = card.locator('.inspect-cue');
      await expect(cueEl).toBeVisible();
      const cueText = await cueEl.textContent();
      expect(cueText).toContain('TRAZAR HILOS');
      expect(cueText).toContain('→');

      // 5. Verificar que el texto de TRAZAR HILOS no está cortado por overflow
      const isCueClipped = await cueEl.evaluate((el) => el.scrollWidth > el.clientWidth);
      expect(isCueClipped).toBe(false);
    }
  });

  test('3. En distintas resoluciones los textos de los presets se adaptan correctamente', async ({ page }) => {
    // Probar en 1440x900
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.waitForTimeout(200);
    const firstCard = page.locator('.preset-card').first();
    await expect(firstCard.locator('.inspect-cue')).toBeVisible();

    // Probar en 1024x768
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(200);
    await expect(firstCard.locator('.inspect-cue')).toBeVisible();

    // Probar en 768x1024 (tablet)
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(200);
    await expect(firstCard.locator('.inspect-cue')).toBeVisible();
  });
});
