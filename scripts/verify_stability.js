import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

async function main() {
  const screenshotsDir = './scratch/screenshots';
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();

  console.log('1. Navegando a http://localhost:5173...');
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(500);

  console.log('2. Seleccionando preset OpenAI...');
  await page.locator('.preset-card', { hasText: 'OPENAI' }).click();
  await page.waitForSelector('.investigation-board');
  await page.waitForTimeout(500);

  // Capturar estado inicial
  await page.screenshot({ path: path.join(screenshotsDir, '01_all_layers_active.png') });

  const getMetrics = async () => {
    return await page.evaluate(() => {
      const board = document.querySelector('.investigation-board')?.getBoundingClientRect();
      const stage = document.querySelector('.corkboard-stage')?.getBoundingClientRect();
      const container = document.querySelector('.corkboard-container')?.getBoundingClientRect();
      const panel = document.querySelector('.evidence-panel')?.getBoundingClientRect();
      const cardCount = document.querySelectorAll('.evidence-items .evidence-card').length;
      return {
        board: board ? { x: Math.round(board.x * 10) / 10, y: Math.round(board.y * 10) / 10, w: Math.round(board.width), h: Math.round(board.height) } : null,
        stage: stage ? { h: Math.round(stage.height), y: Math.round(stage.y) } : null,
        container: container ? { h: Math.round(container.height) } : null,
        panel: panel ? { h: Math.round(panel.height), scrollH: document.querySelector('.evidence-panel')?.scrollHeight } : null,
        cardCount,
        scrollY: window.scrollY,
      };
    });
  };

  const initial = await getMetrics();
  console.log('Estado inicial (todas las capas):', JSON.stringify(initial, null, 2));

  // Toggle 1: Desactivar Masónica
  console.log('\nDesactivando Capa Masónica...');
  await page.locator('.layer-chip', { hasText: 'Masónica' }).click();
  await page.waitForTimeout(400);
  const state1 = await getMetrics();
  console.log('Estado tras quitar Masónica:', JSON.stringify(state1, null, 2));
  await page.screenshot({ path: path.join(screenshotsDir, '02_masonic_removed.png') });

  // Toggle 2: Desactivar Saturno
  console.log('\nDesactivando Capa Saturno...');
  await page.locator('.layer-chip', { hasText: 'Saturno' }).click();
  await page.waitForTimeout(400);
  const state2 = await getMetrics();
  console.log('Estado tras quitar Saturno:', JSON.stringify(state2, null, 2));
  await page.screenshot({ path: path.join(screenshotsDir, '03_saturn_removed.png') });

  // Toggle 3: Desactivar Reptiliana
  console.log('\nDesactivando Capa Reptiliana...');
  await page.locator('.layer-chip', { hasText: 'Reptiliana' }).click();
  await page.waitForTimeout(400);
  const state3 = await getMetrics();
  console.log('Estado tras quitar Reptiliana (solo 1 capa activa):', JSON.stringify(state3, null, 2));
  await page.screenshot({ path: path.join(screenshotsDir, '04_single_layer.png') });

  // Re-activar todas
  console.log('\nRe-activando todas las capas...');
  await page.locator('.layer-chip', { hasText: 'Masónica' }).click();
  await page.locator('.layer-chip', { hasText: 'Saturno' }).click();
  await page.locator('.layer-chip', { hasText: 'Reptiliana' }).click();
  await page.waitForTimeout(400);
  const stateRestored = await getMetrics();
  console.log('Estado restaurado (todas activas de nuevo):', JSON.stringify(stateRestored, null, 2));
  await page.screenshot({ path: path.join(screenshotsDir, '05_restored_all.png') });

  // Comprobación de invariabilidad
  const diffY = Math.abs(stateRestored.board.y - initial.board.y);
  const diffX = Math.abs(stateRestored.board.x - initial.board.x);
  const diffH = Math.abs(stateRestored.board.h - initial.board.h);

  console.log('\n=========================================');
  console.log('RESULTADO DEL ANÁLISIS DE ESTABILIDAD:');
  console.log(`Diferencia X: ${diffX} px`);
  console.log(`Diferencia Y: ${diffY} px`);
  console.log(`Diferencia Altura: ${diffH} px`);
  console.log('=========================================');

  if (diffY === 0 && diffX === 0 && diffH === 0) {
    console.log('✅ ÉXITO TOTAL: La imagen y su contenedor no sufren ningún desplazamiento.');
  } else {
    console.error('❌ ADVERTENCIA: Hubo desplazamiento.');
  }

  await browser.close();
}

main().catch(console.error);
