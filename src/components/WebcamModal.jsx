import React, { useRef, useEffect } from 'react';
import { audioFx } from '../services/audioFx.js';

export function WebcamModal({ isOpen, onClose, onCapture }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' },
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error('Camera access error:', err);
          alert('No se pudo acceder a la cámara o el permiso fue denegado.');
          onClose();
        }
      };
      startCamera();
    } else {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [isOpen]);

  const handleCapture = () => {
    if (!videoRef.current) return;
    audioFx.playPinDrop();

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], 'escaneo_logo_en_vivo.jpg', { type: 'image/jpeg' });
        onCapture(file);
      }
    }, 'image/jpeg');

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
            color: 'var(--crt-green)',
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            marginBottom: '8px',
          }}
        >
          📷 ESCÁNER DE LOGOS Y SÍMBOLOS EN VIVO
        </h3>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
          Apuntá la cámara a cualquier logo corporativo (taza, remera, packaging o pantalla) para capturarlo y trazar sus conexiones con Wikipedia.
        </p>
        <div
          style={{
            width: '100%',
            height: '240px',
            background: '#000',
            border: '1px solid var(--border-tactical)',
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '12px',
            position: 'relative',
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-tactical btn-danger" onClick={handleCapture} style={{ flex: 1 }}>
            CAPTURAR LOGO
          </button>
          <button
            className="btn-tactical"
            onClick={() => {
              audioFx.playClick();
              onClose();
            }}
          >
            CANCELAR
          </button>
        </div>
      </div>
    </div>
  );
}
