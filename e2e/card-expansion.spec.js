import { test, expect } from '@playwright/test';

test.describe('Despliegue y Expansión de Tarjetas de Evidencia', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('.preset-card', { hasText: 'OPENAI' }).click();
    await page.waitForSelector('.investigation-board');
    // Esperar a que la secuencia de escaneo y trazado termine
    await page.waitForTimeout(1600);
  });

  test('1. Al hacer click en una card de evidencia, debe desplegarse y mostrar una descripción extendida', async ({ page }) => {
    const firstCard = page.locator('.evidence-items .evidence-card').first();
    await expect(firstCard).toBeVisible();

    // Al inicio, la sección extendida no debe ser visible
    await expect(firstCard.locator('.card-expanded-details')).not.toBeVisible();

    // Click en la primera card para desplegarla
    await firstCard.click();
    await page.waitForTimeout(250);

    // Debe mostrarse la sección extendida con mayor detalle forense
    const expandedDetails = firstCard.locator('.card-expanded-details');
    await expect(expandedDetails).toBeVisible();

    // El contenido extendido debe tener texto sustancial
    const extendedText = await expandedDetails.textContent();
    expect(extendedText.length).toBeGreaterThan(30);

    // Debe tener clase o indicador de expandido
    await expect(firstCard).toHaveClass(/expanded/);

    // Al volver a hacer click en la misma card, debe replegarse
    await firstCard.click();
    await page.waitForTimeout(250);
    await expect(expandedDetails).not.toBeVisible();
    await expect(firstCard).not.toHaveClass(/expanded/);
  });

  test('2. Al hacer click en un nodo del tablero (pin), debe desplegarse su card correspondiente en el panel', async ({ page }) => {
    // Click en el nodo central (Cubo Negro Central - node_7)
    const centerNodePin = page.locator('#node-pin-node_7');
    await expect(centerNodePin).toBeVisible();
    await centerNodePin.dispatchEvent('click');
    await page.waitForTimeout(300);

    // La card correspondiente debe quedar desplegada con sus detalles
    const activeExpandedCard = page.locator('.evidence-card.expanded');
    await expect(activeExpandedCard).toBeVisible();
    await expect(activeExpandedCard.locator('.card-expanded-details')).toBeVisible();

    // La descripción extendida debe tener contenido
    const text = await activeExpandedCard.locator('.card-expanded-details').textContent();
    expect(text.length).toBeGreaterThan(30);
  });
});
