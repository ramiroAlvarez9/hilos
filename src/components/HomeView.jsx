import React, { useState } from 'react';
import { CONSPIRACY_PRESETS } from '../data/presets.js';
import { audioFx } from '../services/audioFx.js';

export function HomeView({ onSelectTarget, onTriggerUpload, onTriggerCamera, onRandomPreset }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPresets = CONSPIRACY_PRESETS.filter(p => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.subtitle.toLowerCase().includes(q) ||
      p.faction.toLowerCase().includes(q)
    );
  });

  return (
    <div className="home-view">
      {/* Hero */}
      <section className="hero-section">
        <svg
          className="illuminati-icon"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <polygon
            points="50,8 92,88 8,88"
            stroke="#e8213c"
            strokeWidth="2.5"
            fill="rgba(232,33,60,0.04)"
          />
          <circle cx="50" cy="58" r="16" stroke="#00e566" strokeWidth="1.5" fill="none" />
          <ellipse cx="50" cy="58" rx="4.5" ry="11" fill="#e8213c" />
          <circle cx="50" cy="58" r="2.5" fill="#ffffff" />
          <line x1="50" y1="8" x2="50" y2="2" stroke="#f0a500" strokeWidth="1.5" />
          <line x1="92" y1="88" x2="98" y2="92" stroke="#f0a500" strokeWidth="1.5" />
          <line x1="8" y1="88" x2="2" y2="92" stroke="#f0a500" strokeWidth="1.5" />
        </svg>
        <h1 className="hero-title">HILOS</h1>
      </section>

      {/* Search */}
      <section className="search-container" aria-label="Buscador de logos">
        <div className="search-box-wrapper">
          <span className="search-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <input
            id="main-search"
            type="text"
            className="main-search-input"
            placeholder="¿Qué logo querés investigar hoy? (OpenAI, Apple, Google, Starbucks...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
            aria-label="Buscar logo o marca"
          />
        </div>

        <div className="action-triggers">
          <button
            id="btn-upload-evidence"
            className="btn-tactical btn-primary"
            onClick={onTriggerUpload}
            title="Subir logo o imagen para analizar"
          >
            SUBIR LOGO
          </button>
          <button
            id="btn-scan-camera"
            className="btn-tactical"
            onClick={onTriggerCamera}
            title="Escanear logo con la cámara"
          >
            ESCANEAR LOGO
          </button>
          <button
            id="btn-random-preset"
            className="btn-tactical"
            onClick={onRandomPreset}
            title="Seleccionar logo aleatorio"
          >
            LOGO ALEATORIO
          </button>
        </div>
      </section>

      {/* Presets Grid */}
      <section className="trends-section" aria-label="Logotipos investigados">
        <div className="section-header">
          <h2 className="section-title">
            EXPEDIENTES DE LOGOTIPOS
            <span className="live-tag">
              <span className="pulse-dot" style={{ width: '5px', height: '5px' }} />
              BASE DE DATOS
            </span>
          </h2>
          <span className="section-count">{CONSPIRACY_PRESETS.length} LOGOS ACTIVOS</span>
        </div>

        {filteredPresets.length === 0 ? (
          <div className="empty-search-state">
            Sin resultados para "{searchTerm}". Intentá subir la imagen de cualquier logo corporativo.
          </div>
        ) : (
          <div className="presets-grid" role="list">
            {filteredPresets.map((preset) => (
              <article
                key={preset.id}
                className="preset-card"
                role="listitem"
                onClick={() => {
                  audioFx.playClick();
                  onSelectTarget(preset);
                }}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    audioFx.playClick();
                    onSelectTarget(preset);
                  }
                }}
                aria-label={`Analizar logo de ${preset.name}`}
              >
                <div className="preset-card-header">
                  <div
                    className="preset-thumbnail"
                    dangerouslySetInnerHTML={{ __html: preset.imageSvg }}
                    aria-hidden="true"
                  />
                  <div className="preset-meta">
                    <div className="preset-name">{preset.name}</div>
                    <div className="preset-faction">{preset.faction}</div>
                  </div>
                </div>

                <div className="preset-card-body">
                  <p className="preset-query">{preset.subtitle}</p>
                </div>

                <div className="preset-footer">
                  <span className={`threat-pill threat-${preset.threatLevel}`}>
                    DEFCON {6 - preset.threatLevel}
                  </span>
                  <span className="inspect-cue">TRAZAR HILOS →</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
