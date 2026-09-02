import React, { useState, useEffect } from 'react';
import { audioFx } from '../services/audioFx.js';

export function Header({ onOpenConfig, currentView, onBackHome }) {
  const [clockText, setClockText] = useState('');
  const [isAudioActive, setIsAudioActive] = useState(!audioFx.isMuted);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const yr = now.getFullYear();
      const mo = String(now.getMonth() + 1).padStart(2, '0');
      const da = String(now.getDate()).padStart(2, '0');
      const hr = String(now.getHours()).padStart(2, '0');
      const mi = String(now.getMinutes()).padStart(2, '0');
      const se = String(now.getSeconds()).padStart(2, '0');
      setClockText(`${yr}.${mo}.${da} ${hr}:${mi}:${se}`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAudioToggle = () => {
    const unmuted = audioFx.toggleMute();
    setIsAudioActive(unmuted);
  };

  const isAnalysis = currentView === 'analysis';

  return (
    <header className="top-header" role="banner">
      <div className="header-left">
        <div
          className="sys-badge"
          data-clickable={isAnalysis ? 'true' : 'false'}
          style={{ cursor: isAnalysis ? 'pointer' : 'default' }}
          onClick={isAnalysis ? onBackHome : undefined}
          title={isAnalysis ? 'Volver al buscador' : undefined}
          role={isAnalysis ? 'button' : undefined}
          tabIndex={isAnalysis ? 0 : undefined}
          onKeyDown={isAnalysis ? (e) => {
            if (e.key === 'Enter') onBackHome();
          } : undefined}
          aria-label={isAnalysis ? 'Volver al buscador — HILOS' : 'HILOS'}
        >
          <span className="pulse-dot" aria-hidden="true" />
          HILOS
        </div>
        <span className="security-clearance" aria-label="Estado del enlace">
          ENLACE: AGARTHA-HAARP // CIFRADO ACTIVO
        </span>
      </div>

      <div className="header-right">
        <span className="header-time" aria-live="polite" aria-label="Hora actual">
          {clockText}
        </span>
        <button
          id="btn-audio-toggle"
          className={`btn-tactical${isAudioActive ? ' active' : ''}`}
          onClick={handleAudioToggle}
          title={isAudioActive ? 'Silenciar efectos' : 'Activar efectos de sonido'}
          aria-pressed={isAudioActive}
        >
          {isAudioActive ? 'AUDIO ON' : 'AUDIO OFF'}
        </button>
        <button
          id="btn-config"
          className="btn-tactical"
          onClick={onOpenConfig}
          title="Configurar Gemini API Key"
          aria-label="Configuración — llave secreta Gemini"
        >
          CONFIG
        </button>
      </div>
    </header>
  );
}
