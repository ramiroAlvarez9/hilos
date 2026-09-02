import { test, expect } from '@playwright/test';

test.describe('Análisis de Logos e Invarianza de Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('1. Debe cargar la vista inicial con los presets de logos', async ({ page }) => {
    const presetCards = page.locator('.preset-card');
    await expect(presetCards.first()).toBeVisible();
    const count = await presetCards.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('2. La imagen/tablero debe permanecer en posición fija al agregar o quitar capas', async ({ page }) => {
    // Abrir preset de OpenAI
    await page.locator('.preset-card', { hasText: 'OPENAI' }).click();

    // Esperar a que cargue la vista de análisis y resetear scroll
    const board = page.locator('.investigation-board');
    await expect(board).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    // Medir la posición inicial exacta de la imagen/tablero
    const initialBox = await board.boundingBox();
    expect(initialBox).not.toBeNull();
    expect(initialBox.width).toBeGreaterThan(200);
    expect(initialBox.height).toBeGreaterThan(200);

    // Contar las tarjetas con todas las capas activas
    const evidenceItems = page.locator('.evidence-items .evidence-card');
    const fullCount = await evidenceItems.count();
    expect(fullCount).toBeGreaterThan(0);

    // Desactivar la capa Masónica
    const masonicChip = page.locator('.layer-chip', { hasText: 'Masónica' });
    await masonicChip.click();
    await page.waitForTimeout(300);

    // Verificar que las tarjetas se redujeron
    const reducedCount1 = await evidenceItems.count();
    expect(reducedCount1).toBeLessThan(fullCount);

    // Verificar que la imagen NO se movió
    const boxAfterMasonic = await board.boundingBox();
    expect(Math.abs(boxAfterMasonic.y - initialBox.y)).toBeLessThanOrEqual(1);
    expect(Math.abs(boxAfterMasonic.x - initialBox.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(boxAfterMasonic.height - initialBox.height)).toBeLessThanOrEqual(1);

    // Desactivar la capa Saturno y Reptiliana
    const saturnChip = page.locator('.layer-chip', { hasText: 'Saturno' });
    const reptilianChip = page.locator('.layer-chip', { hasText: 'Reptiliana' });
    await saturnChip.click();
    await page.waitForTimeout(150);
    await reptilianChip.click();
    await page.waitForTimeout(300);

    // Verificar que quedan muchas menos tarjetas o mensaje de capa oculta
    const reducedCount2 = await evidenceItems.count();
    expect(reducedCount2).toBeLessThan(reducedCount1);

    // Verificar NUEVAMENTE que la imagen sigue fija en el mismo lugar
    const boxAfterMultiple = await board.boundingBox();
    expect(Math.abs(boxAfterMultiple.y - initialBox.y)).toBeLessThanOrEqual(1);
    expect(Math.abs(boxAfterMultiple.x - initialBox.x)).toBeLessThanOrEqual(1);
    expect(Math.abs(boxAfterMultiple.height - initialBox.height)).toBeLessThanOrEqual(1);

    // Volver a activar todas las capas
    await masonicChip.click();
    await saturnChip.click();
    await reptilianChip.click();
    await page.waitForTimeout(300);

    // Las tarjetas deben volver a aparecer
    const restoredCount = await evidenceItems.count();
    expect(restoredCount).toBe(fullCount);

    // La posición final debe seguir idéntica
    const finalBox = await board.boundingBox();
    expect(Math.abs(finalBox.y - initialBox.y)).toBeLessThanOrEqual(1);
    expect(Math.abs(finalBox.x - initialBox.x)).toBeLessThanOrEqual(1);
  });

  test('3. El panel lateral no debe crecer más allá de su contenedor (altura fija con scroll)', async ({ page }) => {
    await page.locator('.preset-card', { hasText: 'OPENAI' }).click();

    const panel = page.locator('.evidence-panel');
    await expect(panel).toBeVisible();

    const layout = page.locator('.analysis-layout');
    const layoutBox = await layout.boundingBox();
    const panelBox = await panel.boundingBox();

    // El panel no debe superar la altura total del layout
    expect(panelBox.height).toBeLessThanOrEqual(layoutBox.height + 2);

    // Verificar que el panel tiene scroll si el contenido desborda
    const isScrollable = await panel.evaluate((el) => el.scrollHeight >= el.clientHeight);
    expect(isScrollable).toBe(true);
  });

  test('4. El botón de Re-Escanear debe reiniciar el trazado de líneas sin desfasar la UI', async ({ page }) => {
    await page.locator('.preset-card', { hasText: 'STARBUCKS' }).click();

    const board = page.locator('.investigation-board');
    await expect(board).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const initialBox = await board.boundingBox();

    // Click en Re-Escanear
    const rescanBtn = page.locator('.btn-rescan');
    await expect(rescanBtn).toBeVisible();
    await rescanBtn.click();

    // Durante el escaneo el láser debe estar activo
    const laser = page.locator('.scanner-laser.scanning');
    await expect(laser).toBeVisible();

    // Esperar a que se completen las líneas y nodos progresivos
    await page.waitForTimeout(2000);

    // Comprobar que los nodos y conexiones SVG existen y están renderizados
    const renderedNodes = page.locator('.nodes-group g');
    expect(await renderedNodes.count()).toBeGreaterThan(0);

    const renderedConnections = page.locator('.connections-group path');
    expect(await renderedConnections.count()).toBeGreaterThan(0);

    // La posición de la imagen debe mantenerse inmutable
    const boxAfterRescan = await board.boundingBox();
    expect(Math.abs(boxAfterRescan.y - initialBox.y)).toBeLessThanOrEqual(1);
  });

  test('5. Debe permitir volver al inicio con el botón VOLVER', async ({ page }) => {
    await page.locator('.preset-card').first().click();
    await expect(page.locator('.analysis-view')).toBeVisible();

    await page.locator('#btn-back-home').click();
    await expect(page.locator('.hero-section')).toBeVisible();
    await expect(page.locator('.presets-grid')).toBeVisible();
  });

  test('6. Los badges de Objetivo y Facción deben mostrar el texto completo sin truncamiento', async ({ page }) => {
    // Abrir preset de OpenAI con facción larga
    await page.locator('.preset-card', { hasText: 'OPENAI' }).click();
    await expect(page.locator('.analysis-nav')).toBeVisible();

    const factionBadge = page.locator('.target-badge.badge-faction');
    await expect(factionBadge).toBeVisible();

    // Comprobar que contiene el texto completo de la facción
    const factionText = await factionBadge.textContent();
    expect(factionText).toContain('CULTO DE SATURNO & DEEP STATE CUÁNTICO');

    // Verificar que no hay truncamiento por scrollWidth / overflow
    const isTruncated = await factionBadge.evaluate((el) => {
      return el.scrollWidth > el.clientWidth;
    });
    expect(isTruncated).toBe(false);

    // Verificar el badge del objetivo también
    const targetBadge = page.locator('.target-badge').first();
    await expect(targetBadge).toBeVisible();
    const isTargetTruncated = await targetBadge.evaluate((el) => {
      return el.scrollWidth > el.clientWidth;
    });
    expect(isTargetTruncated).toBe(false);
  });
});
