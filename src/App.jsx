import { useState, useEffect, useRef } from "react";

const VERSION       = "B";
const TEAM_NAMES    = ["BETA", "DELTA", "ZETA"];
const PASSWORD      = ["B","I","E","N","M","E","S","A","B","E"];
const PASSWORD_WORD = "BIENMESABE";
const GLOBAL_MIN    = 90;

const BLOCKS = [
  { label:"🟢 Bloque I — Calentamiento", retos:[1,2,3], color:"#2E6B4A", bg:"rgba(46,107,74,0.15)" },
  { label:"🟡 Bloque II — Núcleo técnico", retos:[4,5,6,7], color:"#92640A", bg:"rgba(146,100,10,0.15)" },
  { label:"🔴 Bloque III — Sprint final", retos:[8,9,10], color:"#B91C1C", bg:"rgba(185,28,28,0.15)" },
];

const RETOS = [
  // ── BLOQUE I ──────────────────────────────────────────────────────────────
  {
    id:1, emoji:"🔍", title:"La cocina del desastre",
    color:"#B91C1C", colorLight:"#FFF1F1", tiempo:10, sprint:false,
    mision:"La inspectora ambiental llegó sin aviso a la Pastelería «Dulce Verde» y encontró 6 problemas graves. Identifíquenlos todos antes de que el establecimiento sea clausurado.",
    escena:{
      titulo:"LA ESCENA — lo que observan al llegar:",
      items:[
        "El horno eléctrico lleva 45 minutos encendido al máximo con nada dentro.",
        "El agua del lavado de moldes con chocolate y colorantes artificiales va directo al drenaje sin filtro.",
        "Los envases de mantequilla, cartones de huevos y restos de masa van todos al mismo basurero.",
        "Hay tres frascos de productos de limpieza sin etiqueta ni ficha de seguridad a la vista.",
        "El chocolate que usan no tiene ninguna certificación sostenible ni información de origen.",
        "La ventilación está bloqueada con cajas y el ambiente huele a gases de cocción acumulados.",
      ]
    },
    pl:{ label:"Identifica los 6 problemas ambientales de la Pastelería «Dulce Verde».", hint:"Para cada uno: (a) qué problema es, (b) qué componente ambiental afecta (agua / aire / suelo / biodiversidad / clima / salud humana) y (c) cuál es la solución inmediata.", ph:"Problema 1: (a)... (b)... (c)...\nProblema 2: (a)... (b)... (c)...\n..." },
    pm:{ label:"¿Cuál de los 6 problemas representa el mayor riesgo para la biodiversidad?", ops:["A) El horno encendido sin producción","B) El chocolate sin certificación sostenible","C) La ventilación bloqueada","D) Los envases sin clasificar"], ok:1, fb:"El chocolate sin certificación sostenible puede provenir de zonas con deforestación y trabajo no ético. Es el impacto más directo sobre la biodiversidad de los 6 problemas." },
    frag:"B", confirm:"¡La pastelería no será clausurada! Excelente trabajo de inspección."
  },
  {
    id:2, emoji:"💧", title:"La huella invisible",
    color:"#1D4ED8", colorLight:"#EFF6FF", tiempo:10, sprint:false,
    mision:"El equipo de auditoría ambiental compara dos recetas clásicas de pastelería panameña para determinar cuál tiene menor impacto ambiental y proponer una mejora sostenible.",
    escena:{
      titulo:"LAS DOS RECETAS A COMPARAR:",
      items:[
        "RECETA A — Bienmesabe tradicional: 500g de coco rallado, 4 huevos, 250g de azúcar, 1 taza de leche de vaca.",
        "RECETA B — Torta de nance: 300g de nance fresco, 3 huevos, 200g de azúcar, 1 taza de leche de coco.",
        "DATO 1 — Huella hídrica: producir 1 litro de leche de vaca requiere ~1.000 litros de agua.",
        "DATO 2 — Huella hídrica: producir 1 litro de leche de coco requiere ~70 litros de agua.",
        "DATO 3 — Huella de carbono: 1 kg de azúcar de caña emite ~0.9 kg CO₂ equivalente.",
        "DATO 4 — El nance es una fruta nativa de Panamá que crece sin irrigación artificial adicional.",
      ]
    },
    pl:{ label:"Compara la huella hídrica y de carbono de ambas recetas y determina cuál es más sostenible.", hint:"Identifica el ingrediente de mayor impacto en la Receta A y propón una sustitución que reduzca su huella sin perder la identidad del postre panameño.", ph:"Receta A — ingrediente de mayor impacto: ...\nReceta B — ventaja ambiental: ...\nReceta más sostenible: ...\nSustitución propuesta para Receta A: ..." },
    pm:{ label:"¿Cuál de las dos recetas tiene menor huella ambiental total?", ops:["A) Receta A — Bienmesabe tradicional con leche de vaca","B) Receta B — Torta de nance con leche de coco","C) Ambas tienen exactamente el mismo impacto","D) No es posible saberlo sin análisis de laboratorio"], ok:1, fb:"La torta de nance usa leche de coco (70 litros/litro vs 1.000 del lácteo) y un ingrediente nativo sin irrigación adicional. Su huella hídrica es hasta 10 veces menor." },
    frag:"I", confirm:"¡Auditoría completada! Ahora saben el peso ambiental de la pastelería panameña."
  },
  {
    id:3, emoji:"☣️", title:"El archivo contaminado",
    color:"#6D28D9", colorLight:"#F5F3FF", tiempo:10, sprint:false,
    mision:"Alguien alteró la ficha técnica del Desinfectante «SaniKitchen 500» que usa la pastelería. Hay 3 errores graves y uno es potencialmente letal. Encuéntrenlos y corrijanlos.",
    escena:{
      titulo:"LA FICHA ALTERADA DICE:",
      items:[
        "Nombre: SaniKitchen 500 — Desinfectante para superficies alimentarias",
        "Pictograma de peligro asignado: ☠️ Calavera y tibias (tóxico agudo grave)",
        "Instrucción especial: Para mayor efectividad, mezclar con amoniaco concentrado",
        "Tiempo de contacto mínimo para desinfección efectiva: 10 segundos",
        "Componente activo: Hipoclorito de sodio al 5%",
        "Uso: Desinfección de mesones, equipos y superficies en contacto con alimentos",
      ]
    },
    pl:{ label:"Identifica los 3 errores de la ficha técnica.", hint:"Para cada error: (a) qué dice incorrectamente, (b) qué debería decir correctamente y (c) por qué ese error es peligroso para las personas y para el ambiente.", ph:"Error 1: (a)... (b)... (c)...\nError 2: (a)... (b)... (c)...\nError 3: (a)... (b)... (c)..." },
    pm:{ label:"¿Qué gas tóxico se produce al mezclar hipoclorito de sodio con amoniaco?", ops:["A) Dióxido de carbono (CO₂)","B) Cloraminas tóxicas","C) Ozono (O₃)","D) Nitrógeno puro"], ok:1, fb:"La mezcla produce cloraminas gaseosas, tóxicas para el sistema respiratorio y contaminantes del aire interior y exterior. Es una de las mezclas más peligrosas en entornos de cocina." },
    frag:"E", confirm:"¡Ficha corregida! Accidente evitado. El equipo de seguridad ambiental te lo agradece."
  },
  // ── BLOQUE II ─────────────────────────────────────────────────────────────
  {
    id:4, emoji:"⚖️", title:"El normativo",
    color:"#B45309", colorLight:"#FFFBEB", tiempo:8, sprint:false,
    mision:"MiAMBIENTE llegó sin aviso a la Pastelería «Luna Natural». Tienen 10 prácticas del establecimiento. Clasifíquenlas como CUMPLE o NO CUMPLE la Ley 41 de 1998 e identifiquen las 3 más graves.",
    escena:{
      titulo:"LAS 10 PRÁCTICAS DE «LUNA NATURAL»:",
      items:[
        "1. Los residuos de cobertura de chocolate se descargan al drenaje municipal.",
        "2. Tiene fichas técnicas SDS de todos los productos de limpieza visibles en cocina.",
        "3. Mezcla envases de plástico, papel y restos orgánicos en un solo contenedor.",
        "4. Compra mantequilla y huevos a productores locales con trazabilidad documentada.",
        "5. Los hornos funcionan con gas LP sin revisión de emisiones desde hace 2 años.",
        "6. Tiene un registro documentado de los residuos generados mensualmente.",
        "7. Los aceites de limpieza de moldes se tiran en la basura general sin contenedor especial.",
        "8. Cuenta con trampa de grasas en el desagüe de la cocina.",
        "9. No ha realizado ninguna evaluación de aspectos e impactos ambientales de sus operaciones.",
        "10. Los envases de ingredientes se separan para reciclaje.",
      ]
    },
    pl:{ label:"Clasifica cada práctica como CUMPLE o NO CUMPLE la Ley 41 de 1998.", hint:"Indica también cuáles son las 3 infracciones más graves y propón la acción correctiva para cada una.", ph:"Práctica 1: CUMPLE / NO CUMPLE\n...\nLas 3 más graves: N°..., N°..., N°...\nAcciones correctivas:\n1. ...\n2. ...\n3. ..." },
    pm:{ label:"¿Cuál de estas prácticas representa la infracción más grave según la Ley 41 de 1998?", ops:["A) Mezclar residuos en un solo contenedor","B) Hornos sin revisión de emisiones","C) Descargar residuos de chocolate al drenaje municipal","D) No tener evaluación de aspectos ambientales"], ok:2, fb:"La descarga de residuos de chocolate y grasas al drenaje municipal contamina directamente los cuerpos de agua. Es una infracción grave del artículo sobre contaminación hídrica de la Ley 41." },
    frag:"N", confirm:"¡Inspección completada! «Luna Natural» recibirá su plan de acción ambiental."
  },
  {
    id:5, emoji:"🌱", title:"El ODS perdido",
    color:"#065F46", colorLight:"#ECFDF5", tiempo:8, sprint:false,
    mision:"El sistema fue hackeado otra vez. 9 situaciones de pastelerías y restaurantes quedaron sin su ODS. Reconecten cada una. Hay un INTRUSO que no corresponde a ningún ODS del curso.",
    escena:{
      titulo:"ODS DEL CURSO: 2 · 3 · 4 · 8 · 12 · 13 · 14 · 15 | LAS 9 SITUACIONES:",
      items:[
        "1. Una pastelería ofrece precios accesibles usando ingredientes de temporada.",
        "2. La cocina instala reguladores de caudal en todos los grifos para reducir consumo.",
        "3. El restaurante certifica sus mariscos con sello MSC de pesca sostenible.",
        "4. Los estudiantes aprenden a calcular la huella de carbono de sus recetas.",
        "5. La pastelería compra cacao con certificación Rainforest Alliance.",
        "6. El chef emplea a personas de comunidades vulnerables locales.",
        "7. El restaurante elimina el aceite de palma de todos sus productos.",
        "8. La cocina separa correctamente todos sus residuos desde el origen.",
        "9. El restaurante gana el premio a la mejor decoración de interiores del año.",
      ]
    },
    pl:{ label:"Empareja cada situación (1–9) con el ODS correcto del curso.", hint:"Formato: Situación N → ODS N° — nombre del ODS. Identifica el intruso y explica por qué no corresponde a ningún ODS del curso.", ph:"Situación 1 → ODS ... — ...\n...\nEl intruso es la situación ... porque ..." },
    pm:{ label:"¿Cuál es el INTRUSO?", ops:["A) La pastelería compra cacao con certificación Rainforest Alliance","B) El restaurante gana el premio a la mejor decoración de interiores","C) La cocina separa correctamente todos sus residuos","D) El chef emplea a personas de comunidades vulnerables"], ok:1, fb:"Ganar un premio de decoración de interiores es un logro estético, no ambiental ni social en el sentido de los ODS del curso. Es la situación 9 y es el intruso." },
    frag:"M", confirm:"¡Sistema restaurado! Los ODS vuelven a guiar la pastelería panameña."
  },
  {
    id:6, emoji:"🍽️", title:"El menú bajo sospecha",
    color:"#9A3412", colorLight:"#FFF7ED", tiempo:8, sprint:false,
    mision:"El comité ambiental de la Pastelería «Luna Natural» encontró 3 productos con problemas ambientales graves en su catálogo de 6 ítems. Identifíquenlos y propongan sustitución sostenible.",
    escena:{
      titulo:"EL CATÁLOGO COMPLETO DE «LUNA NATURAL»:",
      items:[
        "Ítem 1 — Bizcocho de plátano maduro local",
        "Ítem 2 — Tarta de frambuesas importadas desde Europa por vía aérea",
        "Ítem 3 — Croissant elaborado con cantidad excesiva de mantequilla convencional",
        "Ítem 4 — Gelatina de frutas tropicales sin colorantes artificiales",
        "Ítem 5 — Brownie de chocolate sin certificación sostenible ni información de origen",
        "Ítem 6 — Pan integral con semillas de ajonjolí local",
      ]
    },
    pl:{ label:"Identifica los 3 ítems con problemas ambientales graves.", hint:"Para cada uno: (a) cuál es el problema ambiental específico, (b) qué ODS del curso afecta y (c) qué sustitución sostenible propones.", ph:"Ítem problemático 1: (a)... (b) ODS... (c)...\nÍtem problemático 2: (a)... (b) ODS... (c)...\nÍtem problemático 3: (a)... (b) ODS... (c)..." },
    pm:{ label:"¿Cuál de los 3 ítems problemáticos tiene la mayor huella de carbono por logística?", ops:["A) El brownie sin certificación","B) La tarta de frambuesas importadas desde Europa por vía aérea","C) El croissant con exceso de mantequilla","D) Todos tienen exactamente el mismo impacto"], ok:1, fb:"El transporte aéreo de frutas desde Europa genera una huella de carbono por logística enormemente superior. El Km 0 es el criterio más impactante en términos climáticos." },
    frag:"E", confirm:"¡Catálogo intervenido! «Luna Natural» puede vender con orgullo ambiental."
  },
  {
    id:7, emoji:"👩‍🍳", title:"El chef del futuro",
    color:"#1E40AF", colorLight:"#EFF6FF", tiempo:8, sprint:false,
    mision:"El reto más creativo de la Gincana. Reciben un postre panameño clásico y deben rediseñarlo aplicando al menos 4 criterios de sostenibilidad tridimensional sin perder su esencia cultural.",
    escena:{
      titulo:"EL POSTRE A REDISEÑAR: Bienmesabe tradicional panameño",
      items:[
        "Ingredientes originales: 500g de coco rallado deshidratado (importado), 4 huevos, 250g de azúcar blanca refinada, 1 taza de leche de vaca entera, 1 cucharadita de esencia de vainilla artificial.",
        "CRITERIO AMBIENTAL: reducir huella hídrica y de carbono del postre.",
        "CRITERIO SOCIAL: usar ingredientes de productores locales panameños.",
        "CRITERIO ECONÓMICO: mantener precio accesible (máx. $4 por porción individual).",
        "CRITERIO DE BIODIVERSIDAD: incorporar al menos un ingrediente nativo panameño en riesgo de abandono.",
        "CRITERIO ADICIONAL (5.º): eliminar ingredientes artificiales o con aditivos innecesarios.",
      ]
    },
    pl:{ label:"Rediseña el Bienmesabe aplicando al menos 4 criterios de sostenibilidad.", hint:"Presenta: (1) nombre del postre rediseñado, (2) ingredientes modificados con justificación, (3) los 4 criterios aplicados con argumentación.", ph:"Nombre del postre rediseñado: ...\nIngredientes modificados:\n- Sustituyo [original] por [alternativa] porque...\n...\nCriterios aplicados:\n1. Ambiental: ...\n2. Social: ...\n3. Económico: ...\n4. Biodiversidad: ..." },
    pm:{ label:"¿Cuál de estos cambios tiene el MAYOR impacto ambiental en el rediseño del Bienmesabe?", ops:["A) Cambiar la esencia de vainilla artificial por vainilla natural","B) Sustituir la leche de vaca por leche de coco de producción local","C) Usar azúcar morena de caña en lugar de azúcar blanca refinada","D) Cambiar el coco importado deshidratado por coco fresco local"], ok:1, fb:"La leche de vaca tiene una huella hídrica de ~1.000 litros/litro vs ~70 de la leche de coco. Es el cambio de mayor impacto ambiental real en la receta del Bienmesabe." },
    frag:"S", confirm:"¡Postre rediseñado con maestría! El Bienmesabe sostenible panameño nació hoy."
  },
  // ── BLOQUE III SPRINT ──────────────────────────────────────────────────────
  {
    id:8, emoji:"🔗", title:"La cadena rota",
    color:"#B91C1C", colorLight:"#FFF1F1", tiempo:5, sprint:true,
    mision:"SPRINT. Una cadena alimentaria panameña de pastelería tiene un eslabón que falla. Identifíquenlo rápido y propongan la solución en pocas palabras.",
    escena:{
      titulo:"LA CADENA DEL BIENMESABE SOSTENIBLE:",
      items:[
        "Eslabón 1 — Producción: Coco fresco de finca agroecológica en Colón con certificación orgánica.",
        "Eslabón 2 — Transporte: Camión de carga pequeño a diésel sin mantenimiento en 3 años. Recorre 180 km.",
        "Eslabón 3 — Procesamiento: Rallado y extracción de leche de coco en instalación con energía solar.",
        "Eslabón 4 — Pastelería: Elaboración del Bienmesabe con ingredientes locales y sin aditivos artificiales.",
        "Eslabón 5 — Empaque: Envases de cartón reciclado con tinta vegetal. Sin plástico de un solo uso.",
      ]
    },
    pl:{ label:"¿Cuál es el eslabón que falla ambientalmente y qué solución propones?", hint:"Sé breve y directo. Máximo 3 líneas.", ph:"El eslabón que falla es el N°... porque...\nSolución propuesta: ..." },
    pm:{ label:"¿Qué eslabón de la cadena tiene el mayor impacto ambiental negativo?", ops:["A) Eslabón 1 — Producción agroecológica","B) Eslabón 2 — Transporte diésel sin mantenimiento","C) Eslabón 3 — Procesamiento con energía solar","D) Eslabón 5 — Empaque de cartón reciclado"], ok:1, fb:"El transporte diésel sin mantenimiento en 180 km es el punto de mayor emisión. Un vehículo sin mantenimiento consume hasta un 25% más de combustible y emite más partículas contaminantes." },
    frag:"A", confirm:"¡Eslabón identificado! La cadena del Bienmesabe vuelve a ser sostenible."
  },
  {
    id:9, emoji:"🌿", title:"El ingrediente fugitivo",
    color:"#B91C1C", colorLight:"#FFF1F1", tiempo:5, sprint:true,
    mision:"SPRINT. Lista de 10 ingredientes usados en pastelerías panameñas. 5 están en riesgo ambiental y 5 son sostenibles. Clasifíquenlos rápido y justifiquen brevemente.",
    escena:{
      titulo:"LOS 10 INGREDIENTES:",
      items:[
        "1. Cacao sin certificación de origen de zona de deforestación",
        "2. Nance fresco de agricultor local de Coclé",
        "3. Azúcar de caña blanca refinada industrializada de importación",
        "4. Coco fresco de finca local de Colón",
        "5. Huevos de gallinas criadas en jaula en producción intensiva",
        "6. Maracuyá orgánico de cooperativa agrícola de Chiriquí",
        "7. Leche de vaca de producción industrial a gran escala",
        "8. Miel de abejas nativas de comunidad ngäbe-buglé",
        "9. Colorantes artificiales sintéticos certificados por FDA",
        "10. Harina de plátano verde de producción artesanal local",
      ]
    },
    pl:{ label:"Clasifica los 10 ingredientes: EN RIESGO o SOSTENIBLE. Justifica brevemente cada uno.", hint:"Una frase de justificación por ingrediente es suficiente.", ph:"1. EN RIESGO / SOSTENIBLE — porque...\n2. ...\n..." },
    pm:{ label:"¿Cuál de los siguientes ingredientes es el MÁS sostenible de la lista?", ops:["A) Azúcar de caña blanca refinada industrializada","B) Leche de vaca de producción industrial","C) Miel de abejas nativas de comunidad ngäbe-buglé","D) Colorantes artificiales sintéticos certificados"], ok:2, fb:"La miel de abejas nativas de comunidad ngäbe-buglé combina sostenibilidad ecológica (polinizadores nativos), justicia social (ingresos dignos a comunidad indígena) y producto sin procesamiento industrial." },
    frag:"B", confirm:"¡Ingredientes clasificados! Tu pastelería ahora elige con criterio ambiental."
  },
  {
    id:10, emoji:"🔐", title:"La contraseña final",
    color:"#B91C1C", colorLight:"#FFF1F1", tiempo:5, sprint:true,
    mision:"SPRINT FINAL. Demuestren que dominan los fundamentos del curso. 5 afirmaciones. Determinen cuáles son VERDADERAS para completar la contraseña.",
    escena:{
      titulo:"LAS 5 AFIRMACIONES:",
      items:[
        "1. «La economía circular en una cocina significa transformar los residuos en nuevos recursos dentro del mismo proceso productivo.»",
        "2. «El pictograma GHS de la llama naranja indica que el producto es corrosivo y daña los tejidos vivos.»",
        "3. «Comprar ingredientes locales y de temporada en Panamá reduce la huella de carbono del menú por logística.»",
        "4. «El sello Rainforest Alliance garantiza que un ingrediente fue producido sin ningún impacto ambiental.»",
        "5. «El ODS 12 promueve la producción y el consumo responsables, lo que incluye reducir el desperdicio alimentario en restaurantes.»",
      ]
    },
    pl:{ label:"Para cada afirmación escribe V (Verdadera) o F (Falsa) y justifica brevemente.", hint:"Una oración de justificación por afirmación es suficiente.", ph:"1: V/F — porque...\n2: V/F — porque...\n3: V/F — porque...\n4: V/F — porque...\n5: V/F — porque..." },
    pm:{ label:"¿Cuántas de las 5 afirmaciones son VERDADERAS?", ops:["A) Una","B) Dos","C) Tres — afirmaciones 1, 3 y 5","D) Cinco"], ok:2, fb:"La 2 es falsa (la llama indica inflamable, no corrosivo). La 4 es falsa (Rainforest Alliance reduce impacto, no lo elimina). Las verdaderas son 1, 3 y 5." },
    frag:"E", confirm:"¡Has completado OPERACIÓN: CÓDIGO VERDE! Ahora ensambla tu contraseña."
  },
];

