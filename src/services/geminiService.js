/**
 * HILOS // GEMINI VISION SERVICE
 * Analizador multimodal de simbolismo oculto y geometría conspiranoica en vivo.
 * Coordenadas estrictamente porcentuales (0-100%).
 */

const STORAGE_KEY = "RED_STRING_GEMINI_KEY";

export const getStoredApiKey = () => {
  return localStorage.getItem(STORAGE_KEY) || "";
};

export const setStoredApiKey = (key) => {
  if (key) {
    localStorage.setItem(STORAGE_KEY, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
};

/**
 * Convierte un File o Blob a Base64 puro (sin prefijo data URL)
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const base64 = result.split(',')[1];
      resolve({ base64, mimeType: file.type || 'image/jpeg', dataUrl: result });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Analiza una imagen subida usando Gemini 1.5/2.0 Flash con JSON estructurado
 */
export const analyzeImageWithGemini = async (base64Data, mimeType, apiKey) => {
  const key = apiKey || getStoredApiKey();
  
  if (!key) {
    throw new Error("NO_API_KEY");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`;

  const systemInstruction = `Sos "HILOS v33.0", el motor forense de detección de geometría oculta y simbolismos conspirativos en LOGOS CORPORATIVOS, MARCAS e ICONOS.
Tu trabajo es analizar la imagen provista (logotipo de marca, emblema o símbolo) y encontrar de forma hiperbólica, creativa y visualmente impactante todas las conexiones geométricas ocultas, puntos de anclaje, vórtices de energía y conspiraciones.

REQUISITO TÉCNICO CRUCIAL:
Todas las coordenadas de 'nodes' deben ser PORCENTAJES RELATIVOS EXACTOS (0 a 100) sobre la imagen (x = 0 es izquierda, x = 100 es derecha; y = 0 es arriba, y = 100 es abajo). Ubica los nodos en curvas clave, esquinas, centros geométricos, cortes o ángulos del logo.

Debes responder ÚNICAMENTE con un JSON válido con esta estructura exacta:
{
  "name": "Nombre conspirativo del logo/marca (ej: Nike Wing of Apollyon)",
  "subtitle": "¿Pregunta conspiranoica cotidiana sobre este logo?",
  "faction": "Facción oculta responsable (ej: Culto de Saturno, Draconianos de Agartha, Masonería Grado 33, CIA MK-Ultra, HAARP)",
  "threatLevel": 4, // Número entero del 1 al 5
  "frequency": "Frecuencia de emisión estimada (ej: 66.6 GHz, 33.3 MHz)",
  "infiltratedEntities": ["Entidad 1", "Entidad 2"],
  "nodes": [
    {
      "id": "node_1",
      "label": "Nombre del vértice (ej: Vórtice Áureo de Orión)",
      "x": 45.5, // 0-100%
      "y": 28.2, // 0-100%
      "layer": "masonic", // Puede ser "masonic", "saturn", "reptilian" o "sacred"
      "description": "Explicación forense de por qué este punto exacto canaliza la conspiración."
    },
    {
      "id": "node_2",
      "label": "Nodo 2",
      "x": 65.0,
      "y": 55.0,
      "layer": "saturn",
      "description": "Explicación del punto 2."
    },
    {
      "id": "node_3",
      "label": "Nodo 3",
      "x": 30.0,
      "y": 75.0,
      "layer": "reptilian",
      "description": "Explicación del punto 3."
    },
    {
      "id": "node_4",
      "label": "Nodo 4",
      "x": 50.0,
      "y": 50.0,
      "layer": "sacred",
      "description": "Explicación del punto 4."
    }
  ],
  "connections": [
    {
      "from": "node_1",
      "to": "node_2",
      "geometryType": "triangle", // "triangle", "cube", "pentagram", "sacred_spiral" o "direct_beam"
      "layer": "masonic",
      "secretMeaning": "Significado desclasificado de la línea que une estos dos nodos."
    },
    {
      "from": "node_2",
      "to": "node_3",
      "geometryType": "triangle",
      "layer": "saturn",
      "secretMeaning": "Significado de la línea 2."
    },
    {
      "from": "node_3",
      "to": "node_1",
      "geometryType": "pentagram",
      "layer": "reptilian",
      "secretMeaning": "Significado de la línea 3."
    },
    {
      "from": "node_4",
      "to": "node_1",
      "geometryType": "direct_beam",
      "layer": "sacred",
      "secretMeaning": "Significado del rayo central."
    }
  ],
  "verdict": "Veredicto ejecutivo forense en mayúsculas estilo informe clasificado de la CIA."
}`;

  const payload = {
    contents: [
      {
        parts: [
          { text: systemInstruction },
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      topP: 0.95,
      responseMimeType: "application/json"
    }
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`GEMINI_API_ERROR: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("EMPTY_GEMINI_RESPONSE");
  }

  try {
    const parsed = JSON.parse(rawText);
    // Ensure all required fields exist
    parsed.id = "custom_" + Date.now();
    return parsed;
  } catch (err) {
    console.error("JSON parse error from Gemini:", rawText);
    throw new Error("INVALID_JSON_FROM_MODEL");
  }
};
