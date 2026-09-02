# AGENTS.md — HILOS

## Identidad del Proyecto

**HILOS** es una aplicación web de análisis conspirativo de logos corporativos.
El usuario sube (o selecciona) un logo y la app traza "hilos rojos" sobre él, identificando geometrías ocultas, vértices de anclaje y conexiones secretas entre elementos visuales — todo en clave de parodia táctica.

---

## Stack Técnico

| Capa | Tecnología |
|------|-----------|
| Framework | **React 18** vía **Vite** |
| Estilos | **Vanilla CSS** (`src/styles/theme.css`) — NO usar Tailwind |
| Runtime | Node 24 / pnpm 11 (activar con `nvm use 24`) |
| IA | **Gemini 1.5 Flash** Vision API (requiere API key del usuario) |
| PDF | **jsPDF 4** |
| Tests E2E | **Playwright** (`pnpm test:e2e`) |

---

## Comandos esenciales

```bash
# Arrancar dev server
pnpm dev

# Correr todos los tests E2E (requiere dev server activo)
pnpm test:e2e

# Build de producción
pnpm build

# Activar Node 24 si hace falta
export NVM_DIR="$HOME/.nvm" && source "$NVM_DIR/nvm.sh" && nvm use 24
```

---

## Estructura de archivos clave

```
src/
├── components/
│   ├── Header.jsx          # Navbar táctica con reloj, badge de sistema y toggle de audio
│   ├── HomeView.jsx        # Pantalla principal: hero, buscador y grid de presets
│   ├── AnalysisView.jsx    # Vista de análisis: coordina Corkboard + EvidencePanel
│   ├── Corkboard.jsx       # Tablero de corcho con SVG: pines animados + hilos rojos
│   └── EvidencePanel.jsx   # Panel derecho: cards de evidencia + botón de PDF
├── data/
│   └── presets.js          # 7 presets hardcodeados (OpenAI, Starbucks, Apple, etc.)
├── services/
│   ├── audioFx.js          # Sintetizador Web Audio API (sin dependencias externas)
│   ├── geminiService.js    # Cliente Gemini 1.5 Flash Vision (análisis de logos reales)
│   └── reportGenerator.js  # Generador de PDF táctico con jsPDF
└── styles/
    └── theme.css           # Sistema de diseño completo (variables, componentes, animaciones)

e2e/
├── analysis.spec.js        # Tests: layout, invarianza de imagen, capas, badges
├── card-expansion.spec.js  # Tests: expansión de cards de evidencia
├── home-presets.spec.js    # Tests: textos de presets, tipografía, resoluciones
└── download-report.spec.js # Tests: descarga de PDF, posición del botón, tamaño del archivo
```

---

## Arquitectura y patrones establecidos

### Flujo de datos
```
HomeView → onSelectTarget(preset) → App.jsx state → AnalysisView
AnalysisView coordina:
  - activeLayers (Set) → filtrado sincronizado en Corkboard y EvidencePanel
  - selectedNodeId → expansión de card + highlight de pin
  - hoveredNodeId / hoveredConnIndex → highlight bidireccional tablero ↔ panel
```

### Layout fijo (NUNCA romper esto)
- `.analysis-view`: `height: calc(100dvh - 56px); overflow: hidden`
- `.analysis-layout`: `grid-template-columns: minmax(0, 1fr) 420px; grid-template-rows: minmax(0, 1fr)`
- La imagen del tablero **nunca debe moverse** al agregar/quitar cards. Verificado por E2E.

### EvidencePanel — estructura de 3 zonas
1. `.evidence-list-header` — fijo, no scrollea
2. `.evidence-items` — scroll interno, `flex: 1; overflow-y: auto`
3. `.evidence-download-bar` — fijo al fondo, `flex-shrink: 0`

### Animación de escaneo (Corkboard)
- Los pines se revelan progresivamente via `visibleNodesCount` con `setTimeout`
- Los hilos SVG se dibujan con `stroke-dashoffset` animation (`animating-string` class)
- El audio de pin-drop se dispara por cada nodo que aparece

---

## Convenciones de código

- **CSS**: Siempre usar variables del design system (`var(--accent)`, `var(--bg-card)`, etc.). No escribir colores hardcodeados en componentes.
- **No usar Tailwind**. Todo va en `theme.css`.
- **Nombrar IDs de elementos interactivos** para que Playwright los pueda encontrar (`id="btn-download-report"`, `id="btn-back-home"`, etc.).
- **Comentarios en castellano** para lógica de negocio, inglés para notas técnicas genéricas.

---

## Design system — variables principales

```css
--accent:      #e8213c   /* rojo conspirativo */
--amber:       #fbbf24   /* amarillo alerta */
--green:       #34d399   /* verde confirmado */
--cyan-radar:  #22d3ee   /* cyan hilos */
--bg-dark:     #0a0a0f   /* fondo principal */
--bg-card:     #121218   /* fondo de cards */
--font-mono:   'JetBrains Mono', monospace
```

---

## Presets disponibles

| ID | Nombre | Facción | Threat |
|----|--------|---------|--------|
| `openai` | OpenAI Spiral | Culto de Saturno & Deep State Cuántico | 5 |
| `starbucks` | Starbucks Siren | Secta Marítima de Babilonia & Club Bilderberg | 5 |
| `apple` | Apple Silicon Eden | Hermandad del Árbol del Conocimiento Prohibido | 4 |
| `mcdonalds` | McDonald's Golden Arches | Consorcio de Nutrición Sintética & HAARP | 4 |
| `chrome` | Chrome 666 Vortex | Consorcio Silicon Eye & Red Prism | 5 |
| `meta` | Meta Ouroboros Loop | Hermandad del Metaverso Transhumano | 4 |
| `monster` | Monster Energy 666 | Secta de la Taurina & Rito Luciferino | 4 |

---

## Tests E2E — estado actual

**21 tests, todos pasando** (`pnpm test:e2e`).

Cobertura:
- Carga de home y presets
- Invarianza de posición de imagen al togglear capas
- Altura fija del panel de evidencia
- Re-escaneo sin desfase de UI
- Expansión de cards (click en card y en pin del tablero)
- Textos sin truncamiento en presets
- Descarga de PDF (evento, nombre, tamaño >5KB)
- Botón de descarga anclado al fondo del panel
- Responsive en 1024×768, 1280×800, 1440×900, 1920×1080

---

## Reglas para el agente

1. **Antes de tocar el layout**: verificar que los tests de invarianza de imagen siguen pasando.
2. **Antes de editar `theme.css`**: identificar qué componente usa el selector para no romper otros.
3. **Al agregar features con UI**: agregar tests E2E correspondientes en `e2e/`.
4. **No agregar dependencias de estilos externas** (no Bootstrap, no Tailwind, no shadcn).
5. **El nombre del producto es HILOS** — no reintroducir "Red String OS".
6. **El PDF se genera client-side** con jsPDF — no hay backend.
