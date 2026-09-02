import { jsPDF } from 'jspdf';

/**
 * Genera y descarga un informe PDF con los datos del análisis conspirativo.
 * @param {Object} targetData - El preset o resultado de análisis actual.
 * @param {Set} activeLayers - Las capas activas al momento de exportar.
 */
export function generateReportPDF(targetData, activeLayers) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const PAGE_W = 210;
  const PAGE_H = 297;
  const MARGIN = 16;
  const CONTENT_W = PAGE_W - MARGIN * 2;
  let y = 0;

  // ─── Color palette ───────────────────────────────────────────────
  const RED     = [232, 33, 60];
  const AMBER   = [251, 191, 36];
  const GREEN   = [52, 211, 153];
  const CYAN    = [34, 211, 238];
  const DARK    = [10, 10, 15];
  const CARD_BG = [18, 18, 24];
  const BORDER  = [40, 40, 55];
  const WHITE   = [255, 255, 255];
  const MUTED   = [120, 120, 140];

  // ─── Helpers ─────────────────────────────────────────────────────
  const setFont = (style = 'normal', size = 10, color = WHITE) => {
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
  };

  const setFill = (color) => doc.setFillColor(...color);
  const setDraw = (color) => doc.setDrawColor(...color);

  const checkPageBreak = (neededHeight = 30) => {
    if (y + neededHeight > PAGE_H - MARGIN - 10) {
      doc.addPage();
      drawPageBackground();
      y = MARGIN + 4;
    }
  };

  const drawPageBackground = () => {
    setFill(DARK);
    doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

    // Subtle scanline grid
    doc.setLineWidth(0.1);
    setDraw([25, 25, 35]);
    for (let gx = 0; gx < PAGE_W; gx += 8) {
      doc.line(gx, 0, gx, PAGE_H);
    }
    for (let gy = 0; gy < PAGE_H; gy += 8) {
      doc.line(0, gy, PAGE_W, gy);
    }

    // Left red stripe accent
    setFill(RED);
    doc.rect(0, 0, 3, PAGE_H, 'F');

    // Footer
    setFont('normal', 6.5, MUTED);
    doc.text('DOCUMENTO CLASIFICADO — USO INTERNO // HILOS PROTOCOLO OMEGA', MARGIN, PAGE_H - 7);
    const ts = new Date().toISOString().replace('T', ' ').slice(0, 19);
    doc.text(`GENERADO: ${ts} UTC`, PAGE_W - MARGIN, PAGE_H - 7, { align: 'right' });
    setDraw(BORDER);
    doc.setLineWidth(0.3);
    doc.line(MARGIN, PAGE_H - 10, PAGE_W - MARGIN, PAGE_H - 10);
  };

  // ─── Page 1 Header ───────────────────────────────────────────────
  drawPageBackground();
  y = MARGIN;

  // Red header bar
  setFill(RED);
  doc.rect(MARGIN, y, CONTENT_W, 12, 'F');
  setFont('bold', 8, DARK);
  doc.text('⚠  INFORME CLASIFICADO — NIVEL 5 — SOLO OJOS AUTORIZADOS  ⚠', PAGE_W / 2, y + 7.5, { align: 'center' });
  y += 16;

  // Logo / Title block
  setFont('bold', 22, RED);
  doc.text('HILOS', MARGIN, y + 8);
  setFont('normal', 9, MUTED);
  doc.text('SISTEMA DE ANÁLISIS CONSPIRATIVO AVANZADO', MARGIN, y + 15);

  // Clasificado badge
  setFill(DARK);
  setDraw(RED);
  doc.setLineWidth(0.5);
  doc.roundedRect(PAGE_W - MARGIN - 45, y, 45, 18, 2, 2, 'FD');
  setFont('bold', 7, RED);
  doc.text('CLASIFICADO', PAGE_W - MARGIN - 22.5, y + 7, { align: 'center' });
  setFont('normal', 6, AMBER);
  doc.text('NIVEL 5 / OJOS ROJOS', PAGE_W - MARGIN - 22.5, y + 13, { align: 'center' });
  y += 24;

  // Divider
  setDraw(RED);
  doc.setLineWidth(0.8);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
  y += 8;

  // Target info block
  setFill(CARD_BG);
  setDraw(BORDER);
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN, y, CONTENT_W, 38, 3, 3, 'FD');

  // Left red accent on card
  setFill(RED);
  doc.roundedRect(MARGIN, y, 3, 38, 1.5, 1.5, 'F');

  setFont('normal', 6.5, MUTED);
  doc.text('OBJETIVO DE ANÁLISIS', MARGIN + 7, y + 6);
  setFont('bold', 14, WHITE);
  doc.text((targetData.name || 'DESCONOCIDO').toUpperCase(), MARGIN + 7, y + 14);

  if (targetData.faction) {
    setFont('normal', 7, AMBER);
    doc.text(targetData.faction.toUpperCase(), MARGIN + 7, y + 21);
  }

  if (targetData.subtitle) {
    const subtitleLines = doc.splitTextToSize(targetData.subtitle, CONTENT_W - 14);
    setFont('normal', 7.5, [200, 200, 215]);
    doc.text(subtitleLines.slice(0, 2), MARGIN + 7, y + 29);
  }

  // Threat level
  if (targetData.threatLevel) {
    const defcon = 6 - targetData.threatLevel;
    const tColor = targetData.threatLevel >= 5 ? RED : targetData.threatLevel >= 4 ? [255, 119, 0] : AMBER;
    setFill(DARK);
    setDraw(tColor);
    doc.setLineWidth(0.4);
    doc.roundedRect(PAGE_W - MARGIN - 30, y + 4, 27, 12, 2, 2, 'FD');
    setFont('bold', 7, tColor);
    doc.text(`DEFCON ${defcon}`, PAGE_W - MARGIN - 16.5, y + 11.5, { align: 'center' });
  }
  y += 46;

  // Stats row
  const nodes = (targetData.nodes || []).filter(n => activeLayers.has(n.layer || 'masonic'));
  const conns = (targetData.connections || []).filter(c => activeLayers.has(c.layer || 'masonic'));
  const layers = [...activeLayers].join(', ').toUpperCase();

  const stats = [
    { label: 'VÉRTICES', value: nodes.length },
    { label: 'HILOS ROJOS', value: conns.length },
    { label: 'CAPAS ACTIVAS', value: [...activeLayers].length },
    { label: 'ESTADO', value: 'CONFIRMADO', color: GREEN },
  ];
  const statW = CONTENT_W / stats.length;

  stats.forEach((stat, i) => {
    const sx = MARGIN + i * statW;
    setFill(CARD_BG);
    setDraw(BORDER);
    doc.setLineWidth(0.2);
    doc.roundedRect(sx, y, statW - 2, 18, 2, 2, 'FD');
    setFont('bold', 11, stat.color || WHITE);
    doc.text(String(stat.value), sx + statW / 2 - 1, y + 10, { align: 'center' });
    setFont('normal', 6, MUTED);
    doc.text(stat.label, sx + statW / 2 - 1, y + 16, { align: 'center' });
  });
  y += 26;

  // Layers
  setFont('normal', 7, MUTED);
  doc.text(`CAPAS ANALIZADAS: ${layers}`, MARGIN, y);
  y += 10;

  // ─── Nodes Section ───────────────────────────────────────────────
  if (nodes.length > 0) {
    setFont('bold', 9, RED);
    doc.text('📌  EVIDENCIA GEOMÉTRICA — VÉRTICES IDENTIFICADOS', MARGIN, y);
    setDraw(RED);
    doc.setLineWidth(0.4);
    doc.line(MARGIN, y + 2, MARGIN + 80, y + 2);
    y += 10;

    nodes.forEach((node, index) => {
      const letter = String.fromCharCode(65 + index);
      const descLines = doc.splitTextToSize(node.description || '', CONTENT_W - 30);
      const cardH = 8 + descLines.length * 4.5 + 10;

      checkPageBreak(cardH + 4);

      setFill(CARD_BG);
      setDraw(BORDER);
      doc.setLineWidth(0.2);
      doc.roundedRect(MARGIN, y, CONTENT_W, cardH, 2, 2, 'FD');
      // Left tag
      setFill(RED);
      doc.roundedRect(MARGIN, y, 3, cardH, 1, 1, 'F');

      // Vertex letter badge
      setFill([40, 10, 10]);
      doc.roundedRect(MARGIN + 5, y + 3, 10, 10, 1.5, 1.5, 'F');
      setFont('bold', 8, RED);
      doc.text(`[${letter}]`, MARGIN + 10, y + 10, { align: 'center' });

      // Node label
      setFont('bold', 8.5, WHITE);
      doc.text(node.label || node.id, MARGIN + 18, y + 8.5);

      // Layer badge
      const layerColor = node.layer === 'saturn' ? AMBER : node.layer === 'reptilian' ? GREEN : node.layer === 'sacred' ? CYAN : [200, 160, 255];
      setFont('normal', 6, layerColor);
      doc.text((node.layer || 'masonic').toUpperCase(), PAGE_W - MARGIN - 4, y + 6, { align: 'right' });

      // Coordinates
      setFont('normal', 6, MUTED);
      doc.text(`MATRIZ: X:${node.x}% Y:${node.y}%  |  CÓDIGO: RS-${(node.id || '').toUpperCase()}`, PAGE_W - MARGIN - 4, y + 11, { align: 'right' });

      // Description
      setFont('normal', 7.5, [200, 200, 215]);
      doc.text(descLines, MARGIN + 18, y + 17);

      // Extended intel
      if (node.extendedIntel) {
        const extLines = doc.splitTextToSize(`▸ ${node.extendedIntel}`, CONTENT_W - 22);
        const extStart = y + 14 + descLines.length * 4.5 + 2;
        setFont('italic', 6.5, MUTED);
        doc.text(extLines.slice(0, 2), MARGIN + 18, extStart);
      }

      y += cardH + 4;
    });
  }

  // ─── Connections Section ─────────────────────────────────────────
  if (conns.length > 0) {
    checkPageBreak(20);
    y += 4;
    setFont('bold', 9, CYAN);
    doc.text('🧶  HILOS ROJOS — CONEXIONES VECTORIALES', MARGIN, y);
    setDraw(CYAN);
    doc.setLineWidth(0.4);
    doc.line(MARGIN, y + 2, MARGIN + 75, y + 2);
    y += 10;

    conns.forEach((conn, index) => {
      const meaning = conn.secretMeaning || '';
      const meaningLines = doc.splitTextToSize(meaning, CONTENT_W - 14);
      const cardH = 8 + meaningLines.length * 4.5 + 8;

      checkPageBreak(cardH + 4);

      setFill(CARD_BG);
      setDraw(BORDER);
      doc.setLineWidth(0.2);
      doc.roundedRect(MARGIN, y, CONTENT_W, cardH, 2, 2, 'FD');
      setFill(CYAN);
      doc.roundedRect(MARGIN, y, 3, cardH, 1, 1, 'F');

      // Header
      setFont('bold', 8, CYAN);
      doc.text(`HILO ROJO #${index + 1}: ${(conn.geometryType || '').toUpperCase()}`, MARGIN + 7, y + 8);

      // Connection metadata
      setFont('normal', 6.5, MUTED);
      doc.text(`CONEXIÓN: [${conn.from}] → [${conn.to}]   CAPA: ${(conn.layer || '').toUpperCase()}`, PAGE_W - MARGIN - 4, y + 6, { align: 'right' });
      doc.text('TELEMETRÍA: VIGILANCIA ACTIVA', PAGE_W - MARGIN - 4, y + 11, { align: 'right' });

      // Meaning
      setFont('normal', 7.5, [200, 200, 215]);
      doc.text(meaningLines, MARGIN + 7, y + 16);

      y += cardH + 4;
    });
  }

  // ─── Classification Footer Page ──────────────────────────────────
  doc.addPage();
  drawPageBackground();
  y = PAGE_H / 2 - 30;

  setFont('bold', 28, RED);
  doc.text('ALTO SECRETO', PAGE_W / 2, y, { align: 'center' });
  setFont('normal', 9, MUTED);
  doc.text('Este documento es propiedad exclusiva de HILOS y contiene', PAGE_W / 2, y + 12, { align: 'center' });
  doc.text('información de inteligencia clasificada. Su distribución no autorizada', PAGE_W / 2, y + 18, { align: 'center' });
  doc.text('será considerada traición al Protocolo Omega.', PAGE_W / 2, y + 24, { align: 'center' });

  setDraw(RED);
  doc.setLineWidth(0.5);
  doc.line(MARGIN + 20, y + 30, PAGE_W - MARGIN - 20, y + 30);

  setFont('bold', 7.5, AMBER);
  doc.text('GENERADO POR: AGENTE IA — SISTEMA SIDEQUEST NEURAL v2.0', PAGE_W / 2, y + 38, { align: 'center' });

  // ─── Save ─────────────────────────────────────────────────────────
  const filename = `INFORME_${(targetData.name || 'LOGO').replace(/\s+/g, '_').toUpperCase()}_${Date.now()}.pdf`;
  doc.save(filename);
}
