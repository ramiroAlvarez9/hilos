import React, { useState, useEffect } from 'react';
import { getStoredApiKey, setStoredApiKey } from '../services/geminiService.js';
import { audioFx } from '../services/audioFx.js';

export function ConfigModal({ isOpen, onClose, onShowToast }) {
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (isOpen) {
      setApiKey(getStoredApiKey());
    }
  }, [isOpen]);

  const handleSave = () => {
    setStoredApiKey(apiKey);
    audioFx.playAlert();
    if (apiKey.trim()) {
      onShowToast('LLAVE GEMINI GUARDADA CORRECTAMENTE. MODO ONLINE ACTIVO.');
    } else {
      onShowToast('LLAVE ELIMINADA. MODO LOCAL OFFLINE ACTIVO.');
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop open"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="config-modal-box">
        <h3
          style={{
            color: 'var(--amber-alert)',
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            marginBottom: '8px',
          }}
        >
          ⚙️ CONFIGURACIÓN DE LLAVE GEMINI
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          Ingresá tu API Key de <strong>Google AI Studio</strong> para analizar cualquier imagen nueva en tiempo real con Gemini 1.5 Flash (Gratis). Si no tenés una, los presets precargados funcionan 100% offline.
        </p>
        <input
          type="password"
          className="input-tactical"
          placeholder="AIzaSy..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
          <button className="btn-tactical btn-danger" onClick={handleSave} style={{ flex: 1 }}>
            GUARDAR LLAVE
          </button>
          <button
            className="btn-tactical"
            onClick={() => {
              audioFx.playClick();
              onClose();
            }}
          >
            CERRAR
          </button>
        </div>
      </div>
    </div>
  );
}
