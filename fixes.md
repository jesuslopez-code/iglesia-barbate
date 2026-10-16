# Correcciones (fixes) — Iglesia El Camino

> Log de fallos encontrados al **probar** la web. Se registra en el momento, sin depender de la
> memoria. Los fallos detectados en el análisis inicial que ya están planificados como tarea viven en
> `tareas.md`, no aquí: este fichero es para lo que aparezca al probar cada fase.
>
> **Estado:** ✅ ARREGLADA · 🔧 EN CURSO · ⏳ PENDIENTE.

---

## FIX-001 — En móvil, el botón del menú tapa el título de las páginas interiores

- **Estado:** ✅ ARREGLADA (revisada por cam-reviewer; pendiente de probar en producción)
- **Dónde:** layout en móvil (por debajo de 992 px), en todas las páginas interiores: Nuestras
  creencias, Enseñanza, Horarios y ubicación, Ministerios, Tu primera visita, Quiénes somos…
- **Problema:** con el móvil a 390 px de ancho y la página arriba del todo, el botón `.nav-toggle`
  (fijo, 44×44 px en `top/left: var(--ec-space-sm)`, de 12 a 56 px) se monta sobre el `<h1>`, que
  empieza en y=32 px y x=20 px. Se pierde la primera letra: «Nuestras creencias» se lee «‑uestras».
  En la portada no pasa porque su `<h1>` empieza en y=64 px.
- **Causa:** el contenido de las páginas interiores no reserva hueco arriba para el botón fijo del
  menú (`src/app/pages/layout/layout.scss`).
- **Solución:** `.content` reserva arriba `calc(var(--nav-toggle-size) + 2 * var(--ec-space-sm) +
  var(--ec-space-xs))` por debajo de 992 px; `--nav-toggle-size` (44 px, declarada en `:host`) la
  comparte con el ancho y alto de `.nav-toggle`. En escritorio el media query ya redefine el
  padding. Fichero: `src/app/pages/layout/layout.scss`. Agente: cam-frontend-dev.
- **Verificación:** build OK; Chrome sin interfaz a 390 y 360 px sobre el build nuevo, `getBoundingClientRect` de `.nav-toggle` vs `h1` en `/`, `/creencias`, `/ensenanza`, `/horarios`, `/primera-visita`, `/quienes-somos`: botón termina en y=56, h1 empieza en y=76 (108 en portada), sin solape. Tests 26/26.
- **Detectado:** 16 oct 2026, al capturar la web para el vídeo de presentación (Chrome sin
  interfaz, 390×844, prerenderizado de `dist/`).

---

## FIX-002 — «Tu primera visita» promete un café que la iglesia no ofrece

- **Estado:** ✅ ARREGLADA (revisada por cam-reviewer; pendiente de probar en producción)
- **Dónde:** `/primera-visita`, pregunta frecuente «Al finalizar»
  (`src/app/pages/primera-visita/primera-visita.html`).
- **Problema:** el texto dice «nos gusta compartir un café o una conversación informal». Jesús
  confirma que no se toma café: quien quiera puede quedarse al terminar para conocerse un poco más.
- **Causa:** contenido redactado antes de confirmarlo con la iglesia.
- **Solución:** respuesta reescrita: «Al terminar la reunión, si quieres, puedes quedarte un rato:
  nos encantará conocerte un poco más, sin ningún compromiso.» Fichero:
  `src/app/pages/primera-visita/primera-visita.html`. Sin más apariciones de «café» en `src/` ni
  metadatos. Agente: cam-frontend-dev.
- **Verificación:** grep de «café»/«cafe» en `src/` sin resultados; build OK.
- **Detectado:** 16 oct 2026, al preparar el carrusel de Instagram «Tu primer domingo».

---

## FIX-003 — La web enlaza al perfil personal de Facebook en lugar de la página profesional

- **Estado:** ✅ ARREGLADA (revisada por cam-reviewer; pendiente de probar en producción)
- **Dónde:** `src/app/components/networks/networks.ts` (enlace de Facebook en las redes).
- **Problema:** el enlace llevaba al perfil personal antiguo (`id=61550744498180`); la iglesia ya
  tiene página profesional de Facebook.
- **Causa:** enlace anterior a la creación de la página.
- **Solución:** `href` cambiado a `https://www.facebook.com/profile.php?id=61594975856668` y
  `detalle` a «Culto en directo cada domingo, fotos y avisos». Agente: cam-frontend-dev.
- **Verificación:** build OK; tests 26/26; grep del ID antiguo en `src/` sin resultados.
- **Detectado:** 16 oct 2026.

---

Formato de cada entrada:

## FIX-001 — Título breve del problema

- **Estado:** ⏳ PENDIENTE
- **Dónde:** página o componente.
- **Problema:** qué se observa y cómo reproducirlo.
- **Causa:** la raíz, cuando se conozca.
- **Solución:** qué se cambió y en qué ficheros; agente que lo hizo.
- **Verificación:** cómo se comprobó que quedó resuelto.