// ─── HELPERS (same as Version A) ─────────────────────────────────────────────
function useCountdown(totalSeconds, active) {
  const [secs, setSecs] = useState(totalSeconds);
  const ref = useRef();
  useEffect(() => {
    if (!active) return;
    ref.current = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(ref.current);
  }, [active]);
  useEffect(() => { setSecs(totalSeconds); }, [totalSeconds]);
  const m = String(Math.floor(secs / 60)).padStart(2, "0");
  const s = String(secs % 60).padStart(2, "0");
  return { display:`${m}:${s}`, urgent: secs > 0 && secs <= 60, done: secs === 0 };
}

function getBlock(retoId) {
  return BLOCKS.find(b => b.retos.includes(retoId)) || BLOCKS[0];
}

// ─── CSS (identical to Version A) ────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--forest:#0B2818;--canopy:#1A4A2E;--leaf:#2E6B4A;--gold:#D4A017;--cream:#FEFDF8;--ink:#111827;--muted:#6B7280;}
html,body{min-height:100%;background:var(--forest)}
.app{min-height:100vh;font-family:'DM Sans',sans-serif;background:radial-gradient(ellipse at 0% 0%,rgba(46,107,74,.35) 0%,transparent 50%),radial-gradient(ellipse at 100% 100%,rgba(212,160,23,.1) 0%,transparent 50%),linear-gradient(180deg,#0B2818 0%,#122B1E 60%,#0B2818 100%);color:var(--ink)}
.welcome{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem 1.25rem;text-align:center}
.op-label{font-size:.68rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(212,160,23,.7);margin-bottom:.5rem}
.wtitle{font-family:'Bebas Neue',sans-serif;font-size:clamp(3.5rem,14vw,6rem);line-height:.92;color:var(--gold);letter-spacing:.04em;margin-bottom:.25rem;animation:glow 3s ease-in-out infinite}
@keyframes glow{0%,100%{text-shadow:0 0 30px rgba(212,160,23,.3)}50%{text-shadow:0 0 60px rgba(212,160,23,.6)}}
.wsub{font-size:.82rem;color:rgba(255,255,255,.4);letter-spacing:.06em;margin-bottom:1.75rem}
.lock-anim{font-size:2.5rem;margin-bottom:1rem;display:inline-block;animation:lb 2s ease-in-out infinite}
@keyframes lb{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.vbadge{display:inline-block;padding:.22rem .8rem;border-radius:100px;font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin-bottom:1.5rem;border:1px solid rgba(212,160,23,.4);color:var(--gold);background:rgba(212,160,23,.08)}
.rules-box{width:100%;max-width:380px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:1rem 1.35rem;margin-bottom:1.5rem;text-align:left}
.rules-box h3{font-size:.65rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:.65rem}
.rules-box li{font-size:.8rem;color:rgba(255,255,255,.6);line-height:1.5;list-style:none;padding-left:1rem;position:relative;margin-bottom:.3rem}
.rules-box li::before{content:'→';position:absolute;left:0;color:var(--gold);font-size:.72rem}
.block-preview{width:100%;max-width:380px;margin-bottom:1.5rem;display:flex;flex-direction:column;gap:.35rem}
.bchip{padding:.45rem 1rem;border-radius:8px;font-size:.78rem;font-weight:600;display:flex;justify-content:space-between;align-items:center}
.bchip span{font-size:.68rem;opacity:.7}
.tlabel{font-size:.65rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:.55rem;text-align:center}
.tgrid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.55rem;width:100%;max-width:380px;margin-bottom:1.25rem}
.tbtn{padding:.8rem .5rem;border:1.5px solid rgba(212,160,23,.2);border-radius:10px;background:rgba(255,255,255,.03);color:rgba(255,255,255,.65);font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:.06em;cursor:pointer;transition:all .18s}
.tbtn:hover{background:rgba(212,160,23,.1);border-color:var(--gold);color:var(--gold);transform:translateY(-2px)}
.tbtn.active{background:var(--gold);border-color:var(--gold);color:#111;box-shadow:0 4px 16px rgba(212,160,23,.35)}
.sbtn{width:100%;max-width:380px;padding:1rem;border-radius:12px;border:none;background:linear-gradient(135deg,var(--gold) 0%,#A07830 100%);color:#111;font-family:'Bebas Neue',sans-serif;font-size:1.15rem;letter-spacing:.06em;cursor:pointer;transition:all .2s;opacity:.35;pointer-events:none}
.sbtn.ready{opacity:1;pointer-events:auto}
.sbtn.ready:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(212,160,23,.4)}
.hdr{position:sticky;top:0;z-index:200;background:rgba(11,40,24,.97);backdrop-filter:blur(16px);border-bottom:1px solid rgba(212,160,23,.15);padding:.55rem 1rem;display:grid;grid-template-columns:1fr auto auto;align-items:center;gap:.65rem}
.hdr-team{font-size:.6rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);line-height:1}
.hdr-op{font-family:'Bebas Neue',sans-serif;font-size:.9rem;color:#fff;letter-spacing:.06em}
.tbox{display:flex;flex-direction:column;align-items:center;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:.25rem .5rem;min-width:58px}
.tlbl{font-size:.5rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.3)}
.tval{font-family:'Bebas Neue',sans-serif;font-size:1.2rem;color:#fff;letter-spacing:.06em;line-height:1}
.tval.urgent{color:#FF6B6B;animation:blink .8s ease-in-out infinite}
@keyframes blink{0%,100%{opacity:1}50%{opacity:.4}}
.pbar{height:3px;background:rgba(255,255,255,.06)}
.pfill{height:100%;background:linear-gradient(90deg,var(--gold),#4A9163);transition:width .6s cubic-bezier(.4,0,.2,1)}
.bind{padding:.3rem 1rem;font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-align:center;border-bottom:1px solid rgba(255,255,255,.06)}
.ftrl{display:flex;align-items:center;justify-content:center;gap:.25rem;flex-wrap:wrap;padding:.55rem 1rem;background:rgba(0,0,0,.25);border-bottom:1px solid rgba(255,255,255,.05)}
.fslot{width:26px;height:26px;border-radius:5px;border:1.5px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:.88rem;color:rgba(255,255,255,.1);transition:all .4s cubic-bezier(.34,1.56,.64,1)}
.fslot.earned{border-color:var(--gold);background:rgba(212,160,23,.12);color:var(--gold);box-shadow:0 0 8px rgba(212,160,23,.25)}
.fslot.cur{border-color:rgba(255,255,255,.25);background:rgba(255,255,255,.05);color:rgba(255,255,255,.2);animation:cp 1.5s ease-in-out infinite}
@keyframes cp{0%,100%{box-shadow:0 0 0 rgba(255,255,255,.1)}50%{box-shadow:0 0 8px rgba(255,255,255,.2)}}
.fsep{color:rgba(255,255,255,.08);font-size:.65rem}
.cwrap{position:relative;z-index:1;padding:1rem;max-width:700px;margin:0 auto;padding-bottom:3rem}
.card{background:var(--cream);border-radius:18px;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,.5)}
.ctop{height:5px}
.cbody{padding:1.35rem 1.35rem 1.5rem}
.rmeta{display:flex;align-items:center;justify-content:space-between;margin-bottom:.7rem}
.rbadge{display:inline-flex;align-items:center;gap:.3rem;padding:.22rem .65rem;border-radius:100px;font-size:.65rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:#fff}
.sprint-tag{font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#B91C1C;background:rgba(185,28,28,.1);padding:.18rem .5rem;border-radius:100px;border:1px solid rgba(185,28,28,.25)}
.card h2{font-family:'Bebas Neue',sans-serif;font-size:1.6rem;letter-spacing:.04em;color:var(--ink);line-height:1.1;margin-bottom:.3rem}
.card .mision{font-size:.865rem;color:var(--muted);line-height:1.6;margin-bottom:1rem}
.ebox{border-radius:10px;border:1.5px solid;padding:.85rem 1rem;margin-bottom:1.15rem}
.ebox h4{font-size:.63rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;margin-bottom:.55rem}
.ebox li{font-size:.835rem;line-height:1.55;margin-bottom:.4rem;padding-left:.95rem;position:relative;list-style:none;color:#374151}
.ebox li::before{content:'•';position:absolute;left:0;font-weight:800}
.stag{display:inline-block;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);margin-bottom:.3rem}
.qtext{font-size:.865rem;font-weight:500;color:var(--ink);line-height:1.5;margin-bottom:.22rem}
.qhint{font-size:.77rem;color:var(--muted);line-height:1.5;font-style:italic}
textarea{width:100%;border:1.5px solid #E5E7EB;border-radius:10px;padding:.65rem .8rem;font-family:'DM Sans',sans-serif;font-size:.835rem;line-height:1.6;color:var(--ink);background:#FAFAF8;resize:vertical;outline:none;transition:border-color .2s,box-shadow .2s;margin-top:.45rem;margin-bottom:1rem}
textarea:focus{border-color:#2E6B4A;background:#fff;box-shadow:0 0 0 3px rgba(46,107,74,.12)}
.ops{margin-top:.45rem;margin-bottom:1rem}
.obtn{width:100%;text-align:left;padding:.75rem .95rem;border:1.5px solid #E5E7EB;border-radius:10px;background:#FAFAF8;font-family:'DM Sans',sans-serif;font-size:.835rem;color:var(--ink);cursor:pointer;margin-bottom:.4rem;transition:all .15s;line-height:1.4}
.obtn:hover:not(:disabled){border-color:#2E6B4A;background:rgba(46,107,74,.05)}
.obtn.sel{border-color:#2E6B4A;background:rgba(46,107,74,.07)}
.obtn.ok{border-color:#16A34A;background:#F0FDF4;color:#15803D;font-weight:600}
.obtn.err{border-color:#DC2626;background:#FEF2F2;color:#DC2626}
.obtn:disabled{cursor:default}
.fdbk{border-radius:10px;padding:.75rem 1rem;font-size:.82rem;line-height:1.55;margin-bottom:1rem}
.fdbk.bad{background:#FEF2F2;color:#B91C1C;border:1px solid #FECACA}
.rtbtn{background:none;border:1.5px solid currentColor;padding:.32rem .85rem;border-radius:7px;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:.78rem;font-weight:600;margin-top:.45rem;color:inherit}
.xbtn{width:100%;padding:.9rem 1rem;border-radius:12px;border:none;font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:.06em;cursor:pointer;transition:all .2s;color:#fff}
.xbtn:disabled{opacity:.35;cursor:default}
.xbtn:not(:disabled):hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.3)}
.cscr{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem 1.25rem;text-align:center}
.ccheck{font-size:2.2rem;margin-bottom:.5rem}
.clabel{font-size:.63rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(212,160,23,.7);margin-bottom:.5rem}
.cfrag{font-family:'Bebas Neue',sans-serif;font-size:8rem;line-height:.9;color:var(--gold);letter-spacing:.06em;filter:drop-shadow(0 0 40px rgba(212,160,23,.5));animation:fp .5s cubic-bezier(.34,1.56,.64,1) both;margin-bottom:.5rem}
@keyframes fp{from{transform:scale(0) rotate(-15deg);opacity:0}to{transform:scale(1) rotate(0);opacity:1}}
.ctitle{font-family:'Bebas Neue',sans-serif;font-size:1.45rem;color:#fff;letter-spacing:.04em;margin-bottom:.35rem}
.cmsg{font-size:.865rem;color:rgba(255,255,255,.5);line-height:1.6;margin-bottom:1.4rem;max-width:320px}
.ctrl{display:flex;gap:.28rem;flex-wrap:wrap;justify-content:center;margin-bottom:1.75rem}
.ctslot{width:32px;height:32px;border-radius:6px;font-family:'Bebas Neue',sans-serif;font-size:.95rem;display:flex;align-items:center;justify-content:center}
.ctslot.f{background:rgba(212,160,23,.15);border:1.5px solid var(--gold);color:var(--gold)}
.ctslot.e{background:rgba(255,255,255,.03);border:1.5px solid rgba(255,255,255,.1);color:rgba(255,255,255,.1)}
.nbtn{padding:.85rem 2.25rem;border-radius:12px;border:none;background:linear-gradient(135deg,var(--gold),#A07830);color:#111;font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:.06em;cursor:pointer;transition:all .2s}
.nbtn:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(212,160,23,.4)}
.vscr{position:relative;z-index:1;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem 1.25rem;text-align:center;overflow:hidden}
.vscr::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(212,160,23,.2) 0%,transparent 60%),radial-gradient(ellipse at 0% 100%,rgba(46,107,74,.2) 0%,transparent 60%);pointer-events:none}
.trophy{font-size:5rem;animation:tf 2.5s ease-in-out infinite;margin-bottom:.75rem}
@keyframes tf{0%,100%{transform:translateY(0) rotate(-2deg)}50%{transform:translateY(-12px) rotate(2deg)}}
.vop{font-size:.63rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(212,160,23,.6);margin-bottom:.25rem}
.vtitle{font-family:'Bebas Neue',sans-serif;font-size:clamp(2rem,8vw,3.5rem);color:var(--gold);letter-spacing:.06em;line-height:1;margin-bottom:.25rem;text-shadow:0 0 40px rgba(212,160,23,.4)}
.vteam{font-size:.78rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:1.75rem}
.pwrev{display:flex;gap:.35rem;flex-wrap:wrap;justify-content:center;margin-bottom:.5rem}
.pwl{width:38px;height:44px;border-radius:8px;background:linear-gradient(135deg,var(--gold),#A07830);display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue',sans-serif;font-size:1.35rem;color:#111;box-shadow:0 4px 12px rgba(212,160,23,.3);animation:lp .4s cubic-bezier(.34,1.56,.64,1) both}
.pwl:nth-child(1){animation-delay:.05s}.pwl:nth-child(2){animation-delay:.10s}.pwl:nth-child(3){animation-delay:.15s}.pwl:nth-child(4){animation-delay:.20s}.pwl:nth-child(5){animation-delay:.25s}.pwl:nth-child(6){animation-delay:.30s}.pwl:nth-child(7){animation-delay:.35s}.pwl:nth-child(8){animation-delay:.40s}.pwl:nth-child(9){animation-delay:.45s}.pwl:nth-child(10){animation-delay:.50s}
@keyframes lp{from{transform:scale(0) translateY(20px);opacity:0}to{transform:scale(1) translateY(0);opacity:1}}
.pwsub{font-size:.63rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:1.75rem}
.tcta{display:block;width:100%;max-width:340px;padding:.95rem 1.5rem;border-radius:12px;border:none;background:linear-gradient(135deg,var(--gold),#A07830);color:#111;font-family:'Bebas Neue',sans-serif;font-size:1rem;letter-spacing:.06em;text-decoration:none;cursor:pointer;transition:all .2s;margin-bottom:.65rem;text-align:center}
.tcta:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(212,160,23,.45)}
.vnote{font-size:.76rem;color:rgba(255,255,255,.3);max-width:300px;line-height:1.65;margin-top:1.25rem}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:rgba(255,255,255,.03)}::-webkit-scrollbar-thumb{background:rgba(212,160,23,.25);border-radius:3px}
`;

// ─── COMPONENTS (same structure as Version A) ─────────────────────────────────
function FragTrail({ earned }) {
  return (
    <div className="ftrl">
      {PASSWORD.map((l, i) => {
        const cls = i < earned ? "fslot earned" : i === earned ? "fslot cur" : "fslot";
        return (
          <span key={i} style={{display:"flex",alignItems:"center",gap:".25rem"}}>
            <span className={cls}>{i < earned ? l : i === earned ? "?" : ""}</span>
            {i < PASSWORD.length-1 && <span className="fsep">·</span>}
          </span>
        );
      })}
    </div>
  );
}

function RetoScreen({ reto, team, earned, globalTimer, onComplete }) {
  const [texto, setTexto]     = useState("");
  const [opcion, setOpcion]   = useState(null);
  const [submitted, setSubm]  = useState(false);
  const [correct, setCorrect] = useState(false);
  const [running, setRunning] = useState(true);
  const retoTimer = useCountdown(reto.tiempo * 60, running);
  const block = getBlock(reto.id);
  const canSubmit = texto.trim().length > 15 && opcion !== null;

  function submit() {
    const ok = opcion === reto.pm.ok;
    setSubm(true); setCorrect(ok);
    if (ok) setRunning(false);
  }

  if (submitted && correct) {
    return <ConfirmScreen reto={reto} team={team} earned={earned+1} onNext={onComplete} />;
  }

  return (
    <div className="app">
      <div className="hdr">
        <div>
          <div className="hdr-team">Equipo {team}</div>
          <div className="hdr-op">🔐 Op. Código Verde</div>
        </div>
        <div className="tbox">
          <span className="tlbl">Reto</span>
          <span className={`tval ${retoTimer.urgent?"urgent":""}`}>{retoTimer.display}</span>
        </div>
        <div className="tbox">
          <span className="tlbl">Global</span>
          <span className={`tval ${globalTimer.urgent?"urgent":""}`}>{globalTimer.display}</span>
        </div>
      </div>
      <div className="pbar">
        <div className="pfill" style={{width:`${((reto.id-1)/RETOS.length)*100}%`}} />
      </div>
      <div className="bind" style={{background:block.bg,color:block.color}}>{block.label}</div>
      <FragTrail earned={earned} />
      <div className="cwrap">
        <div className="card">
          <div className="ctop" style={{background:reto.color}} />
          <div className="cbody">
            <div className="rmeta">
              <span className="rbadge" style={{background:reto.color}}>{reto.emoji} Reto {reto.id} de {RETOS.length}</span>
              {reto.sprint && <span className="sprint-tag">⚡ SPRINT — {reto.tiempo} min</span>}
            </div>
            <h2>{reto.title}</h2>
            <p className="mision">{reto.mision}</p>
            <div className="ebox" style={{borderColor:reto.color+"40",background:reto.colorLight}}>
              <h4 style={{color:reto.color}}>{reto.escena.titulo}</h4>
              <ul>{reto.escena.items.map((it,i)=>(
                <li key={i}><span style={{position:"absolute",left:0,color:reto.color,fontWeight:800}}>•</span>{it}</li>
              ))}</ul>
            </div>
            <div style={{marginBottom:"1rem"}}>
              <span className="stag">Pregunta 1 — Análisis abierto</span>
              <p className="qtext">{reto.pl.label}</p>
              <p className="qhint">{reto.pl.hint}</p>
              <textarea value={texto} onChange={e=>setTexto(e.target.value)} placeholder={reto.pl.ph} style={{minHeight:reto.sprint?"80px":"120px"}} disabled={submitted&&correct} />
            </div>
            <div>
              <span className="stag">Pregunta 2 — Opción múltiple</span>
              <p className="qtext" style={{marginBottom:".6rem"}}>{reto.pm.label}</p>
              <div className="ops">
                {reto.pm.ops.map((op,i)=>{
                  let cls="obtn";
                  if(submitted){if(i===reto.pm.ok)cls+=" ok";else if(i===opcion&&!correct)cls+=" err";}
                  else if(i===opcion)cls+=" sel";
                  return <button key={i} className={cls} disabled={submitted} onClick={()=>setOpcion(i)}>{op}</button>;
                })}
              </div>
            </div>
            {submitted && !correct && (
              <div className="fdbk bad">
                ❌ {reto.pm.fb}
                <br/>
                <button className="rtbtn" onClick={()=>{setSubm(false);setOpcion(null);}}>Intentar de nuevo</button>
              </div>
            )}
            {(!submitted||!correct) && (
              <button className="xbtn" style={{background:reto.color}} disabled={!canSubmit||(submitted&&!correct)} onClick={submit}>
                {!canSubmit?"Completa ambas preguntas para continuar":`${reto.emoji} Enviar respuestas del Reto ${reto.id}`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfirmScreen({ reto, team, earned, onNext }) {
  const isLast = reto.id === RETOS.length;
  return (
    <div className="app">
      <div className="cscr">
        <div className="ccheck">✅</div>
        <p className="clabel">Fragmento obtenido</p>
        <div className="cfrag">{reto.frag}</div>
        <h2 className="ctitle">{reto.confirm}</h2>
        <p className="cmsg">Reto {reto.id} completado. Guarda este fragmento.</p>
        <div className="ctrl">
          {PASSWORD.map((l,i)=>(
            <span key={i} style={{display:"flex",alignItems:"center",gap:".2rem"}}>
              <span className={`ctslot ${i<earned?"f":"e"}`}>{i<earned?l:"?"}</span>
              {i<PASSWORD.length-1&&<span style={{color:"rgba(255,255,255,.1)",fontWeight:700,fontSize:".7rem"}}>·</span>}
            </span>
          ))}
        </div>
        <button className="nbtn" onClick={onNext}>
          {isLast?"🏆 Ver la contraseña final":`Continuar al Reto ${reto.id+1} →`}
        </button>
      </div>
    </div>
  );
}

function VictoryScreen({ team }) {
  const msg = encodeURIComponent(`🏆 Equipo ${team} — Contraseña: ${PASSWORD_WORD} — ¡Operación Código Verde completada!`);
  return (
    <div className="app">
      <div className="vscr">
        <div className="trophy">🏆</div>
        <p className="vop">Operación completada</p>
        <h1 className="vtitle">¡CÓDIGO<br/>VERDE<br/>DESCIFRADO!</h1>
        <p className="vteam">Equipo {team} — Versión {VERSION}</p>
        <div className="pwrev">
          {PASSWORD_WORD.split("").map((l,i)=><div key={i} className="pwl">{l}</div>)}
        </div>
        <p className="pwsub">Tu contraseña secreta</p>
        <a className="tcta" href={`https://teams.microsoft.com/l/chat/0/0?message=${msg}`} target="_blank" rel="noopener noreferrer">
          ⚡ Enviar contraseña en Teams ahora
        </a>
        <p className="vnote">Escribe <strong style={{color:"var(--gold)"}}>{PASSWORD_WORD}</strong> en el chat de Teams antes que los otros equipos. ¡El planeta cuenta contigo! 🌿</p>
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen]   = useState("welcome");
  const [team, setTeam]       = useState(null);
  const [retoIdx, setRetoIdx] = useState(0);
  const [earned, setEarned]   = useState(0);
  const [globalActive, setGA] = useState(false);
  const globalTimer = useCountdown(GLOBAL_MIN * 60, globalActive);

  function handleStart(t) { setTeam(t); setGA(true); setScreen("reto"); }
  function handleComplete() {
    const ne = earned + 1;
    setEarned(ne);
    if (retoIdx + 1 >= RETOS.length) setScreen("victory");
    else setRetoIdx(retoIdx + 1);
  }

  return (
    <>
      <style>{CSS}</style>
      {screen === "welcome" && (
        <div className="app">
          <div className="welcome">
            <div className="lock-anim">🔐</div>
            <p className="op-label">Educación Ambiental — EDA1003 — ITSE Panamá</p>
            <h1 className="wtitle">OPERACIÓN<br/>CÓDIGO<br/>VERDE</h1>
            <p className="wsub">Escape Room Ambiental · 10 Retos · 90 Minutos</p>
            <span className="vbadge">Versión {VERSION} — {TEAM_NAMES.join(" · ")}</span>
            <div className="rules-box">
              <h3>Reglas de la operación</h3>
              <ul>
                <li>Un solo celular por equipo durante toda la Gincana</li>
                <li>Completa los 10 retos en orden — no puedes saltar ninguno</li>
                <li>Cada reto correcto entrega un fragmento de la contraseña</li>
                <li>Respuesta incorrecta en Pregunta 2 → reintentas hasta acertar</li>
                <li>Primer equipo en escribir la contraseña completa en Teams GANA</li>
                <li>Prohibido compartir respuestas con otros equipos</li>
              </ul>
            </div>
            <div className="block-preview">
              {BLOCKS.map(b=>(
                <div key={b.id} className="bchip" style={{background:b.bg,color:b.color}}>
                  <span>{b.label}</span><span>{b.retos.length} retos</span>
                </div>
              ))}
            </div>
            <p className="tlabel">Selecciona tu equipo</p>
            <div className="tgrid3">
              {TEAM_NAMES.map(t=>(
                <button key={t} className={`tbtn ${team===t?"active":""}`} onClick={()=>setTeam(t)}>{t}</button>
              ))}
            </div>
            <button className={`sbtn ${team?"ready":""}`} disabled={!team} onClick={()=>handleStart(team)}>
              {team?`🚀 Empezar como equipo ${team}`:"Selecciona tu equipo primero"}
            </button>
          </div>
        </div>
      )}
      {screen === "reto" && (
        <RetoScreen key={retoIdx} reto={RETOS[retoIdx]} team={team} earned={earned} globalTimer={globalTimer} onComplete={handleComplete} />
      )}
      {screen === "victory" && <VictoryScreen team={team} />}
    </>
  );
}
