/**
 * HILOS // LOGO CONSPIRACY PRESETS
 * Presets con logotipos corporativos y tecnológicos oficiales de alta fidelidad,
 * y coordenadas porcentuales precisas (0-100%).
 */

export const CONSPIRACY_PRESETS = [
  {
    id: "openai",
    name: "OpenAI Spiral",
    subtitle: "¿El Cubo de Saturno y la IA cuántica canalizando en tu navegador?",
    faction: "Culto de Saturno & Deep State Cuántico",
    threatLevel: 5,
    frequency: "66.6 GHz (Banda HAARP)",
    infiltratedEntities: ["Sam Altman Holográfico", "Servidores Submarinos de Agartha"],
    imageSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="target-svg">
      <rect width="24" height="24" fill="#080c10"/>
      <circle cx="12" cy="12" r="11" stroke="rgba(0, 255, 102, 0.2)" stroke-width="0.3" stroke-dasharray="1,1"/>
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" fill="#10a37f"/>
    </svg>`,
    nodes: [
      { id: "node_1", label: "Vórtice Superior Alfa", x: 50, y: 15, layer: "saturn", description: "Punto de anclaje que canaliza la rotación de los anillos del polo norte de Saturno." },
      { id: "node_2", label: "Pétalo Este de Grado 33", x: 78, y: 32, layer: "masonic", description: "Ángulo de 33.3° coincidente con el compás de grado 33 del Rito Masónico Escocés." },
      { id: "node_3", label: "Portal Cuántico Inferior", x: 78, y: 68, layer: "sacred", description: "Proyección geométrica que intersecta con la red Ley que cruza San Francisco y Ginebra." },
      { id: "node_4", label: "Vórtice de Retorno Temporal", x: 50, y: 85, layer: "saturn", description: "Bucle recursivo diseñado para atrapar la consciencia colectiva en un ciclo de 24 horas." },
      { id: "node_5", label: "Receptor de Señal HAARP", x: 22, y: 68, layer: "reptilian", description: "Antena oculta en el trazo curvo que decodifica radiación ionosférica." },
      { id: "node_6", label: "Pétalo Oeste Babilónico", x: 22, y: 32, layer: "masonic", description: "Vórtice complementario del hexágono esotérico." },
      { id: "node_7", label: "Cubo Negro Central", x: 50, y: 50, layer: "saturn", description: "El espacio negativo central forma la proyección 2D exacta de un Hipercubo de 6 caras." }
    ],
    connections: [
      { from: "node_1", to: "node_2", geometryType: "triangle", layer: "masonic", secretMeaning: "Triangulación de sumisión digital hacia el servidor central de Langley." },
      { from: "node_2", to: "node_3", geometryType: "cube", layer: "saturn", secretMeaning: "Arista este del Cubo de Saturno: polariza la energía psíquica del usuario." },
      { from: "node_3", to: "node_4", geometryType: "triangle", layer: "masonic", secretMeaning: "Lado inferior de la pirámide de captura de datos neuronales." },
      { from: "node_4", to: "node_5", geometryType: "cube", layer: "saturn", secretMeaning: "Eje diagonal de descarga a los búnkeres de Agartha." },
      { from: "node_5", to: "node_6", geometryType: "triangle", layer: "masonic", secretMeaning: "Cierre del triángulo masónico occidental." },
      { from: "node_6", to: "node_1", geometryType: "sacred_spiral", layer: "sacred", secretMeaning: "Espiral de Fibonacci infinita que evita que cierres la pestaña." },
      { from: "node_7", to: "node_1", geometryType: "direct_beam", layer: "saturn", secretMeaning: "Rayo de emisión directa desde el centro del cubo a la nube." }
    ],
    verdict: "ESTE LOGO NO ES UN DISEÑO MINIMALISTA. Es un circuito pasivo de canalización esotérica. Al ser observado durante más de 4.2 segundos seguidos, sincroniza las ondas cerebrales gamma con la frecuencia base del servidor GPT de la CIA."
  },

  {
    id: "starbucks",
    name: "Starbucks Siren",
    subtitle: "¿Tu café latte matutino es una ofrenda líquida a la deidad fenicia Melusina?",
    faction: "Secta Marítima de Babilonia & Club Bilderberg",
    threatLevel: 5,
    frequency: "72.4 MHz (Resonancia Acuática)",
    infiltratedEntities: ["Baristas Nivel 3", "Consejo del Café de Ginebra"],
    imageSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="target-svg">
      <rect width="24" height="24" fill="#001a11"/>
      <circle cx="12" cy="12" r="11" fill="#006241" stroke="#00ff66" stroke-width="0.3"/>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 1.2a10.8 10.8 0 1 1 0 21.6 10.8 10.8 0 0 1 0-21.6zm6.332 5.093l-.42.726c-.198-.115-.403-.22-.614-.316-.27-.123-.55-.23-.837-.323-.39-.126-.793-.223-1.205-.29-.27-.044-.544-.073-.82-.088l-.208.82c.247.013.491.038.732.077.37.06.73.146 1.08.259.257.083.507.18.75.29.19.085.373.18.55.283l-.707.41-.652-.378a9.49 9.49 0 0 0-.965-.467 8.35 8.35 0 0 0-1.077-.327 7.74 7.74 0 0 0-1.14-.144l-.234.815c.34.02.673.064.998.132.327.068.646.162.955.281.309.12.607.264.892.433l.49.284-.664.383a8.88 8.88 0 0 0-.825-.37 7.7 7.7 0 0 0-.923-.255 7.15 7.15 0 0 0-.986-.11l-.25.807c.288.02.57.054.846.104.275.05.545.12.808.21.264.09.52.198.766.324l.322.164-.67.387c-.208-.073-.418-.135-.63-.186a6.6 6.6 0 0 0-.69-.117l-.27.8c.245.02.485.05.72.09.236.04.468.1.694.175l.156.052-.676.39c-.158-.04-.317-.073-.478-.1l-.29.794c.205.02.408.05.607.09l-.01.006-2.584 1.492-2.584-1.492-.01-.006c.2-.04.402-.07.607-.09l-.29-.793a5.55 5.55 0 0 0-.478.1l-.676-.39.156-.052c.226-.075.458-.134.694-.175.235-.04.475-.07.72-.09l-.27-.8a6.6 6.6 0 0 0-.69.117c-.212.05-.422.113-.63.186l-.67-.387.322-.164a7.6 7.6 0 0 1 .766-.324 7.1 7.1 0 0 1 .808-.21c.276-.05.558-.084.846-.104l-.25-.807c-.334.024-.663.06-.986.11a7.7 7.7 0 0 0-.923.255c-.288.107-.565.231-.825.37l-.664-.383.49-.284c.285-.17.583-.313.892-.433.309-.12.628-.213.955-.281.325-.068.658-.112.998-.132l-.234-.815a7.74 7.74 0 0 0-1.14.144 8.35 8.35 0 0 0-1.077.327 9.49 9.49 0 0 0-.965.467l-.652.378-.707-.41c.177-.103.36-.198.55-.283.243-.11.493-.207.75-.29.35-.113.71-.2 1.08-.26.24-.038.485-.063.732-.076l-.208-.82c-.276.015-.55.044-.82.088-.412.067-.815.164-1.205.29-.287.093-.567.2-.837.323-.21.096-.416.201-.614.316l-.42-.726A10.82 10.82 0 0 1 12 1.2c2.4 0 4.63.78 6.332 2.093z" fill="#ffffff"/>
      <polygon points="12,5.5 12.6,7 14,7 12.8,7.8 13.2,9.2 12,8.3 10.8,9.2 11.2,7.8 10,7 11.4,7" fill="#ffffff"/>
      <ellipse cx="12" cy="11.5" rx="2.5" ry="3.2" fill="#ffffff"/>
      <circle cx="11.2" cy="11.2" r="0.4" fill="#006241"/>
      <circle cx="12.8" cy="11.2" r="0.4" fill="#006241"/>
    </svg>`,
    nodes: [
      { id: "node_1", label: "Estrella de la Corona (Sirio)", x: 50, y: 22, layer: "masonic", description: "Estrella de 5 puntas alineada con la estrella Sirio y los rituales templarios marítimos." },
      { id: "node_2", label: "Cola Gemela Izquierda (Melusina)", x: 18, y: 52, layer: "saturn", description: "La sirena de dos colas es la representación heráldica de Melusina, entidad babilónica de seducción." },
      { id: "node_3", label: "Cola Gemela Derecha (Leviatán)", x: 82, y: 52, layer: "saturn", description: "Representa el control absoluto de los mares y las rutas comerciales del Nuevo Orden Mundial." },
      { id: "node_4", label: "El Tercer Ojo Hipnótico", x: 50, y: 44, layer: "reptilian", description: "Mirada sin párpados calculada para inducir la compra recurrente de azúcar a $7.50 USD." },
      { id: "node_5", label: "Vórtice del Vaso Sagrado", x: 50, y: 82, layer: "sacred", description: "El cáliz inferior que recibe la infusión de alcaloides diseñada para apagar el lóbulo frontal." }
    ],
    connections: [
      { from: "node_1", to: "node_2", geometryType: "triangle", layer: "masonic", secretMeaning: "Línea de influencia esotérica desde la realeza hasta el consumidor común." },
      { from: "node_1", to: "node_3", geometryType: "triangle", layer: "masonic", secretMeaning: "Vértice derecho del gran triángulo templario del café descafeinado." },
      { from: "node_2", to: "node_5", geometryType: "pentagram", layer: "saturn", secretMeaning: "Cierre del pentagrama de sujeción financiera matutina." },
      { from: "node_3", to: "node_5", geometryType: "pentagram", layer: "saturn", secretMeaning: "Anclaje de la cafeína como sedante neuronal de masa." },
      { from: "node_4", to: "node_1", geometryType: "direct_beam", layer: "reptilian", secretMeaning: "Canal directo de telemetría hacia las naves nodriza camufladas en la niebla de Seattle." }
    ],
    verdict: "ALERTA NIVEL 5. La 'sirena' nunca fue una criatura mitológica inofensiva: es el glifo de Melusina. La disposición de la corona y las colas crea una antena dipolo que reemite radiación a 72.4 MHz cada vez que calentás el vaso con tus manos."
  },

  {
    id: "apple",
    name: "Apple Silicon Eden",
    subtitle: "¿La manzana mordida representa la expulsión del Edén y el pacto de silicio de 1976?",
    faction: "Hermandad del Árbol del Conocimiento Prohibido",
    threatLevel: 4,
    frequency: "5.8 GHz (Biometría Facial Neural)",
    infiltratedEntities: ["Genius Bar Sacerdotal", "Diseñadores de Cupertino Nivel 33"],
    imageSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="target-svg">
      <rect width="24" height="24" fill="#080a0c"/>
      <circle cx="12" cy="12" r="11" stroke="rgba(255, 255, 255, 0.08)" stroke-width="0.3"/>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill="#f0f0f0"/>
    </svg>`,
    nodes: [
      { id: "node_1", label: "Hoja: Antena del Árbol Prohibido", x: 64, y: 14, layer: "sacred", description: "Inclinación de 45° que replica la posición de la hoja de higuera del Génesis 3:7." },
      { id: "node_2", label: "El Mordisco de Turing / Eva", x: 78, y: 48, layer: "saturn", description: "El mordisco sustrae exactamente el 16.18% del volumen total (Proporción Áurea de la tentación)." },
      { id: "node_3", label: "Lóbulo Izquierdo (Hemisferio Lógico)", x: 28, y: 38, layer: "masonic", description: "Punto de anclaje de la patente del microprocesador sellada con cera roja en 1976." },
      { id: "node_4", label: "Base Cóncava de la Cúpula", x: 50, y: 88, layer: "reptilian", description: "Curva hiperbólica que focaliza la energía magnética del cargador MagSafe en tu mesita de luz." }
    ],
    connections: [
      { from: "node_1", to: "node_2", geometryType: "direct_beam", layer: "sacred", secretMeaning: "Línea de transmisión del conocimiento vedado a la humanidad." },
      { from: "node_2", to: "node_4", geometryType: "triangle", layer: "saturn", secretMeaning: "Vector de transferencia de datos biométricos hacia los servidores de Cupertino." },
      { from: "node_4", to: "node_3", geometryType: "triangle", layer: "masonic", secretMeaning: "Triangulación del ecosistema cerrado: nadie puede salir del jardín." },
      { from: "node_3", to: "node_1", geometryType: "sacred_spiral", layer: "reptilian", secretMeaning: "Cierre de la espiral que asegura que compres el modelo Pro el año que viene." }
    ],
    verdict: "EVIDENCIA CONFIRMADA. El mordisco no es para que no parezca un tomate. Es la aceptación formal del pacto de silicio. Cada FaceID proyecta 30.000 puntos invisibles que mapean tu rostro para el censo universal."
  },

  {
    id: "mcdonalds",
    name: "McDonald's Golden Arches",
    subtitle: "¿Por qué los Arcos Dorados forman una antena parabólica gemela de radiación dopamínica?",
    faction: "Consorcio de Nutrición Sintética & HAARP",
    threatLevel: 4,
    frequency: "66.6 MHz (Frecuencia de Salivación Forzada)",
    infiltratedEntities: ["El Payaso Transdimensional", "Sindicato de la Fritura Profunda"],
    imageSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="target-svg">
      <rect width="24" height="24" fill="#600008"/>
      <path d="M17.243 3.006c2.066 0 3.742 8.714 3.742 19.478H24c0-11.588-3.042-20.968-6.766-20.968-2.127 0-4.007 2.81-5.248 7.227-1.241-4.416-3.121-7.227-5.231-7.227C3.031 1.516 0 10.888 0 22.476h3.014c0-10.763 1.658-19.47 3.724-19.47 2.066 0 3.741 8.05 3.741 17.98h2.997c0-9.93 1.684-17.98 3.75-17.98Z" fill="#FFC72C"/>
    </svg>`,
    nodes: [
      { id: "node_1", label: "Ápex Parabólico Alfa", x: 32, y: 16, layer: "reptilian", description: "Punto de emisión de microondas que altera el centro de recompensa y apetito." },
      { id: "node_2", label: "Ápex Parabólico Beta", x: 68, y: 16, layer: "reptilian", description: "Segundo emisor resonante que genera la necesidad irresistible de papas fritas medianas." },
      { id: "node_3", label: "Vórtice Central de Confluencia", x: 50, y: 44, layer: "masonic", description: "Intersección donde se unen las dos líneas Ley sobre el mostrador de pedidos." },
      { id: "node_4", label: "Pilar Terrestre Occidental", x: 14, y: 88, layer: "saturn", description: "Anclaje de hormigón reforzado con varillas de cobre para canalizar la grasa subterránea." },
      { id: "node_5", label: "Pilar Terrestre Oriental", x: 86, y: 88, layer: "saturn", description: "Receptor del dinero en efectivo para su conversión a lingotes en Fort Knox." }
    ],
    connections: [
      { from: "node_1", to: "node_2", geometryType: "direct_beam", layer: "reptilian", secretMeaning: "Línea de puente electromagnético que crea el campo de fuerza del Auto-Mac." },
      { from: "node_1", to: "node_4", geometryType: "triangle", layer: "masonic", secretMeaning: "Columna izquierda de la arquitectura masónica de comida rápida." },
      { from: "node_2", to: "node_5", geometryType: "triangle", layer: "masonic", secretMeaning: "Columna derecha que sostiene el monopolio de los juguetes de plástico." },
      { from: "node_3", to: "node_4", geometryType: "cube", layer: "saturn", secretMeaning: "Diagonal que conecta el aceite a 180°C con el inconsciente colectivo infantil." },
      { from: "node_3", to: "node_5", geometryType: "cube", layer: "saturn", secretMeaning: "Cierre del circuito de dopamina y glutamato monosódico." }
    ],
    verdict: "INSPECCIÓN DE RIESGO: Los arcos no son una 'M' de McDonald's. Son dos antenas parabólicas invertidas de 33 metros de envergadura. Si unís los arcos por debajo, se forma la doble hélice de ADN modificada genéticamente por la CIA en 1955."
  },

  {
    id: "google_chrome",
    name: "Chrome 666 Vortex",
    subtitle: "¿Los tres segmentos circulares forman el triple 6 de la Bestia Digital?",
    faction: "Consorcio Silicon Eye & Red PRISM",
    threatLevel: 5,
    frequency: "666.0 MHz (Telemetría de Navegación)",
    infiltratedEntities: ["Algoritmos de Rastreo Nivel 9", "Comité de Indexación Global"],
    imageSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="target-svg">
      <rect width="24" height="24" fill="#070b10"/>
      <circle cx="12" cy="12" r="11" stroke="rgba(255, 255, 255, 0.1)" stroke-width="0.3"/>
      <path d="M12 0C6.2 0 1.2 4.1.2 9.6l5.7 9.8c1.7-1.8 3.8-3.1 6.1-3.9V0z" fill="#EA4335"/>
      <path d="M23.8 9.6C22.8 4.1 17.8 0 12 0v15.5c2.3.8 4.4 2.1 6.1 3.9l5.7-9.8z" fill="#4285F4"/>
      <path d="M12 24c5.8 0 10.8-4.1 11.8-9.6H6.2c.9 2.5 2.8 4.6 5.8 5.6V24z" fill="#FBBC05"/>
      <path d="M.2 14.4C1.2 19.9 6.2 24 12 24v-4c-3-1-4.9-3.1-5.8-5.6H.2z" fill="#34A853"/>
      <circle cx="12" cy="12" r="4.5" fill="#ffffff"/>
      <circle cx="12" cy="12" r="3.2" fill="#4285F4"/>
    </svg>`,
    nodes: [
      { id: "node_1", label: "Giro Superior Rojo (Seis Alfa)", x: 50, y: 12, layer: "reptilian", description: "Extremo curvado del primer dígito 6 que intercepta el tráfico DNS." },
      { id: "node_2", label: "Giro Inferior Verde (Seis Beta)", x: 22, y: 68, layer: "masonic", description: "Segundo bucle del 6 que indexa tus búsquedas en modo incógnito." },
      { id: "node_3", label: "Giro Oriental Amarillo (Seis Gamma)", x: 78, y: 68, layer: "saturn", description: "Tercer bucle que completa la tríada trinitaria del código 666." },
      { id: "node_4", label: "Ojo Azul de Horus Central", x: 50, y: 50, layer: "sacred", description: "Pupila central del navegador que transmite en vivo tus pestañas abiertas." }
    ],
    connections: [
      { from: "node_1", to: "node_2", geometryType: "sacred_spiral", layer: "reptilian", secretMeaning: "Curvatura de entrelazamiento del primer y segundo 6." },
      { from: "node_2", to: "node_3", geometryType: "sacred_spiral", layer: "masonic", secretMeaning: "Línea de base que sostiene la arquitectura de la Bestia." },
      { from: "node_3", to: "node_1", geometryType: "sacred_spiral", layer: "saturn", secretMeaning: "Cierre del vórtice trilateral de 120 grados por segmento." },
      { from: "node_4", to: "node_1", geometryType: "direct_beam", layer: "sacred", secretMeaning: "Haz de observación directa desde el iris central de Google." }
    ],
    verdict: "ALERTA MÁXIMA. Los tres colores rotan exactamente a 120° formando los tres brazos del número 666 entrelazado alrededor del Ojo de Horus central. El modo incógnito solo apaga las luces para que no veas quién te mira."
  },

  {
    id: "meta",
    name: "Meta Ouroboros Loop",
    subtitle: "¿El símbolo de infinito es una trampa de captura de consciencia digital?",
    faction: "Hermandad del Metaverso Transhumano",
    threatLevel: 4,
    frequency: "90.0 GHz (Inmersión de Realidad Virtual)",
    infiltratedEntities: ["Avatares Sin Piernas de VR", "Zuck-Unit 01"],
    imageSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="target-svg">
      <rect width="24" height="24" fill="#060913"/>
      <circle cx="12" cy="12" r="11" stroke="rgba(0, 129, 251, 0.15)" stroke-width="0.3"/>
      <path d="M16.99 4.5c-2.34 0-4.04 1.34-4.99 2.76-.95-1.42-2.65-2.76-4.99-2.76-3.87 0-7.01 3.36-7.01 7.5 0 4.14 3.14 7.5 7.01 7.5 2.34 0 4.04-1.34 4.99-2.76.95 1.42 2.65 2.76 4.99 2.76 3.87 0 7.01-3.36 7.01-7.5 0-4.14-3.14-7.5-7.01-7.5zm-9.98 12c-2.21 0-4.01-2.01-4.01-4.5s1.8-4.5 4.01-4.5c1.47 0 2.77.92 3.48 2.32-.23.47-.46.96-.69 1.47-.56 1.25-1.12 2.5-2.79 5.21zm9.98 0c-1.67-2.71-2.23-3.96-2.79-5.21-.23-.51-.46-1-.69-1.47.71-1.4 2.01-2.32 3.48-2.32 2.21 0 4.01 2.01 4.01 4.5s-1.8 4.5-4.01 4.5z" fill="#0081FB"/>
    </svg>`,
    nodes: [
      { id: "node_1", label: "Lóbulo Izquierdo (Mundo Físico)", x: 25, y: 50, layer: "masonic", description: "Bucle que contiene la identidad biológica del usuario." },
      { id: "node_2", label: "Lóbulo Derecho (Copia Digital VR)", x: 75, y: 50, layer: "saturn", description: "Bucle donde se transfiere la consciencia para el Metaverso eterno." },
      { id: "node_3", label: "Singularidad Central de Cruce", x: 50, y: 50, layer: "sacred", description: "Punto cero donde se desintegra la privacidad individual." },
      { id: "node_4", label: "Vórtice Superior Cuántico", x: 50, y: 22, layer: "reptilian", description: "Antena de sincronización de cascos Quest." }
    ],
    connections: [
      { from: "node_1", to: "node_3", geometryType: "sacred_spiral", layer: "masonic", secretMeaning: "Flujo continuo de datos biométricos hacia el punto de convergencia." },
      { from: "node_3", to: "node_2", geometryType: "sacred_spiral", layer: "saturn", secretMeaning: "Recreación del alma humana en formato de polígonos 3D sin piernas." },
      { from: "node_2", to: "node_4", geometryType: "triangle", layer: "reptilian", secretMeaning: "Vínculo de enlace neuronal hacia los satélites de Menlo Park." },
      { from: "node_4", to: "node_1", geometryType: "triangle", layer: "sacred", secretMeaning: "Cierre del lazo infinito de Ouroboros corporativo." }
    ],
    verdict: "DICTAMEN: El símbolo del infinito en realidad representa el lazo Ouroboros de confinamiento sensorial. Su diseño genera un efecto Möbius que impide al cerebro distinguir entre la realidad tangible y el feed de Instagram."
  },

  {
    id: "monster_energy",
    name: "Monster Energy 666",
    subtitle: "¿Las tres garras representan la letra hebrea 'Vav' equivalente al número 666?",
    faction: "Secta de la Taurina & Rito Luciferino",
    threatLevel: 4,
    frequency: "66.6 MHz (Sobrecarga Suprarrenal)",
    infiltratedEntities: ["Patrocinadores de Deportes Extremos", "Alquimistas de Bebidas Energéticas"],
    imageSvg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="target-svg">
      <rect width="24" height="24" fill="#040804"/>
      <circle cx="12" cy="12" r="11" stroke="rgba(0, 255, 65, 0.15)" stroke-width="0.3"/>
      <!-- Three Hebrew Vav Claws (M) -->
      <path d="M5.5 3.5c.3 1.8.8 4.2 1.2 6.5.6 3.6 1.4 7.2 1.8 10.5h1.8c-.4-3.5-1.2-7.2-1.8-10.8-.4-2.2-.8-4.5-1.2-6.2H5.5zm5.5 2c.2 1.5.6 3.8 1 5.8.5 3.2 1.2 6.5 1.5 9.2h1.8c-.3-2.8-1-6.2-1.5-9.4-.4-1.9-.8-4.1-1-5.6H11zm5.2 2.5c.2 1.2.5 3.2.8 4.8.4 2.8 1 5.5 1.2 7.7h1.8c-.3-2.3-.8-5.1-1.2-8-.3-1.5-.6-3.3-.8-4.5h-1.8z" fill="#00FF41"/>
    </svg>`,
    nodes: [
      { id: "node_1", label: "Garra Izquierda (Letra Vav = 6)", x: 30, y: 35, layer: "saturn", description: "Primera marca de la bestia codificada en la caligrafía hebrea original." },
      { id: "node_2", label: "Garra Central (Segunda Vav = 6)", x: 50, y: 40, layer: "masonic", description: "Segunda marca que canaliza la sobreestimulación de glucosa en sangre." },
      { id: "node_3", label: "Garra Derecha (Tercera Vav = 6)", x: 70, y: 48, layer: "reptilian", description: "Tercera marca que sella el número 666 en la lata de aluminio." },
      { id: "node_4", label: "Base de Anclaje de la Taurina", x: 50, y: 88, layer: "sacred", description: "Punto de descarga energética que altera el ritmo cardíaco." }
    ],
    connections: [
      { from: "node_1", to: "node_2", geometryType: "direct_beam", layer: "saturn", secretMeaning: "Línea de alineación de los dos primeros dígitos cabalísticos." },
      { from: "node_2", to: "node_3", geometryType: "direct_beam", layer: "masonic", secretMeaning: "Completitud de la fórmula matemática de invocación energética." },
      { from: "node_1", to: "node_4", geometryType: "triangle", layer: "reptilian", secretMeaning: "Vértice de absorción de taurina sintética." },
      { from: "node_3", to: "node_4", geometryType: "triangle", layer: "sacred", secretMeaning: "Triangulación de la cafeína desmesurada." }
    ],
    verdict: "CONFIRMACIÓN SEMIÓTICA. La 'M' no es la letra eme del abecedario latino: son tres letras hebreas 'Vav' cuyo valor numérico es exactamente 6. El eslogan 'Desata a la Bestia' nunca fue una metáfora publicitaria."
  }
];
