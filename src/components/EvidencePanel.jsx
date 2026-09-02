import React, { useState, useEffect } from 'react';
import { audioFx } from '../services/audioFx.js';
import { generateReportPDF } from '../services/reportGenerator.js';

export function EvidencePanel({
  targetData,
  activeLayers = new Set(['masonic', 'saturn', 'reptilian', 'sacred']),
  selectedNodeId,
  highlightedNodeId,
  highlightedConnIndex,
  onNodeHover,
  onNodeClick,
  onConnHover,
}) {
  const [expandedItemId, setExpandedItemId] = useState(null);

  // Sync expanded card when selectedNodeId changes from board or external click
  useEffect(() => {
    if (selectedNodeId !== undefined) {
      setExpandedItemId(selectedNodeId);
    }
  }, [selectedNodeId]);

  if (!targetData) return null;

  const handleRedactedHover = () => {
    audioFx.playDeclassify();
  };

  const toggleExpand = (itemId, nodeOrConn, isNode = true) => {
    audioFx.playClick();
    if (isNode && onNodeClick) {
      onNodeClick(nodeOrConn.id);
    } else {
      setExpandedItemId((prev) => (prev === itemId ? null : itemId));
    }
  };

  const visibleNodes = (targetData.nodes || []).filter((node) =>
    activeLayers.has(node.layer || 'masonic')
  );

  const visibleConnections = (targetData.connections || []).filter((conn) =>
    activeLayers.has(conn.layer || 'masonic')
  );

  return (
    <div className="evidence-panel">
      {/* Fixed header — does NOT scroll */}
      <div className="evidence-list-header">
        <span>📌 EVIDENCIA GEOMÉTRICA ({visibleNodes.length} VÉRTICES)</span>
      </div>

      {/* Scrollable items container */}
      <div className="evidence-items">
        {visibleNodes.length === 0 && visibleConnections.length === 0 && (
          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-3)',
              padding: '24px 12px',
              fontStyle: 'italic',
              textAlign: 'center',
              lineHeight: '1.5',
            }}
          >
            Capa desactivada. Activá al menos una capa en la barra del tablero para ver sus descripciones forenses.
          </div>
        )}

        {/* Filtered Nodes */}
        {visibleNodes.map((node, index) => {
          const isHighlighted = highlightedNodeId === node.id || selectedNodeId === node.id;
          const isExpanded = expandedItemId === node.id || selectedNodeId === node.id;

          const extendedDescription =
            node.extendedIntel ||
            `${node.description} Los registros satelitales y de telemetría confirman una emisión anómala en este vértice con un vector de polarización exacto, interceptado y catalogado por los protocolos de contrainteligencia de la red de vigilancia global.`;

          return (
            <div
              key={node.id}
              className={`evidence-card ${isHighlighted ? 'highlighted' : ''} ${isExpanded ? 'expanded' : ''}`}
              onMouseEnter={() => onNodeHover(node.id)}
              onMouseLeave={() => onNodeHover(null)}
              onClick={() => toggleExpand(node.id, node, true)}
              title={isExpanded ? 'Click para replegar detalles' : 'Click para desplegar expediente forense completo'}
            >
              <div className="card-top">
                <div className="node-label-pill">
                  <span style={{ color: 'var(--red-string)' }}>
                    [{String.fromCharCode(65 + index)}]
                  </span>{' '}
                  {node.label}
                </div>
                <span className="geom-type-badge">{node.layer || 'masonic'}</span>
              </div>

              {/* Standard Brief Description */}
              <div className="evidence-body">{node.description}</div>

              {/* Expand/Collapse Toggle Cue */}
              <div className="card-expand-toggle">
                <span>{isExpanded ? '▲ OCULTAR DETALLES' : '▼ DESPLEGAR EXPEDIENTE'}</span>
                <span style={{ color: isExpanded ? 'var(--green)' : 'var(--text-3)', fontSize: '0.6rem' }}>
                  {isExpanded ? 'DESCLASIFICADO' : 'VER MÁS'}
                </span>
              </div>

              {/* Extended Details (Rendered on click) */}
              {isExpanded && (
                <div className="card-expanded-details">
                  <div className="expanded-section-title">
                    📂 INFORME FORENSE DESCLASIFICADO // NIVEL 5
                  </div>
                  <div className="expanded-section-text">{extendedDescription}</div>

                  <div className="expanded-meta-grid">
                    <div className="expanded-meta-item">
                      MATRIZ: <strong>X: {node.x}% | Y: {node.y}%</strong>
                    </div>
                    <div className="expanded-meta-item">
                      CÓDIGO: <strong>RS-{node.id.toUpperCase()}</strong>
                    </div>
                    <div className="expanded-meta-item">
                      FACCIÓN: <strong>{(node.layer || 'masonic').toUpperCase()}</strong>
                    </div>
                    <div className="expanded-meta-item">
                      ESTADO: <strong style={{ color: 'var(--green)' }}>CONFIRMADO</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Filtered Connection Cards */}
        {visibleConnections.map((conn, index) => {
          const connId = `conn-${index}`;
          const isHighlighted = highlightedConnIndex === index || expandedItemId === connId;
          const isExpanded = expandedItemId === connId;

          const extendedConnDescription =
            conn.extendedIntel ||
            `${conn.secretMeaning} Este enlace vectorial genera una resonancia armónica de bucle cerrado entre los vértices de anclaje, sincronizando paquetes de datos encriptados con las frecuencias reservadas del Estado Profundo y la red de monitoreo ECHELON.`;

          return (
            <div
              key={`conn-card-${index}`}
              className={`evidence-card connection-card ${isHighlighted ? 'highlighted' : ''} ${isExpanded ? 'expanded' : ''}`}
              onMouseEnter={() => onConnHover(index)}
              onMouseLeave={() => onConnHover(null)}
              onClick={() => toggleExpand(connId, conn, false)}
              title={isExpanded ? 'Click para replegar detalles' : 'Click para desplegar protocolo del hilo rojo'}
            >
              <div className="card-top">
                <div className="node-label-pill" style={{ color: 'var(--cyan-radar)' }}>
                  <span>🧶 HILO ROJO #{index + 1}: {conn.geometryType?.toUpperCase()}</span>
                </div>
                <span className="geom-type-badge">{conn.layer}</span>
              </div>

              {/* Standard Brief Description */}
              <div className="evidence-body">
                {conn.secretMeaning}{' '}
                <span className="redacted-text" onMouseEnter={handleRedactedHover}>
                  OPERACIÓN CLASIFICADA CÓDIGO B-33
                </span>
              </div>

              {/* Expand/Collapse Toggle Cue */}
              <div className="card-expand-toggle">
                <span>{isExpanded ? '▲ OCULTAR HILO' : '▼ DESPLEGAR PROTOCOLO'}</span>
                <span style={{ color: isExpanded ? 'var(--cyan)' : 'var(--text-3)', fontSize: '0.6rem' }}>
                  {isExpanded ? 'ACTIVO' : 'VER MÁS'}
                </span>
              </div>

              {/* Extended Connection Details (Rendered on click) */}
              {isExpanded && (
                <div className="card-expanded-details">
                  <div className="expanded-section-title" style={{ color: 'var(--cyan)' }}>
                    🧶 PROTOCOLO VECTORIAL DEL HILO ROJO
                  </div>
                  <div className="expanded-section-text">{extendedConnDescription}</div>

                  <div className="expanded-meta-grid">
                    <div className="expanded-meta-item">
                      TIPO GEOMÉTRICO: <strong>{conn.geometryType?.toUpperCase()}</strong>
                    </div>
                    <div className="expanded-meta-item">
                      CONEXIÓN: <strong>[{conn.from}] → [{conn.to}]</strong>
                    </div>
                    <div className="expanded-meta-item">
                      CAPA: <strong>{conn.layer?.toUpperCase()}</strong>
                    </div>
                    <div className="expanded-meta-item">
                      TELEMETRÍA: <strong style={{ color: 'var(--accent)' }}>VIGILANCIA ACTIVA</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Download Report Button */}
      <div className="evidence-download-bar">
        <button
          id="btn-download-report"
          className="btn-download-report"
          onClick={() => {
            audioFx.playClick();
            generateReportPDF(targetData, activeLayers);
          }}
          title="Generar y descargar el informe forense completo en PDF"
        >
          <span className="btn-download-icon">⬇</span>
          DESCARGAR INFORME COMPLETO
        </button>
      </div>
    </div>
  );
}
