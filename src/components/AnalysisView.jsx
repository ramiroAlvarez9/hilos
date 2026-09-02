import React, { useState } from 'react';
import { Corkboard } from './Corkboard.jsx';
import { EvidencePanel } from './EvidencePanel.jsx';
import { audioFx } from '../services/audioFx.js';

export function AnalysisView({ targetData, onBackHome }) {
  const [hoveredNodeId, setHoveredNodeId] = useState(null);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [hoveredConnIndex, setHoveredConnIndex] = useState(null);
  const [activeLayers, setActiveLayers] = useState(
    new Set(['masonic', 'saturn', 'reptilian', 'sacred'])
  );

  const handleToggleLayer = (layerKey) => {
    setActiveLayers((prev) => {
      const next = new Set(prev);
      if (next.has(layerKey)) {
        if (next.size > 1) next.delete(layerKey);
      } else {
        next.add(layerKey);
      }
      return next;
    });
    audioFx.playClick();
  };

  const handleNodeClick = (nodeId) => {
    setSelectedNodeId((prev) => (prev === nodeId ? null : nodeId));
  };

  if (!targetData) return null;

  return (
    <div className="analysis-view">
      {/* Analysis Navigation */}
      <nav className="analysis-nav" aria-label="Análisis forense">
        <div className="nav-target-info">
          <button
            id="btn-back-home"
            className="btn-tactical"
            onClick={() => {
              audioFx.playClick();
              onBackHome();
            }}
            aria-label="Volver al buscador"
          >
            ← VOLVER
          </button>
          <div className="target-badge" title="Objetivo actual">
            🎯 OBJETIVO: <strong>{targetData.name?.toUpperCase()}</strong>
          </div>
          {targetData.faction && (
            <div
              className="target-badge badge-faction"
              title="Facción identificada"
            >
              🏛️ <span>{targetData.faction.toUpperCase()}</span>
            </div>
          )}
        </div>
      </nav>

      {/* Split Layout: Corkboard (left) + Evidence Panel (right) */}
      <div className="analysis-layout">
        <Corkboard
          targetData={targetData}
          activeLayers={activeLayers}
          onToggleLayer={handleToggleLayer}
          highlightedNodeId={hoveredNodeId || selectedNodeId}
          highlightedConnIndex={hoveredConnIndex}
          onNodeHover={setHoveredNodeId}
          onNodeClick={handleNodeClick}
          onConnHover={setHoveredConnIndex}
        />

        <EvidencePanel
          targetData={targetData}
          activeLayers={activeLayers}
          selectedNodeId={selectedNodeId}
          highlightedNodeId={hoveredNodeId}
          highlightedConnIndex={hoveredConnIndex}
          onNodeHover={setHoveredNodeId}
          onNodeClick={handleNodeClick}
          onConnHover={setHoveredConnIndex}
        />
      </div>
    </div>
  );
}
