import React, { useState, useEffect, useRef, useCallback } from 'react';
import { audioFx } from '../services/audioFx.js';

export function Corkboard({
  targetData,
  activeLayers = new Set(['masonic', 'saturn', 'reptilian', 'sacred']),
  onToggleLayer,
  highlightedNodeId,
  highlightedConnIndex,
  onNodeHover,
  onNodeClick,
  onConnHover,
}) {
  const [isScanning, setIsScanning] = useState(true);
  const [visibleNodesCount, setVisibleNodesCount] = useState(0);
  const [visibleConnsCount, setVisibleConnsCount] = useState(0);
  const [boardDimensions, setBoardDimensions] = useState({ width: 500, height: 500 });

  const boardRef = useRef(null);
  const timersRef = useRef([]);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const runDrawingSequence = useCallback((nodes = [], connections = []) => {
    clearAllTimers();
    setIsScanning(true);
    setVisibleNodesCount(0);
    setVisibleConnsCount(0);

    // Sonido inicial de escaneo de radar
    audioFx.playScan();

    const nodeDelay = 130; // ms por nodo
    const connDelay = 180; // ms por hilo rojo
    const initialLaserSweep = 350; // ms de barrido antes de clavar pines

    // 1. Clavar los pines progresivamente uno a uno
    nodes.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setVisibleNodesCount(idx + 1);
        audioFx.playPinDrop();
      }, initialLaserSweep + idx * nodeDelay);
      timersRef.current.push(timer);
    });

    const nodesFinishedTime = initialLaserSweep + nodes.length * nodeDelay + 80;

    // 2. Trazar las líneas de hilos rojos una a una conectando los nodos
    connections.forEach((_, idx) => {
      const timer = setTimeout(() => {
        setVisibleConnsCount(idx + 1);
        audioFx.playClick();
      }, nodesFinishedTime + idx * connDelay);
      timersRef.current.push(timer);
    });

    // 3. Finalizar el escaneo láser cuando todo esté dibujado
    const totalTime = nodesFinishedTime + connections.length * connDelay + 250;
    const finalTimer = setTimeout(() => {
      setIsScanning(false);
    }, totalTime);
    timersRef.current.push(finalTimer);
  }, []);

  // Trigger scan and line drawing sequence on target change
  useEffect(() => {
    if (!targetData) return;
    runDrawingSequence(targetData.nodes || [], targetData.connections || []);

    return () => clearAllTimers();
  }, [targetData?.id, runDrawingSequence]);

  // Track board resize for exact SVG coordinate placement
  useEffect(() => {
    if (!boardRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width && height) {
          setBoardDimensions({ width, height });
        }
      }
    });
    observer.observe(boardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleRescan = () => {
    if (!targetData) return;
    runDrawingSequence(targetData.nodes || [], targetData.connections || []);
  };

  if (!targetData) return null;

  const nodesMap = new Map();
  (targetData.nodes || []).forEach((node) => {
    nodesMap.set(node.id, node);
  });

  const getPx = (node) => ({
    x: (node.x / 100) * boardDimensions.width,
    y: (node.y / 100) * boardDimensions.height,
  });

  return (
    <div className="corkboard-container">
      {/* Top Layer Control Toolbar */}
      <div className="corkboard-toolbar">
        <div className="layer-switches">
          <button
            className={`layer-chip ${activeLayers.has('masonic') ? 'active' : ''}`}
            onClick={() => onToggleLayer && onToggleLayer('masonic')}
          >
            👁️ Capa Masónica
          </button>
          <button
            className={`layer-chip ${activeLayers.has('saturn') ? 'active' : ''}`}
            onClick={() => onToggleLayer && onToggleLayer('saturn')}
          >
            🪐 Capa Saturno
          </button>
          <button
            className={`layer-chip ${activeLayers.has('reptilian') ? 'active' : ''}`}
            onClick={() => onToggleLayer && onToggleLayer('reptilian')}
          >
            🦎 Capa Reptiliana
          </button>
          <button
            className={`layer-chip ${activeLayers.has('sacred') ? 'active' : ''}`}
            onClick={() => onToggleLayer && onToggleLayer('sacred')}
          >
            📐 Geometría Sagrada
          </button>
        </div>

        <button className="btn-tactical btn-rescan" onClick={handleRescan} title="Volver a escanear y trazar las líneas">
          ⚡ Re-Escanear
        </button>
      </div>

      {/* Investigation Corkboard Stage */}
      <div className="corkboard-stage">
        <div className="investigation-board" ref={boardRef}>
          {/* Pushpins */}
          <div className="corner-pin pin-tl"></div>
          <div className="corner-pin pin-tr"></div>
          <div className="corner-pin pin-bl"></div>
          <div className="corner-pin pin-br"></div>

          {/* Scanning Laser */}
          <div className={`scanner-laser ${isScanning ? 'scanning' : ''}`}></div>

          {/* Media Content (SVG or Image) */}
          <div className="target-media-container" style={{ width: '100%', height: '100%' }}>
            {targetData.imageSvg ? (
              <div
                style={{ width: '100%', height: '100%' }}
                dangerouslySetInnerHTML={{ __html: targetData.imageSvg }}
              />
            ) : targetData.dataUrl || targetData.image ? (
              <img
                src={targetData.dataUrl || targetData.image}
                alt={targetData.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            ) : null}
          </div>

          {/* Interactive SVG Overlays */}
          <svg className="overlay-layer" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="red-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="cyan-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Render Red Strings / Connections (Drawn progressively) */}
            <g className="connections-group">
              {(targetData.connections || []).map((conn, idx) => {
                if (idx >= visibleConnsCount) return null;
                if (!activeLayers.has(conn.layer)) return null;
                const n1 = nodesMap.get(conn.from);
                const n2 = nodesMap.get(conn.to);
                if (!n1 || !n2) return null;

                const p1 = getPx(n1);
                const p2 = getPx(n2);
                const midX = (p1.x + p2.x) / 2 + Math.sin(idx * 1.5) * 8;
                const midY = (p1.y + p2.y) / 2 + 10;
                const d = `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`;

                const isHighlighted =
                  highlightedConnIndex === idx ||
                  highlightedNodeId === conn.from ||
                  highlightedNodeId === conn.to;

                const isSpiral = conn.geometryType === 'sacred_spiral';

                return (
                  <path
                    key={`conn-${idx}-${visibleConnsCount}`}
                    className="animating-string"
                    d={d}
                    stroke={isSpiral ? (isHighlighted ? '#ffffff' : '#00f0ff') : (isHighlighted ? '#ff7799' : '#ff2a4b')}
                    strokeWidth={isHighlighted ? '3.5' : '2'}
                    strokeDasharray={isSpiral ? '4,3' : 'none'}
                    fill="none"
                    strokeLinecap="round"
                    filter={isSpiral ? 'url(#cyan-glow)' : 'url(#red-glow)'}
                    style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease, stroke 0.2s ease' }}
                    onMouseEnter={() => {
                      onConnHover(idx);
                      audioFx.playClick();
                    }}
                    onMouseLeave={() => onConnHover(null)}
                  />
                );
              })}
            </g>

            {/* Render Nodes (Glowing Pushpins & Labels, Popped in progressively) */}
            <g className="nodes-group">
              {(targetData.nodes || []).map((node, idx) => {
                if (idx >= visibleNodesCount) return null;
                if (!activeLayers.has(node.layer)) return null;
                const p = getPx(node);
                const isHighlighted = highlightedNodeId === node.id;

                const handleClick = (e) => {
                  e.stopPropagation();
                  if (onNodeClick) {
                    onNodeClick(node.id);
                  }
                  audioFx.playPinDrop();
                };

                return (
                  <g
                    key={node.id}
                    id={`node-pin-${node.id}`}
                    className="node-pop"
                    transform={`translate(${p.x}, ${p.y})`}
                    style={{ cursor: 'pointer', pointerEvents: 'all' }}
                    onMouseEnter={() => {
                      if (onNodeHover) onNodeHover(node.id);
                      audioFx.playClick();
                    }}
                    onMouseLeave={() => {
                      if (onNodeHover) onNodeHover(null);
                    }}
                    onClick={handleClick}
                  >
                    <circle
                      r={isHighlighted ? '14' : '10'}
                      fill={isHighlighted ? 'rgba(255, 42, 75, 0.45)' : 'rgba(255, 42, 75, 0.2)'}
                      stroke={isHighlighted ? '#ffffff' : '#ff2a4b'}
                      strokeWidth={isHighlighted ? '2' : '1.2'}
                      filter={isHighlighted ? 'url(#red-glow)' : 'none'}
                      style={{ pointerEvents: 'all' }}
                      onClick={handleClick}
                    />
                    <circle
                      r={isHighlighted ? '6' : '4.5'}
                      fill="#ffffff"
                      style={{ pointerEvents: 'all' }}
                      onClick={handleClick}
                    />
                    <text
                      x="0"
                      y="-14"
                      textAnchor="middle"
                      fill={isHighlighted ? '#00ff66' : '#ffffff'}
                      fontFamily="var(--font-mono)"
                      fontSize={isHighlighted ? '11px' : '9px'}
                      fontWeight="bold"
                    >
                      {`[${String.fromCharCode(65 + idx)}] ${node.label.split(' ')[0]}`}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
