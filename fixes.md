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

## FIX-004 — El enlace de TikTok lleva a la cuenta de jóvenes, no a la de la iglesia

- **Estado:** ✅ ARREGLADA (revisada por cam-reviewer; pendiente de probar en producción)
- **Dónde:** `src/app/components/networks/networks.ts` (enlaces de TikTok e Instagram).
- **Problema:** el enlace de TikTok apuntaba a `@jovenes_el_camino` (cuenta de jóvenes) y su
  `detalle` hablaba de la juventud. El de Instagram arrastraba parámetros de seguimiento del QR
  (`?igsh=...&utm_source=qr`).
- **Causa:** enlaces copiados tal cual de otros orígenes (cuenta de jóvenes, enlace de QR).
- **Solución:** TikTok → `https://www.tiktok.com/@iglesiaelcamino__` con `detalle` «Vídeos cortos
  de la iglesia»; Instagram → `https://www.instagram.com/iglesiaelcamino__/` limpio. Agente:
  cam-frontend-dev.
- **Verificación:** build OK, tests 26/26; la página servida en local (/conocenos) enlaza a tiktok.com/@iglesiaelcamino__ e instagram.com/iglesiaelcamino__/.
- **Detectado:** 16 oct 2026, por Jesús al probar en local.

---

## FIX-005 — En el índice de /ministerios el primer enlace queda más alto que los demás

- **Estado:** ✅ ARREGLADA (revisada por cam-reviewer; pendiente de probar en producción)
- **Dónde:** `src/app/pages/ministerios/ministerios.scss` (`.ministerios-indice`).
- **Problema:** en la fila de enlaces de anclas, «Alabanza y adoración» aparece unos píxeles por encima del resto, en ambos modos.
- **Causa:** la regla global `.page-section ul li + li { margin-top }` de `src/styles.scss` da margen superior a todos los `li` salvo el primero; dentro del `flex-wrap` del índice eso empuja hacia abajo a los demás.
- **Solución:** `li { margin: 0 }` dentro de `.ministerios-indice`, por encima del `li + li` global. Agente: cam-frontend-dev.
- **Verificación:** `npm run build` con exit 0; la comprobación visual en local sigue pendiente, por Jesús.
- **Detectado:** 18 oct 2026, por Jesús.

---

## FIX-006 — En producción, las páginas internas cargadas directamente no arrancan Angular (CRÍTICO)

- **Estado:** ✅ ARREGLADA (pendiente de desplegar y probar en producción)
- **Dónde:** `src/index.html`; además `src/app/pages/layout/layout.{html,ts}` y `src/app/pages/ministerios/ministerios.html`.
- **Problema:** al entrar directamente a una página interna (desde Google, un enlace compartido o al refrescar) solo se aplica el CSS crítico incrustado: no funcionan el cambio de tema, el menú móvil, el formulario de contacto, los botones de compartir ni los reproductores de vídeo. La portada sí funciona. `https://icelcamino.com/ensenanza/main-DLOV67CE.js` devuelve 404 y `/main-DLOV67CE.js` devuelve 200. En local, `/campanas/hijos-de-luz` también se veía sin estilos.
- **Causa:** el commit 2220126 (nov 2025) quitó `<base href="/">`. Las páginas prerenderizadas viven en `/<ruta>/index.html` y Hostinger las sirve en `/<ruta>/` con barra final; los scripts y estilos se emiten con URL relativas (`main-XXXX.js`), que se resolvían a `/<ruta>/main-XXXX.js`.
- **Solución:** `<base href="/">` restaurado en `src/index.html`, con comentario. Efecto colateral tratado: con `<base>`, un `href="#ancla"` plano navega a la portada, así que el enlace «Saltar al contenido» ahora enfoca el `<main>` desde un manejador (`irAlContenido`) y el índice de `/ministerios` usa `[routerLink]="[]"` con `fragment`. Agente: cam-frontend-dev.
- **Verificación:** `npm run build` OK (18 rutas prerenderizadas); `ensenanza/index.html` y `campanas/hijos-de-luz/index.html` de `dist/` llevan `<base href="/">` y sus scripts y estilos resuelven desde la raíz. No quedan rutas relativas de imagen en plantillas ni SCSS. Falta confirmar en producción tras desplegar.
- **Detectado:** 19 oct 2026.

---

Formato de cada entrada:

## FIX-001 — Título breve del problema

- **Estado:** ⏳ PENDIENTE
- **Dónde:** página o componente.
- **Problema:** qué se observa y cómo reproducirlo.
- **Causa:** la raíz, cuando se conozca.
- **Solución:** qué se cambió y en qué ficheros; agente que lo hizo.
- **Verificación:** cómo se comprobó que quedó resuelto.
