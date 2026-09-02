import React, { useState, useRef } from 'react';
import { Header } from './components/Header.jsx';
import { HomeView } from './components/HomeView.jsx';
import { AnalysisView } from './components/AnalysisView.jsx';
import { WebcamModal } from './components/WebcamModal.jsx';
import { ConfigModal } from './components/ConfigModal.jsx';
import { ToastContainer } from './components/ToastContainer.jsx';
import { CONSPIRACY_PRESETS } from './data/presets.js';
import { audioFx } from './services/audioFx.js';
import { analyzeImageWithGemini, fileToBase64, getStoredApiKey } from './services/geminiService.js';

export function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'analysis'
  const [currentTarget, setCurrentTarget] = useState(null);
  const [isWebcamOpen, setIsWebcamOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  const fileInputRef = useRef(null);

  const showToast = (message) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleSelectTarget = (target) => {
    setCurrentTarget(target);
    setCurrentView('analysis');
    showToast(`ANALIZANDO LOGO: ${target.name}`);
    window.scrollTo(0, 0);
  };

  const handleBackHome = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  const handleRandomPreset = () => {
    const random = CONSPIRACY_PRESETS[Math.floor(Math.random() * CONSPIRACY_PRESETS.length)];
    handleSelectTarget(random);
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    showToast('DESENCRIPTANDO LOGO CON VISIÓN MULTIMODAL...');
    audioFx.playScan();

    try {
      const { base64, mimeType, dataUrl } = await fileToBase64(file);
      const apiKey = getStoredApiKey();

      if (apiKey) {
        // Online analysis via Gemini Flash
        const result = await analyzeImageWithGemini(base64, mimeType, apiKey);
        result.dataUrl = dataUrl;
        handleSelectTarget(result);
        showToast('¡CONEXIÓN ESTABLECIDA! HILOS TRAZADOS.');
      } else {
        // Fallback procedural offline analysis
        showToast('MODO OFFLINE ACTIVO. GENERANDO TRAZADO PROCEDURAL.');
        const fallbackTarget = generateProceduralTarget(file.name, dataUrl);
        handleSelectTarget(fallbackTarget);
      }
    } catch (err) {
      console.error('Error analyzing image:', err);
      showToast('INTERFERENCIA EN LA TRANSMISIÓN. USANDO MODO DE RESPALDO LOCAL.');
      const { dataUrl } = await fileToBase64(file);
      const fallbackTarget = generateProceduralTarget(file.name, dataUrl);
      handleSelectTarget(fallbackTarget);
    }
  };

  const generateProceduralTarget = (fileName, dataUrl) => {
    const cleanName = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
    return {
      id: 'procedural_' + Date.now(),
      name: `Logo: ${cleanName.toUpperCase()}`,
      subtitle: '¿Por qué este emblema corporativo emite vibraciones electromagnéticas anómalas?',
      faction: 'Comité de Vigilancia Cuántica // Nivel 33',
      threatLevel: 4,
      frequency: '88.8 MHz (Resonancia Subliminal)',
      infiltratedEntities: ['Agentes de Campo de Langley', 'Comité de Sombras'],
      dataUrl: dataUrl,
      nodes: [
        {
          id: 'node_1',
          label: 'Vórtice Superior Alfa',
          x: 50,
          y: 25,
          layer: 'masonic',
          description: 'Punto de alineación con el norte magnético y el compás masónico.',
        },
        {
          id: 'node_2',
          label: 'Nodo Espectral Derecho',
          x: 75,
          y: 50,
          layer: 'saturn',
          description: 'Vértice de emisión de radiación detectado en la curvatura del logo.',
        },
        {
          id: 'node_3',
          label: 'Anclaje Terrestre Inferior',
          x: 50,
          y: 75,
          layer: 'reptilian',
          description: 'Conexión subterránea directa con la red de túneles de Agartha.',
        },
        {
          id: 'node_4',
          label: 'Receptor Izquierdo',
          x: 25,
          y: 50,
          layer: 'sacred',
          description: 'Proporción áurea que modula el pensamiento crítico del observador.',
        },
        {
          id: 'node_5',
          label: 'Núcleo del Ojo Oculto',
          x: 50,
          y: 50,
          layer: 'saturn',
          description: 'El punto ciego del centro oculta la firma criptográfica del Estado Profundo.',
        },
      ],
      connections: [
        {
          from: 'node_1',
          to: 'node_2',
          geometryType: 'triangle',
          layer: 'masonic',
          secretMeaning: 'Lado este de la pirámide de observación global.',
        },
        {
          from: 'node_2',
          to: 'node_3',
          geometryType: 'triangle',
          layer: 'saturn',
          secretMeaning: 'Diagonal de sumisión que polariza la frecuencia cerebral.',
        },
        {
          from: 'node_3',
          to: 'node_4',
          geometryType: 'triangle',
          layer: 'reptilian',
          secretMeaning: 'Cierre de la tríada de control biológico.',
        },
        {
          from: 'node_4',
          to: 'node_1',
          geometryType: 'sacred_spiral',
          layer: 'sacred',
          secretMeaning: 'Espiral áurea de sujeción óptica.',
        },
        {
          from: 'node_5',
          to: 'node_1',
          geometryType: 'direct_beam',
          layer: 'saturn',
          secretMeaning: 'Canal directo de telemetría hacia el servidor central.',
        },
      ],
      verdict:
        'EVIDENCIA PROCESADA CON ÉXITO. La geometría de este logotipo coincide en un 94.7% con los planos desclasificados del Rito Escocés de 1888. SE RECOMIENDA NO OBSERVAR FIJAMENTE.',
    };
  };

  return (
    <div id="app">
      <Header
        currentView={currentView}
        onBackHome={handleBackHome}
        onOpenConfig={() => setIsConfigOpen(true)}
      />

      <main id="main-content">
        {currentView === 'home' ? (
          <HomeView
            onSelectTarget={handleSelectTarget}
            onTriggerUpload={() => fileInputRef.current?.click()}
            onTriggerCamera={() => setIsWebcamOpen(true)}
            onRandomPreset={handleRandomPreset}
          />
        ) : (
          <AnalysisView
            targetData={currentTarget}
            onBackHome={handleBackHome}
          />
        )}
      </main>

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileUpload(file);
          e.target.value = '';
        }}
      />

      {/* Modals */}
      <WebcamModal
        isOpen={isWebcamOpen}
        onClose={() => setIsWebcamOpen(false)}
        onCapture={handleFileUpload}
      />

      <ConfigModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onShowToast={showToast}
      />

      <ToastContainer toasts={toasts} />
    </div>
  );
}
