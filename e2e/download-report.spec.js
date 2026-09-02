import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import os from 'os';

test.describe('Descarga de Informe PDF', () => {
  // Navigate to analysis view before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.preset-card');
    await page.locator('.preset-card').first().click();
    // Wait for scan animation and panel to settle
    await page.waitForSelector('.evidence-panel', { state: 'visible' });
    await page.waitForTimeout(2000);
  });

  test('1. El botón "DESCARGAR INFORME COMPLETO" debe estar visible al fondo del panel', async ({ page }) => {
    const btn = page.locator('#btn-download-report');
    await expect(btn).toBeVisible();
    const text = await btn.textContent();
    expect(text).toContain('DESCARGAR INFORME COMPLETO');
  });

  test('2. El botón de descarga debe estar en la barra inferior del panel (anclado al fondo)', async ({ page }) => {
    const downloadBar = page.locator('.evidence-download-bar');
    await expect(downloadBar).toBeVisible();

    // Verify the download bar is inside the evidence panel
    const panelBbox = await page.locator('.evidence-panel').boundingBox();
    const barBbox = await downloadBar.boundingBox();
    expect(panelBbox).not.toBeNull();
    expect(barBbox).not.toBeNull();

    // The bar's bottom edge should align with the panel's bottom edge (within 4px)
    const panelBottom = panelBbox.y + panelBbox.height;
    const barBottom = barBbox.y + barBbox.height;
    expect(Math.abs(panelBottom - barBottom)).toBeLessThanOrEqual(4);
  });

  test('3. El icono de descarga animado (⬇) debe estar presente dentro del botón', async ({ page }) => {
    const icon = page.locator('.btn-download-icon');
    await expect(icon).toBeVisible();
    const iconText = await icon.textContent();
    expect(iconText.trim()).toBe('⬇');
  });

  test('4. El botón dispara la descarga de un archivo PDF al hacer click', async ({ page }) => {
    // Listen for download event
    const downloadPromise = page.waitForEvent('download', { timeout: 8000 });

    await page.locator('#btn-download-report').click();

    const download = await downloadPromise;
    const filename = download.suggestedFilename();

    // Check filename starts with INFORME_ and ends with .pdf
    expect(filename).toMatch(/^INFORME_.+\.pdf$/i);
  });

  test('5. El PDF descargado debe tener un tamaño mayor a 5KB (contiene contenido real)', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download', { timeout: 8000 });
    await page.locator('#btn-download-report').click();
    const download = await downloadPromise;

    // Save to temp and check size
    const tmpPath = path.join(os.tmpdir(), download.suggestedFilename());
    await download.saveAs(tmpPath);

    const stat = fs.statSync(tmpPath);
    expect(stat.size).toBeGreaterThan(5 * 1024); // > 5KB
    expect(stat.size).toBeGreaterThan(0);

    // Cleanup
    fs.unlinkSync(tmpPath);
  });

  test('6. El nombre del archivo PDF debe incluir el nombre del logo analizado', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download', { timeout: 8000 });
    await page.locator('#btn-download-report').click();
    const download = await downloadPromise;

    const filename = download.suggestedFilename();
    // Should contain the preset name (uppercased, spaces replaced with underscores)
    // OpenAI Spiral → OPENAI_SPIRAL
    expect(filename.toUpperCase()).toMatch(/INFORME_(OPENAI|STARBUCKS|APPLE|MCDONALD|CHROME|META|MONSTER)/);
  });

  test('7. El panel mantiene layout correcto: header fijo arriba, items scrollables, botón al fondo', async ({ page }) => {
    const header = page.locator('.evidence-list-header');
    const items = page.locator('.evidence-items');
    const downloadBar = page.locator('.evidence-download-bar');

    await expect(header).toBeVisible();
    await expect(items).toBeVisible();
    await expect(downloadBar).toBeVisible();

    const headerBbox = await header.boundingBox();
    const itemsBbox = await items.boundingBox();
    const barBbox = await downloadBar.boundingBox();

    // Header should be above items
    expect(headerBbox.y).toBeLessThan(itemsBbox.y);
    // Items should be above download bar
    expect(itemsBbox.y).toBeLessThan(barBbox.y);
  });

  test('8. El botón de descarga funciona para distintos presets (Starbucks)', async ({ page }) => {
    // Go back home and pick a different preset
    await page.locator('#btn-back-home').click();
    await page.waitForSelector('.presets-grid');
    // Click second preset (Starbucks)
    await page.locator('.preset-card').nth(1).click();
    await page.waitForSelector('.evidence-panel', { state: 'visible' });
    await page.waitForTimeout(2000);

    const btn = page.locator('#btn-download-report');
    await expect(btn).toBeVisible();

    const downloadPromise = page.waitForEvent('download', { timeout: 8000 });
    await btn.click();
    const download = await downloadPromise;

    const filename = download.suggestedFilename();
    expect(filename).toMatch(/^INFORME_.+\.pdf$/i);
  });

  test('9. El botón no debe desbordarse ni estar oculto en resoluciones menores (1024x768)', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(300);

    const btn = page.locator('#btn-download-report');
    await expect(btn).toBeVisible();

    // Ensure it is not clipped (scrollWidth <= clientWidth)
    const isClipped = await btn.evaluate(el => el.scrollWidth > el.clientWidth + 2);
    expect(isClipped).toBe(false);
  });

  test('10. El panel de evidencia tiene scroll interno sin afectar la posición del botón de descarga', async ({ page }) => {
    // Record initial Y position of the download bar
    const barBbox1 = await page.locator('.evidence-download-bar').boundingBox();

    // Scroll inside the evidence items
    await page.locator('.evidence-items').evaluate(el => {
      el.scrollTop = 200;
    });
    await page.waitForTimeout(200);

    // Bar position should remain unchanged
    const barBbox2 = await page.locator('.evidence-download-bar').boundingBox();
    expect(Math.abs(barBbox1.y - barBbox2.y)).toBeLessThanOrEqual(2);
  });
});
