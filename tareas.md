# Tareas por fases — Iglesia El Camino

> Plan por **fases** con estado. Se ejecuta con `/fase <n>`. **Al terminar cada fase, PARAR** para
> que Jesús pruebe y valide antes de seguir. Estados de tarea: `[ ]` pendiente · `[~]` en curso ·
> `[x]` hecha.

---

## Fase 0 — Sistema y esqueleto

- **Objetivo:** que el sitio tenga su identidad visual y su estructura de navegación funcionando, aún
  sin contenido nuevo.
- **Alcance:** tokens, tipografías, servicio de tema, componente de layout con barra lateral,
  limpieza de los estilos heredados que estorban. **Fuera de alcance:** páginas nuevas, contenido,
  metadatos, optimización de imágenes.
- **Entregables:** `src/styles.scss` con el juego completo de tokens en los dos modos; las tres
  tipografías cargadas; servicio de tema con `data-theme` y preferencia guardada; componente de
  layout con barra lateral fija en escritorio y panel deslizante en móvil; logo en SVG o PNG
  transparente.
- **Criterios de aceptación:** el sitio se ve correctamente en los dos modos sin ningún texto
  ilegible; el interruptor de tema recuerda la elección al recargar; la barra lateral funciona a
  360 px de ancho; ningún componente tiene ya un color literal en su SCSS; los titulares no
  desbordan en móvil.
- **Dependencias:** ninguna. **Estado:** hecho.
- **Notas y riesgos:** el logo con fondo blanco es bloqueante para el modo oscuro. Si no hay versión
  transparente a tiempo, dejarlo anotado y seguir.

Tareas:

- [x] Declarar los tokens `--ec-*` de la tabla de `CLAUDE.md` en `:root` y sus redefiniciones para
      modo oscuro — `cam-frontend-dev`
- [x] Cargar Cormorant Garamond, Source Serif 4 y Karla, y definir la escala tipográfica con
      `clamp()` — `cam-frontend-dev`
- [x] Servicio de tema: `data-theme` en la raíz, valor inicial desde `prefers-color-scheme`,
      preferencia guardada, e interruptor accesible — `cam-frontend-dev`
- [x] Componente de layout con barra lateral: fija en escritorio, panel deslizante en móvil, con el
      filo de latón en el elemento activo — `cam-frontend-dev`
- [x] Limpiar los estilos heredados: quitar `color: white` global, el `padding` muerto del `body`,
      los tamaños fijos de `header.scss` y `body.scss` — `cam-frontend-dev`
- [x] Quitar las importaciones muertas de `App` y `Footer` y el mecanismo duplicado de desplegable
      — `cam-frontend-dev`
- [x] Marca tipográfica (Cormorant Garamond + filo de latón) en lugar de imagen de logo, comprobada
      en los dos modos — `cam-frontend-dev`
- [x] Revisión con `cam-reviewer` y cierre de la fase (parar y validar)

---

## Fase 1 — Navegación real

- **Objetivo:** que se pueda navegar por toda la web, aunque las páginas estén aún vacías de
  contenido definitivo.
- **Alcance:** rutas de los apartados, generación de la navegación, ruta 404, restauración de scroll.
  **Fuera de alcance:** los textos y las fotos definitivas.
- **Entregables:** todas las rutas de la arquitectura de información declaradas con `loadComponent`;
  la barra lateral generada desde esa misma definición; página 404; cada página con su esqueleto y un
  titular real.
- **Criterios de aceptación:** ningún enlace de la barra lateral lleva a una ruta inexistente; una
  URL inventada muestra la página 404; al navegar, la página empieza arriba; la agrupación de la
  lateral coincide con la de `CLAUDE.md`.
- **Dependencias:** fase 0. **Estado:** hecho.
- **Notas y riesgos:** la navegación debe salir de la definición de rutas. Si aparece un segundo
  array de menú, está mal hecho.
- **Decisión de Jesús:** «Jóvenes» y «Kids» tienen cada una su propia entrada en la lateral
  (dentro de «Vida de iglesia»), no una entrada compartida con enlace cruzado.

Tareas:

- [x] Declarar las rutas de los cuatro bloques con `loadComponent` y sus títulos —
      `cam-frontend-dev`
- [x] Generar la barra lateral desde la definición de rutas, con los cuatro grupos y «Servir» y
      «Donar» separados abajo — `cam-frontend-dev`
- [x] Página 404 y restauración de scroll al navegar — `cam-frontend-dev`
- [x] Esqueleto de cada página con su titular y su estructura — `cam-frontend-dev`
- [x] Revisión con `cam-reviewer` y cierre de la fase (parar y validar)

---

## Fase 2 — Contenido

- **Objetivo:** que la web responda a lo que pregunta quien llega.
- **Alcance:** los textos, las fotos y los datos de todos los apartados, más la voz de lectura de la
  sección de enseñanza. **Fuera de alcance:** metadatos y optimización, que van en las fases 3 y 4.
- **Entregables:** quiénes somos, nuestras creencias, equipo pastoral, enseñanza (como archivo de
  prédicas con fecha y pasaje), ministerios, acción social, tu primera visita, horarios y ubicación,
  galería, servir, donar y contacto. Horarios y prédicas en ficheros JSON de datos.
- **Criterios de aceptación:** ninguna página queda con texto de relleno; la sección de enseñanza usa
  la columna única de lectura y el pasaje destacado; los horarios están como dato reutilizable, no
  como frase suelta en un titular; la imagen de la portada va en banda con velo y ningún texto
  depende del contraste de la foto.
- **Dependencias:** fase 1, y que la iglesia facilite textos y fotos. **Estado:** pendiente.
- **Notas y riesgos:** es la fase que depende de terceros y la que más probablemente se atasque. «Tu
  primera visita» es la página más leída en una web de iglesia: merece cuidado especial.
- **Fuente de contenido:** los textos definitivos están en la propuesta de la iglesia del 3 de
  octubre de 2026 (`D:\Iglesia Barbate\Propuesta Web - Iglesia Evangelica El Camino Barbate.docx`,
  fuera del repositorio). Se usan tal cual; las indicaciones de diseño del documento se adaptan al
  sistema «Faro» y no lo sustituyen (los iconos de redes que pide «en cabecera» van en la barra
  lateral y el pie, porque no hay cabecera).

Maquetación elegida por Jesús (3 de octubre de 2026), a aplicar sobre los textos ya volcados:

- **Creencias:** rejilla de 5 tarjetas con icono que muestran solo el título («La Biblia»...) y se
  dan la vuelta con animación al pasar el ratón o al tocar en móvil, mostrando la explicación. La
  tarjeta tiene que ser un control accesible por teclado (`button` con `aria-expanded` o
  equivalente), ambas caras legibles por lector de pantalla y, con `prefers-reduced-motion`, sin
  giro (cambio directo o fundido).
- **Ministerios:** índice de anclas arriba y cada ministerio como sección con regla fina; el horario
  de Oración como dato destacado; Jóvenes y Kids al final como dos tarjetas de entrada.
- **Tu primera visita:** todas las respuestas visibles, pregunta en Cormorant y respuesta debajo,
  con un resumen práctico arriba (hora, dirección y duración).
- **Acción social:** intro de ACAF, bloque destacado de El Refugio con la etiqueta «En construcción
  y recaudación de fondos», las 4 áreas en rejilla 2×2 y llamada a colaborar con Donar y Contacto.
  Se está haciendo en paralelo una web propia de El Refugio: aquí va un resumen, no el proyecto
  completo, y cuando exista la web se enlaza desde este bloque.

Pendiente de la iglesia (sin esto no se cierra la fase):

- [ ] URL de la web propia de El Refugio — aplazado por decisión de Jesús (15 de octubre de 2026):
      de momento no se enlaza nada.
- [ ] Fotos: congregación reunida (1-2), foto histórica de los inicios, retrato del pastor, Kids,
      Jóvenes, El Refugio y galería — Jesús
- [x] Donaciones — Jesús (15 de octubre de 2026): de momento no se publican Bizum ni IBAN; para
      donar por Bizum o transferencia se contacta por WhatsApp o por correo (info@icelcamino.com).
      Sin certificados de donación.
- [x] URL de Spotify: https://open.spotify.com/show/2Pp0CTBYLUaxGjniSFKFEW — Jesús
- [x] Nombre del pastor: Francisco Manuel López (confirmado por Jesús) — Jesús
- [ ] Aplazado (15 de octubre de 2026), queda el texto genérico — Equipo de liderazgo: si ancianos, diáconos y líderes salen con nombre (y con permiso) o solo
      como texto genérico — Jesús
- [ ] Horario de Jóvenes (Gedeones) o bloque de avisos — aplazado (15 de octubre de 2026); se
      mantiene «se anuncian en nuestras redes sociales» — Jesús
- [ ] Apartado «Células»: la iglesia lo enviará en breve; decidir su sitio en la barra lateral y su
      relación con «Grupos pequeños y hogares de fe» de Ministerios — Jesús
- [ ] «Sonido/Técnica» aparece como área de servicio pero no como ministerio: confirmar si se añade
      a ministerios — Jesús
- [ ] Logo en SVG o PNG transparente, en `public/` — Jesús

Relevo (3 de octubre de 2026) — Responsable IA: Claude · `cam-frontend-dev` (Sonnet):
textos de la propuesta volcados en todas las páginas, sin fotos; maquetación elegida aplicada en
creencias, ministerios, primera visita y acción social; horario por temporada en
`horarios.data.ts` (`TEMPORADAS`, `horaActual()`), con `/horarios` mostrando las dos temporadas en el
HTML prerenderizado y la portada y primera visita recalculando la hora en el navegador; datos
estructurados con las dos temporadas; sección «Nuestra visión» eliminada por no tener texto. Build
con 16 rutas prerenderizadas y aprobado por `cam-reviewer`. Las tareas `[~]` están implementadas
y pendientes de validación visual en navegador (claro/oscuro, 360 px) y de las fotos. Sin commit.
Validado en navegador por Jesús el 15 de octubre de 2026. Siguen en `[~]` las tareas que esperan
fotos (páginas de La iglesia) o URL (redes).

Tareas:

- [x] Recopilar con la iglesia los textos de creencias, quiénes somos y equipo pastoral — Jesús.
      Entregados en la propuesta del 3 de octubre de 2026, junto con los del resto de apartados.
- [~] Páginas de La iglesia: quiénes somos (dos columnas, foto de congregación e histórica),
      creencias (rejilla de 5 tarjetas con icono, mención a FEREDE), equipo pastoral (retrato del
      pastor y bloque sobrio de liderazgo) — `cam-frontend-dev`
- [x] Horario por temporada en `horarios.data.ts`: 19:00 de octubre a abril y 20:00 de mayo a
      septiembre, con la hora vigente calculada según la fecha; rellenar `actividad` (jueves:
      oración e intercesión; domingo: culto principal y El Camino Kids) y mostrarla en la portada y
      en `/horarios` — `cam-frontend-dev`
- [ ] Añadir el campo `serie` a las prédicas; los filtros por serie, predicador y fecha quedan para
      cuando el archivo pase de unas diez — `cam-frontend-dev`
- [~] Enlaces a redes (Facebook con el directo dominical, YouTube, Instagram, TikTok, Spotify) en la
      barra lateral y el pie, desde un único fichero de datos — `cam-frontend-dev`, cuando haya URL
- [x] Enseñanza como archivo de prédicas desde fichero de datos, con la voz de lectura, carrusel
      de portada y ficha con reproductor en facade — `cam-frontend-dev`. El archivo de
      `/ensenanza` está montado pero vacío de contenido real: falta que la iglesia entregue
      prédicas grabadas (fecha, pasaje, predicador, resumen). Los vídeos de otras actividades
      de la iglesia (teatro, danza) ya tienen su propio sitio en `/conocenos` y ocupan de forma
      temporal el bloque de la portada mientras no haya prédicas.
- [x] Ministerios (seis: alabanza, oración, grupos pequeños, bienvenida, discipulado, limpieza y
      mantenimiento), Jóvenes «Gedeones» y El Camino Kids (de 3 a 12 años) — `cam-frontend-dev`
- [x] Acción social: ACAF y el proyecto Centro Social El Refugio (con Tharsis Betel), con llamada a
      colaborar enlazada con Donar — `cam-frontend-dev`
- [x] Rehacer la portada según la maqueta: antetítulo, titular en Cormorant, banda de imagen con
      velo y las tres tarjetas de entrada; el formulario de contacto se va a `/contacto` —
      `cam-frontend-dev` (adelantada tras cerrar la fase 1)
- [x] Bloque «Cuándo nos reunimos» en la portada (rejilla, encima de las tres entradas) y
      `/horarios` consumiendo el mismo fichero de datos (`src/app/data/horarios.data.ts`); cierre
      de portada con «Dónde estamos» (mapa + dirección + enlace a la app de mapas) —
      `cam-frontend-dev`. La actividad de cada día y el horario de verano ya los confirmó la
      iglesia en la propuesta del 3 de octubre de 2026; se aplican en la tarea de horario por
      temporada de arriba.
- [x] Tu primera visita (vestimenta, duración de 1 h 15 min, sin obligación de participar, niños,
      aparcamiento, café al final) y galería — `cam-frontend-dev`
- [x] Servir (áreas de servicio), donar (Bizum, transferencia y efectivo en los cultos) y contacto —
      `cam-frontend-dev`
- [ ] Campo trampa en el formulario y restricción de orígenes en el panel de EmailJS — Jesús y
      `cam-frontend-dev`
      - Correcciones de la 2.ª revisión: borde de ☰ en `header.scss` al 45 %; datos de la portada en
        2 columnas hasta 999 px y 3 desde 1000 px (la dirección ya no cae sobre el mar claro);
        `<span class="tarjeta__texto">` pasa a `<div>` en `portada-descubre`; la tarjeta Enseñanza
        deja la carátula de YouTube y usa `/photos-iglesia/bautizo5-960.jpg|webp` (960×720, no sale
        en otra parte de la portada; foto1 ya está en «Así somos»), sin código sobrante;
        indentación de `body.html`; línea en blanco sobrante en `styles.scss`. `ng test` 29/29,
        `npm run build` OK. Capturas en el scratchpad `rv2/`.
- [ ] Revisión con `cam-reviewer` y cierre de la fase (parar y validar)

---

## Fase 3 — Que os encuentren

- **Objetivo:** que el sitio sea indexable y se vea bien al compartirlo.
- **Alcance:** prerenderizado, metadatos, datos estructurados y ficheros de rastreo. **Fuera de
  alcance:** rendimiento de imágenes, que va en la fase 4.
- **Entregables:** prerenderizado de todas las rutas; título y descripción por ruta; Open Graph con
  imagen; datos estructurados de tipo `Church` con dirección, teléfono y horarios; `robots.txt` y
  `sitemap.xml`.
- **Criterios de aceptación:** el HTML servido de cada ruta contiene su contenido real, no un
  `app-root` vacío; al pegar un enlace en WhatsApp aparece título, descripción e imagen;
  `robots.txt` y `sitemap.xml` responden 200; el despliegue por FTP sigue funcionando igual.
- **Dependencias:** fase 2. **Estado:** en curso.
- **Notas y riesgos:** el prerenderizado no debe romper el workflow de GitHub Actions; comprobar que
  la carpeta que sube el FTP sigue siendo la correcta.

Tareas:

- [x] Activar el prerenderizado de Angular y ajustar el workflow de despliegue —
      `cam-frontend-dev`
- [x] Título, descripción y Open Graph por ruta — `cam-frontend-dev`
- [x] Datos estructurados `Church` con dirección, teléfono y horarios — `cam-frontend-dev`
- [x] `robots.txt` y `sitemap.xml` — `cam-frontend-dev`
- [ ] Comprobar el resultado con la web ya desplegada — Jesús
- [x] Revisión con `cam-reviewer` y cierre de la fase (parar y validar)

---

## Fase 4 — Velocidad y accesibilidad

- **Objetivo:** que la web cargue rápido con datos móviles y se pueda usar con teclado y con lector
  de pantalla.
- **Alcance:** imágenes, vídeos, foco, contraste y mapa. **Fuera de alcance:** contenido nuevo.
- **Entregables:** imágenes en WebP con varios tamaños, con `alt` real, `width`, `height` y carga
  diferida fuera de la portada; vídeos de YouTube cargados al pulsar; foco de teclado visible; mapa
  con `title` y carga diferida.
- **Criterios de aceptación:** no queda ningún `alt` de relleno; se puede recorrer toda la web con el
  tabulador viendo siempre dónde está el foco; el contraste pasa en los **dos** modos; la portada
  carga en un móvil con datos sin espera perceptible.
- **Dependencias:** fase 2. **Estado:** en curso.
- **Notas y riesgos:** medir antes y después para saber si el trabajo sirvió de algo.

Tareas:

- [x] Convertir las fotos a WebP con varios tamaños y declarar dimensiones — `cam-frontend-dev`.
      Sin códec WebP en el entorno (ni cwebp, ni ImageMagick, ni ffmpeg): se instaló `sharp` como
      dependencia de desarrollo y `scripts/generar-webp.mjs` (`npm run imagenes:webp`) genera el
      `.webp` de cada JPEG que se sirve de verdad (portada, carrusel, galería) a los mismos anchos
      que ya existían. Servidos con `<picture><source type="image/webp">` + `<img>` de reserva en
      el carrusel (`components/carousel/`) y la banda de portada (`pages/body/`); el fondo de
      página de la portada (CSS, no `<img>`) usa `image-set()` con el `url()` JPEG como reserva
      delante. `width`/`height` reales ya estaban declarados en esas imágenes; se completaron los
      que faltaban en `whatsapp-widget` (ver tarea de alt de abajo).
- [x] Textos alternativos reales en todas las imágenes — `cam-frontend-dev`. Auditados los `alt`
      contra la foto real (no el nombre de fichero): los del carrusel ya eran correctos. Corregido
      `whatsapp-widget.html`: los dos iconos de WhatsApp eran decorativos junto a texto/label
      propios y llevaban `alt` redundante sin `width`/`height` — ahora `alt=""` con
      `aria-label` en los botones que los contienen.
- [x] Vídeos de YouTube cargados al pulsar y mapa con `title` y carga diferida —
      `cam-frontend-dev`. Confirmado: `video-card` no crea el iframe hasta `reproducir()`; los dos
      mapas (portada y `/horarios`) llevan `title` y `loading="lazy"`. Corregido un fallo real: el
      carrusel de fotos (`app-carousel`, hoy solo en la galería de `/conocenos`) cargaba su primera
      foto en eager + `fetchpriority="high"` como si fuera LCP de portada, herencia de cuando sí
      vivía ahí — ya no la usa (la banda de portada es una `<img>` propia en `body.html`). Añadido
      `@Input() prioritaria` (por defecto `false`): solo con ese flag a `true` la primera foto va
      eager; la galería no lo pasa, así que ya es lazy como el resto.
- [x] Foco de teclado visible y repaso de contraste en los dos modos — `cam-frontend-dev`. Añadido
      `:focus-visible` con `--ec-focus-ring` donde faltaba: los tres botones del widget de
      WhatsApp y los campos/botón del formulario de contacto (que traían el anillo azul por
      defecto de Bootstrap). Auditoría de contraste con ratios WCAG reales en el informe de la
      fase — un token (`--ec-accent` sobre fondo claro) queda por debajo de AA; es decisión de
      Jesús, no se ha tocado.
- [x] Medición final en móvil — `cam-frontend-dev`. Medido con `npx ng build` (bundle) y tamaños de
      fichero servidos (JPEG y WebP nuevos); tabla completa en el informe de cierre de fase. No se
      ha podido medir en un móvil físico con datos reales desde este entorno.
- [x] Bajar el peso del bundle inicial: supera el presupuesto de 500 kB — `cam-frontend-dev`.
      FontAwesome ya importaba iconos sueltos (no el paquete completo): no era la causa. La causa
      real era Bootstrap: se servía `bootstrap.min.css` completo (232 kB) más `popper.min.js` sin
      usar (ningún dropdown/tooltip/popover en el sitio). Sustituido por `src/styles-bootstrap.scss`
      (Sass, solo los módulos que el sitio usa: rejilla, formularios, botones, alert, carrusel, y
      un `$utilities` recortado a las claves de verdad usadas) y quitado `popper.min.js` +
      `@popperjs/core` de `package.json`. De 657.74 kB a 482.93 kB — bajo el presupuesto de 500 kB.
- [ ] Revisión con `cam-reviewer` y cierre de la fase (parar y validar)

---

## Fase 5 — Campañas

- **Objetivo:** una sección reutilizable para campañas puntuales (Halloween, Navidad, Semana
  Santa…): añadir una es una entrada de datos más sus ficheros, sin tocar componentes.
- **Alcance:** `/campanas` (índice) y `/campanas/:slug` (detalle), aviso en la portada mientras una
  campaña está activa, entrada «Campañas» en «Vida de iglesia». **Fuera de alcance:** cambios en
  prédicas o en `/ensenanza`.
- **Entregables:** `data/campana.ts` + `data/campanas.data.ts`; `pages/campanas/` (índice, detalle y
  resolvers); `components/campana-aviso/`; `app.routes.server.ts` (prerenderizado por slug);
  `public/descargas/<slug>/`.
- **Criterios de aceptación:** `npm run build` correcto; HTML prerenderizado de `/campanas` y de
  cada campaña con título, descripción y Open Graph propios; sin errores de hidratación.
- **Dependencias:** fase 3. **Estado:** en curso.

Tareas:

- [x] Datos, rutas, páginas, aviso de portada y prerenderizado por slug — `cam-frontend-dev`.
      Primera campaña: `hijos-de-luz` (Halloween 2026). Ficheros de descarga copiados desde
      `D:\Iglesia Barbate\campanas\hijos-de-luz\`. El sitemap ya se genera desde las rutas
      (`scripts/generar-sitemap.mjs`, ahora expande `campanas/:slug` con los datos).
      Evento del jueves 29 de octubre cancelado: se quitó el bloque `evento` de `hijos-de-luz`
      (el campo sigue siendo opcional en `Campana` y los componentes lo soportan) y se actualizó
      el peso del folleto regenerado.
- [ ] Probar en navegador (móvil 360 px, claro y oscuro, compartir en móvil real) — Jesús
- [ ] Revisión con `cam-reviewer`

---

## Fase 6 — Portada que convierte y SEO local

- **Objetivo:** que quien llega por primera vez sepa en segundos cuándo, dónde y cómo es la iglesia,
  y que Google la asocie a «iglesia evangélica Barbate».
- **Alcance:** portada (`pages/body/`), metadatos y datos estructurados, arreglos visuales detectados
  en el análisis del 26 de octubre de 2026. **Fuera de alcance:** la navegación (cabecera o lateral),
  que va en la fase 7; la ficha de Google Business, que gestiona Jesús fuera de la web.
- **Entregables:** banda de portada con título, horario, dirección y dos llamadas a la acción;
  «Cuándo y dónde» justo después de la portada; franja «Así es un domingo» con fotos reales del culto;
  bloque «Qué esperar»; accesos rápidos con imagen o icono; prédicas en rejilla en lugar de carrusel;
  títulos SEO con «Barbate»; datos estructurados `VideoObject` (prédicas) y `Event` (campañas con
  evento); icono de WhatsApp servido desde `public/`; enlace de `/primera-visita` con los tokens.
- **Criterios de aceptación:** en móvil (360-390 px) se ven horario, dirección y el botón principal
  sin hacer scroll; ningún color literal nuevo fuera de los tokens; ningún enlace con el azul de
  Bootstrap; el `<title>` de portada, horarios, primera visita y ministerios incluye «Barbate»;
  `npm run build` correcto con todas las rutas prerenderizadas; sin errores de hidratación; contraste
  AA en los dos modos.
- **Dependencias:** fases 3 y 4. **Estado:** en curso.
- **Notas y riesgos:** las fotos del culto del 11 de octubre están en
  `G:\Mi unidad\Iglesia El Camino\Web Iglesia\Fotos y videos\2026-10-11 Culto` (originales de
  6144×8160 o vídeo): hay que exportarlas a WebP y JPEG en varios tamaños. Salen caras de la
  congregación: elegir planos de adultos y confirmar el permiso con Jesús antes de publicar.

Tareas:

- [~] Arreglos rápidos: enlace azul de `/primera-visita`, títulos SEO con «Barbate», icono de
      WhatsApp local — `cam-frontend-dev`. Responsable IA: Claude · área frontend · modelo del agente.
      Relevo (Claude, 26-oct-2026): enlaces de texto de `.page-intro`/`.page-section` con
      `--ec-accent` (regla global en `styles.scss`; arregla primera-visita, servir, donar, contacto,
      jóvenes, kids). Títulos con «Barbate» en portada (og/twitter igual), horarios, primera-visita y
      ministerios (todos <60 car.). Icono de WhatsApp en `public/whatsapp.svg` (descargado una vez de
      Wikimedia; widget sin dependencias externas). Ficheros: `app.routes.ts`, `styles.scss`,
      `whatsapp-widget.html`, `public/whatsapp.svg`.
- **Revertida la portada nueva por decisión de Jesús (26 de octubre de 2026):** `pages/body/` y
  `components/video-carousel/` vuelven al contenido de HEAD; se eliminaron `data/que-esperar.data.ts`,
  `scripts/generar-fotos-culto.mjs` y `public/photos-iglesia/culto-*`. Se conserva de la fase: arreglos
  rápidos (enlaces con tokens, títulos SEO, `whatsapp.svg`), `structured-data-pagina.ts` (`VideoObject`
  en `/ensenanza`, `Event` en campañas; el de portada desaparece), `REUNION_DOMINGO` en
  `/primera-visita` y los presupuestos de `angular.json`. Las tareas «Portada nueva» y la del permiso
  de fotos del culto quedan sin efecto.
- [~] Portada nueva: banda con horario, dirección y dos botones; «Cuándo y dónde» arriba; franja
      «Así es un domingo»; «Qué esperar»; accesos rápidos; prédicas en rejilla — `cam-frontend-dev`.
      Responsable IA: Claude · área frontend · modelo del agente.
      Relevo (Claude, 26-oct-2026): `pages/body/` rehecho. Orden: banda (bautizo6 + velo con
      `--ec-sidebar` vía color-mix, texto `--ec-sidebar-ink`/`--ec-accent-fill`; H1 con Barbate; hora
      de `horaActual()`, dirección de `DIRECCION_TEXTO`; botones «Planifica tu visita» y «Cómo llegar»)
      → Cuándo y dónde → aviso de campaña → «Así es un domingo» (4 fotos) → «Qué esperar»
      (`data/que-esperar.data.ts`; `/primera-visita` conserva su propio párrafo, no se unificó) →
      accesos (Qué creemos / Ministerios / Servir, con icono; Prédicas sale ya en su propia sección)
      → 3 últimas prédicas en rejilla con `app-video-card`. Eliminado `components/video-carousel` (sin
      usos). Fotos: `scripts/generar-fotos-culto.mjs` (derivados 480/960 jpg+webp en
      `public/photos-iglesia/culto-*`). Comprobado: build, 18 rutas prerenderizadas, capturas Chrome
      1440 y 500 px en claro y oscuro (móvil: hora, dirección y botón visibles sin scroll).
      Pendiente/avisos: Jesús debe confirmar el permiso de las personas que salen en 3 fotos; el
      bundle inicial queda en 500,46 kB (aviso de presupuesto de 500 kB, +460 B; antes 499,6);
      contraste de la banda estimado por cálculo, no medido píxel a píxel.
- [~] Datos estructurados `VideoObject` y `Event` — `cam-frontend-dev`. Responsable IA: Claude.
      Relevo (Claude, 26-oct-2026): `core/seo/structured-data-pagina.ts` (aparte de
      `StructuredData` para no engordar el bundle inicial): `VideoObject` (portada y `/ensenanza`;
      duración y fecha convertidas a ISO desde los datos, omitidas si no encajan) y `Event` en
      `campana-detalle` solo si hay `evento` (hoy ninguna: no verificado con un evento real).
      JSON-LD de portada y enseñanza parseado OK en el HTML prerenderizado.
- [x] Revisión con `cam-reviewer` y cierre de la fase (parar y validar). Aprobado con cambios
      menores el 26 de octubre de 2026, ya aplicados; fase parada para validación.
      Tras revisión (cam-reviewer): `REUNION_DOMINGO` exportada en `horarios.data.ts` (adiós al
      `find(...)!` en portada y primera-visita); comentario del velo del `.hero` ajustado a los valores
      reales; presupuesto `initial` a 520 kB (aviso) y `anyComponentStyle` a 10 kB (error) en
      `angular.json`. Build OK, sin aviso de bundle inicial (500,47 kB). `.boton` sigue local a la
      portada (unificarlo en `styles.scss` engordaría el bundle inicial).
      Tras revisión: el `Place` de `Event` lleva `address` (`DIRECCION_ESTRUCTURADA`) y `startDate`
      con desfase de Europa/Madrid calculado (+01:00/+02:00 por último domingo de marzo/octubre). Sin
      `endDate`: los datos no traen hora de fin y no se inventa. Sigue sin probarse con un evento real.
- [ ] Probar en navegador (móvil, claro y oscuro) — Jesús
- [-] (sin efecto, fotos eliminadas) Confirmar el permiso de las personas que salen en `culto-alabanza-letra`,
      `culto-alabanza-grupo` y `culto-pulpito` antes de desplegar — Jesús

---

## Fase 7 — Navegación en cabecera

- **Objetivo:** sustituir la barra lateral por una cabecera, con el logo y la llamada a la acción
  siempre visibles, sobre todo en móvil.
- **Decisión (Jesús, 26 de octubre de 2026):** cabecera **sólida azul noche** (`--ec-sidebar`) fija
  en todas las páginas, que se compacta al hacer scroll. Primero se eligió una cabecera transparente
  sobre la portada nueva; al revertirse la portada, Jesús eligió la sólida. Logo a la izquierda, los
  4 grupos actuales como desplegables (generados desde las rutas, sin menú duplicado), «Donar»
  discreto y «Tu primera visita» como único botón en latón; elemento activo con el filo de latón. En
  móvil: barra fija con logo, botón «Visítanos» y ☰ que abre el panel a pantalla completa con los
  4 grupos. La portada no cambia de contenido: solo gana el ancho que dejaba la lateral.
- **Alcance:** `pages/layout/` (y lo que hoy forme la barra lateral y el panel móvil), interruptor de
  tema dentro de la cabecera, tokens de foco. **Fuera de alcance:** contenido de las páginas.
- **Criterios de aceptación:** ninguna barra lateral; menú generado desde `app.routes.ts`;
  desplegables usables con ratón, táctil y teclado (Esc cierra, foco visible, `aria-expanded`);
  panel móvil con el foco atrapado mientras está abierto; enlace activo marcado; contraste AA en
  los dos modos; `npm run build` correcto con todas las rutas prerenderizadas; sin errores de
  hidratación; las páginas no quedan tapadas por la cabecera fija (anclas incluidas).
- **Dependencias:** fase 6. **Estado:** hecho (validada por Jesús el 29 de octubre de 2026). Especificación «Faro» de `CLAUDE.md` ya
  actualizada.

Tareas:

- [~] Cabecera con desplegables, panel móvil y compactado al hacer scroll — `cam-frontend-dev`.
      Responsable IA: Claude · área frontend · modelo del agente.
      **Relevo (implementado, pendiente de revisión):**
      - Nuevo `pages/header/` (`header.ts/html/scss/spec.ts`, selector `app-header`); `pages/layout/`
        queda en skip link + `app-header` + `main` + pie (sin `.shell` ni lateral; `layout.scss` de
        4,3 kB a ~1 kB). El resto de ficheros tocados: `core/nav/nav.ts` (`NavSlot` fuera; `rol` y
        `findNavByRole` en lugar de `findNavLink`), `app.routes.ts` (Servir y Donar pasan a grupo
        `participar` con `orden` 1/2 y Contacto a 3; `rol: 'donar'` y `rol: 'visita'`; Ministerios
        con `exact: true` para que no se marque con Jóvenes/Kids), `styles.scss` (tokens
        `--ec-header-h`/`--ec-header-h-compact` en lugar de `--ec-sidebar-width`, `scroll-padding-top`),
        `body.scss` (fondo de portada a ancho completo), `footer.scss/.ts`,
        `theme-switch.scss/.ts` (`host-context(.site-header)`; sin texto dentro de `.acciones`),
        `campana-aviso.ts` (`sizes` sin descontar lateral) y comentarios que hablaban de la lateral.
      - Decisiones: corte escritorio/móvil en 1200 px (a 1200 caben los 4 desplegables, Donar,
        interruptor solo icono y botón sin apretarse; medido sin desbordamiento horizontal). Panel
        móvil renderizado solo abierto; foco atrapado a mano; `inert` en contenido y pie vía
        `output`. Desplegables solo por clic/táctil/teclado (sin abrir al pasar el ratón). El
        enlace «Donar» sale en la barra y, en el panel, como botón en el pie en vez de en la lista.
      - Comprobado: `npm run build` OK (18 rutas prerenderizadas, bundle inicial 508,6 kB, sin
        errores; avisos de `anyComponentStyle` en `header.scss` 6,4 kB, `body.scss` y
        `campana-detalle.scss`, bajo el límite de error de 10 kB); `ng test` 28/28; capturas con
        Chrome (CDP) a 1440, 1200, 500 y 360 px en claro y oscuro: desplegable abierto, cabecera
        compactada al hacer scroll, panel móvil; por script: ArrowDown abre y enfoca el primer
        enlace, flechas mueven, Esc cierra y devuelve el foco, el panel enfoca el primer enlace,
        bloquea el scroll y deja `main` inerte. Sin errores de consola ni de hidratación.
      - Sin comprobar: lector de pantalla real, Tab real con el panel (solo la lógica por código),
        táctil real, navegadores distintos de Chrome, contraste medido con herramienta (se usan los
        mismos tokens ya validados de la lateral). Las capturas de modo oscuro se hicieron
        forzando `data-theme`, no pulsando el interruptor.
      - Correcciones tras `cam-reviewer`: clic en cualquier enlace de la cabecera/panel cierra
        desplegable y panel sin depender de `NavigationEnd`; scroll con `addEventListener`
        pasivo (`afterNextRender`, retirado al destruir); `aria-controls` del panel solo con el
        panel abierto; borde de ☰ e interruptor al 45 % (3,6:1 en los dos modos); panel en dos
        columnas desde 480 px (a 500×900 sin scroll; a 360 px una columna); `header.scss` de
        6,44 a 5,95 kB. WhatsApp: el widget estaba dentro de la portada y su `z-index` quedaba
        atrapado en el contexto de apilamiento de `Body`, así que el pie lo tapaba; ahora lo
        monta `Layout` (solo en `/`, `inert` con el panel abierto) y el pie reserva sitio a la
        derecha para no quedar tapado.
      - Pendiente: revisar si `header.scss` debe adelgazarse (aviso de 4 kB); decidir si el panel
        móvil, que mide más de una pantalla en 360×740, debe pasar a dos columnas antes.
- [x] Portada en tarjetas, maqueta G1 «Foto a media altura» (decisión de Jesús, 26 de octubre de 2026;
      sustituye a la portada por bandas) — `cam-frontend-dev`
      **Relevo:**
      - Hero (`portada-hero`) a 420 px (440 en móvil, texto abajo) con etiqueta, H1, lema y los dos
        botones; los horarios salen del hero. Reglas de LCP intactas (fetchpriority, sizes, WebP/JPEG,
        width/height, sin lazy). Debajo, tarjetas sobre `--ec-ground` en la columna de contenido:
        fila 1 campaña (2fr) + «Cuándo» (1fr); fila 2 Creencias/Enseñanza/Servir (`portada-descubre`,
        con H2 «Descubre El Camino» solo para lectores de pantalla y H3 por tarjeta); fila 3 «Última
        prédica» (1.3fr, solo la más reciente con `app-video-card` + «Todas las prédicas →») y a la
        derecha «Así somos» (noche) y «Dónde» (dirección, teléfono, correo, mapa lazy, «Cómo llegar →»).
      - `app-campana-aviso` es ahora tarjeta (sin filo de latón; amanecer bajo el velo). Sin campaña
        activa pinta la tarjeta noche «¿Es tu primera vez? / Ven como estés» con botón a
        `/primera-visita`; `reservado` se mantiene (con campaña en el build, el hueco queda reservado y
        el fallback solo sale si el cliente confirma que ya no hay campaña).
      - Token nuevo `--ec-radius-card: 14px` en `:root` de `styles.scss` (no cambia por modo). Sombra:
        `--ec-shadow-sm` existente. Eliminados: `portada-somos`, `components/video-carousel` (sin
        uso), utilidades `.banda*` de `styles.scss` y los estilos de «Cuándo y dónde» de `body.scss`.
      - Comprobado: `ng test` 30/30; `npm run build` OK, 18 rutas prerenderizadas, bundle inicial
        513,01 kB (sin cambio); capturas Chrome a 1440 y 500 px en claro y oscuro y a 1440/500 simulando sin
        campaña (fecha desplazada +150 días en la página, sin tocar código). Un solo H1, sin desbordes.
      - Sin comprobar: contraste medido con herramienta (se aplican velos ≥0,92 y tokens ya validados),
        lector de pantalla, táctil real, Tab real. El botón de WhatsApp puede tapar un enlace al hacer scroll
        en móvil (es fijo); en reposo no tapa ninguno.
- [x] Revisión con `cam-reviewer` de la portada G1: aprobada sin hallazgos de severidad media o
      superior. Contraste medido sobre píxeles reales: todo ≥4,5:1 salvo el título de la campaña a
      1440 px (texto grande, mín. 3,31:1, cumple 3:1). Sin campaña: misma altura, sin hueco. El pie
      sí se ve; no salía en las capturas de página completa por `min-height: 100vh`. Pendiente menor:
      comentarios del carrusel que aún hablan de la «banda de portada».
- [x] Pruebas en Chrome real (Claude, 26 de octubre de 2026), con el servidor de desarrollo
      reiniciado sin caché porque servía la portada antigua:
      - Las 18 rutas responden con un H1, título, descripción y `og:title`.
      - Tab en la portada en orden lógico (salto al contenido, cabecera, hero, tarjetas, prédica, Dónde,
        WhatsApp) con foco visible; desplegables con Intro/flechas/Escape devolviendo el foco al botón.
      - Interruptor de tema funciona. Panel ☰ a 375 px: atrapa el foco, Escape lo cierra y devuelve el
        foco, bloquea y restaura el scroll, WhatsApp oculto con el panel abierto.
      - 375, 360 y 800 px sin desborde; pie visible. Enlaces de la portada abren arriba y
        «Descargar el cartel» baja a `#descargas`. Sin errores en consola.
      - Hallazgos menores: el hero mide `100vw` y desborda 8 px por la barra de scroll en escritorio
        (lo oculta el `overflow-x: hidden` del body); a 800 px la fila «Domingos» de «Cuándo» parte la
        hora en dos líneas y la tarjeta queda con mucho hueco.
      - Sin probar: lector de pantalla real y envío del formulario de contacto.
- [x] Cierre de la fase: validación de Jesús (29 de octubre de 2026)
- [x] Más presencia sin la lateral (decisión de Jesús, 26 de octubre de 2026: «sin la lateral la veo
      un poco pobre»): franja azul noche bajo la cabecera con el título y el subtítulo de cada
      página, en todas; en la portada, secciones a todo el ancho con fondos alternos (papel,
      superficie y azul noche para «Cuándo y dónde») y la foto del bautismo más grande. Mismo
      contenido de portada — `cam-frontend-dev`
- [x] Botón de WhatsApp que se pierde detrás del pie al final de la página — `cam-frontend-dev`
      Relevo: el widget vivía dentro de la portada y su `z-index` quedaba atrapado en el contexto
      de apilamiento de `Body`; ahora lo monta `Layout` (solo en `/`, `inert` con el panel móvil
      abierto) y el pie reserva sitio a la derecha. Comprobado con captura al final del scroll a
      1440 y 500 px, claro y oscuro.
      **Relevo de «Más presencia sin la lateral»:**
      - Nueva pieza `components/franja/` (`app-franja`, `titulo` + párrafo proyectado; sin
        encapsulación): franja `--ec-sidebar` a todo el ancho con filo de latón arriba (separa de la
        cabecera, que tiene el mismo azul) y filo `--ec-sidebar-edge` abajo. A todo el ancho con
        `margin-inline: calc(50% - 50vw)` dentro de `.content`. Es lo único que escribe el H1 de las
        páginas interiores (sustituye al bloque `.page-intro`, que se eliminó de `styles.scss`).
      - Caso a caso: usan franja las 12 páginas de esqueleto, Campañas, Enseñanza (la columna de
        lectura de 38 rem sigue debajo, intacta) y Conócenos. NO la usan el detalle de campaña
        (su portada con foto ya es su cabecera, con su H1) ni la 404 (diseño centrado propio).
        `.content` ya solo reserva el hueco de la cabecera arriba; el detalle añade su propio aire.
      - Portada: franja con el H1 y subtítulo de siempre; foto del bautismo a todo el ancho de la
        ventana (21:8, tope 38 rem de alto; `<picture>`, `fetchpriority="high"`, 1920×731 y
        `sizes="100vw"`); bandas `.banda` (relleno devuelve el contenido a la columna): papel
        (aviso de campaña + entradas) → `--ec-surface` («Últimas prédicas») → `--ec-sidebar`
        («Cuándo y dónde»; título en `--ec-sidebar-ink`, enlaces en `--ec-accent-fill`, tarjetas
        y mapa siguen en superficie). La última banda llega al pie (`--contenido-pb`); el pie lleva
        un filo superior fino.
      - Se eliminó el fondo fijo con la foto de archivo de la portada (`.portada-fondo`): no tiene
        sentido bajo bandas de color sólido. Quedan sin uso `--ec-veil-page` (token quitado de
        `styles.scss`; la fila sigue en la tabla de `CLAUDE.md`) y `public/fondo-*.jpg/.webp`.
      - Contraste (calculado): `--ec-sidebar-ink` sobre la franja 12,4:1 / 12,3:1 (claro/oscuro),
        el párrafo al 85 % 9,3:1 / 9,2:1, `--ec-accent-fill` 6,8:1 / 6,7:1.
      - Comprobado: `ng test` 29/29, `npm run build` OK (18 rutas, un H1 por ruta prerenderizada,
        bundle inicial 513,0 kB); capturas a 1440 y 500 px en claro y oscuro de portada,
        `/quienes-somos`, `/horarios` y, a 1440, `/ensenanza`, `/campanas/hijos-de-luz`; sin
        desbordamiento horizontal a 500 px. Las capturas se hicieron sobre el build de producción
        servido en local, porque el `npm start` del 4200 sirve el cuerpo de la portada anterior
        (módulo en caché); no lo paré.
      - Sin comprobar: `/campanas` y `/conocenos` con franja solo en prerenderizado (no capturados
        tras el cambio), ancho entre 500 y 1200 px, lector de pantalla.
      - Ajustes tras pruebas (Claude, 26-oct-2026): borradas con `git rm` `public/fondo*.png/.jpg/.webp`
        y `pattern.jpg` (y sus dos entradas en `scripts/generar-webp.mjs`); hero a `100cqw` con
        `.envoltorio` (`container-type: inline-size`) en `layout` en vez de `100vw`; filas de «Cuándo»
        en columna (día arriba, hora debajo) con `.horas` repartido en vertical. `franja` y `.banda`
        siguen con `50vw`. `ng test` 30/30, build OK.
- [~] Portada con la dirección «E · Mixta» (decisión de Jesús, 26 de octubre de 2026, entre cinco
      maquetas): portada con la foto del bautismo a todo el ancho y velo azul noche, H1, horarios y
      botones «Planifica tu visita» / «Cómo llegar» (sustituye a la franja en la portada); tarjetas
      con foto de fondo para Creencias / Enseñanza / Servir; banda azul noche «Así somos» con collage
      de 3 fotos; campaña a todo el ancho; se mantienen «Últimas prédicas» y «Cuándo y dónde» —
      `cam-frontend-dev`. Responsable IA: Claude · área frontend · modelo del agente.
- [x] Portada «E · Mixta» (decisión de Jesús tras ver cinco maquetas) — `cam-frontend-dev`
      Relevo:
      - Portada = banda con la foto del bautismo (`<picture>` WebP+JPEG, `fetchpriority="high"`,
        1920×1440 real) y velo noche en degradado (izquierda en escritorio, abajo en móvil), con
        etiqueta, H1 único, lema, tres datos y botones «Planifica tu visita» y «Cómo llegar».
        Horas, actividades y calle salen de `horarios.data.ts` (`horaActual()`, `REUNION_DOMINGO`,
        `REUNIONES`, `DIRECCION_ESTRUCTURADA.calle`); se añadió el campo `resumen` a `Reunion`
        («culto y Kids», «oración») para la forma corta. La franja de título ya no sale en `/`.
      - Componentes nuevos en `pages/body/`: `portada-hero`, `portada-descubre` (tres tarjetas con
        `<img loading="lazy" alt="">` decorativa y el enlace con texto real; la de Enseñanza usa la
        carátula de `PREDICAS_REALES[0]`, con foto de reserva si no hay), `portada-somos` (banda
        noche y collage foto1 / bautizo4 / bautizo2 con `alt` reales, lazy y `width`/`height`).
        Las utilidades `.banda`, `.banda--superficie`, `.banda--noche` pasaron a `styles.scss`.
      - Aviso de campaña: ahora banda a todo el ancho (sin radio; foto y velo a sangre; el texto
        vuelve a la columna). Sigue sin aparecer salvo campaña activa y conserva su alto reservado.
      - Ritmo de bandas (nunca dos oscuras seguidas): foto de portada (oscura) → Descubre (papel)
        → Así somos (noche) → Últimas prédicas (superficie) → campaña (foto, oscura; solo si hay
        una activa) → Cuándo y dónde (papel, como antes de la fase) → pie (noche). Sin campaña,
        prédicas (superficie) pasa a papel y se mantiene la alternancia.
      - Contraste calculado sobre un píxel blanco puro (peor caso): velo de portada ≥ 0,88 bajo el
        texto → ink ≥ 9:1 y latón ≥ 4,9:1 en claro y oscuro; velo de las tarjetas ≥ 0,85 bajo el
        texto → ink ≥ 7,6:1; títulos grandes ≥ 3:1 con margen.
      - Token `--ec-veil` quitado de `styles.scss` (ya sin uso): hay que quitar su fila de la tabla
        de `CLAUDE.md`. También sin uso: `--ec-veil-page` (ya quitado antes) y `public/fondo-*`.
      - Comprobado: `ng test`, `npm run build` (18 rutas, un H1 por ruta) y capturas a 1440, 500 y
        360 px, claro y oscuro, de la portada entera comparadas con la maqueta; a 500 y 360 px se
        ven H1, horarios y el botón principal sin scroll; sin desbordamiento horizontal. Capturas
        sobre el build de `dist/` servido en local: el 4200 volvía a servir la portada anterior.
      - Sin comprobar: sin campaña activa (se probó con la campaña de Halloween), lector de
        pantalla, anchos intermedios. La carátula de Enseñanza lleva texto quemado de YouTube que
        en móvil roza el título de la tarjeta.
      - Campaña subida bajo el hero (decisión de Jesús, 26-oct-2026): orden hero → campaña → Descubre → Así somos → prédicas → Cuándo y dónde. Filo de latón de 3 px (`::before` con `--ec-accent-fill` en `.campana-aviso`, sin tocar el host) separa hero y campaña, ambos oscuros; sin campaña el host sigue midiendo 0 y no hay filo. Comprobado: `ng test`, `npm run build`, capturas 1440/500 claro y oscuro.
      - Tarjeta «Enseñanza» de Descubre (Claude, 26-oct-2026): foto del pastor predicando (fotograma del culto del 11 oct, recorte 4:3) en `public/photos-iglesia/pastor-predicando-960.{jpg,webp}`; `portada-descubre.ts` apunta a ella. `bautizo5-960.*` sigue en uso en el carrusel de `/conocenos`. Comprobado: `ng test`, `npm run build`, capturas 1440/500 claro (cara visible sobre el título).
      - Fotos nuevas en tres tarjetas (Claude, `cam-frontend-dev`, 26-oct-2026; fotogramas del culto del 11 oct, recortes con sharp, jpg q82 + webp q80). Servir → `servir-comunion-960.{jpg,webp}` (960×720, recorte 1440×1080 desde x=260,y=0). «Así somos» → `asi-somos-960.{jpg,webp}` (960×540, recorte 1245×700 desde x=200,y=330): con velo el texto ocupa casi toda la tarjeta y la etiqueta en latón caía a 1,2:1 (con el velo que llegaba a 4,9:1 la foto apenas se veía), así que Jesús pidió foto arriba y texto debajo sobre `--ec-sidebar`, sin velo (`.tarjeta--foto`, imagen 16:9 en móvil y 5:2 desde 768 px, `alt` real, lazy, `.tarjeta__cuerpo`). Reserva «Ven como estés» → `primera-vez-960.*` (960×720, desde x=0,y=0) en escritorio, que mantiene foto de fondo con velo a la izquierda (`object-position: 85% 50%`; medido sobre píxeles reales: etiqueta ≥ 5,65:1, título ≥ 10,7:1, lema ≥ 6,76:1) y `primera-vez-movil-960.*` (960×540, recorte 1200×675 desde x=300,y=250, las dos mujeres) por debajo de 768 px vía `<source media>`: franja 16:9 arriba, texto debajo, sin velo. `fetchpriority="high"`, width/height. Tarjeta de campaña sin tocar. `bautizo1-960.*` sigue en uso en `carousel.ts`.
      - Comprobado: `ng test` (30 tests), build, capturas en `rv8` (con y sin campaña, 1440/375, claro y oscuro). La franja vacía sobre la cabecera en las capturas de página completa a 375 px es artefacto de la captura (cabecera fija); en captura de viewport no aparece. Efecto lateral: con la foto arriba, «Así somos» mide ~470 px a 1440 y la columna derecha supera a la de la prédica (hueco bajo «Todas las prédicas»). Sin comprobar: anchos intermedios, lector de pantalla.
      - Fila 3 de la portada igualada (Claude, 26-oct-2026): el hueco bajo el vídeo en «Última prédica» pasó de ~196 px a ≤ 29 px (medido a 1024/1440/1920: 18 / 29 / 29 px). Causas: la imagen de «Así somos» nunca había respetado `aspect-ratio` (la `<img>` con `height:100%` en un `<picture>` de alto automático medía su alto natural; arreglado con `overflow:hidden` en `.tarjeta--foto .tarjeta__imagen`) y ahora es 3:1 desde 768 px; el iframe del mapa de «Dónde» medía 150 px por defecto y marcaba el alto natural de la caja (ahora `position:absolute; inset:0`, caja con `min-height` 7rem desde 768 px y 11rem en móvil, igual que antes). Móvil sin cambios. Capturas en `rv9` (1440 claro/oscuro, 375 claro/oscuro).
      - Retoques de revisión: quitado `fetchpriority="high"` de la reserva (competía con la imagen LCP del hero), `width`/`height` coherentes en los `<source>` de la reserva y `@media` de `.donde__mapa` movido al final del bloque.
      - Revisión `cam-reviewer` (26-oct-2026) de fotos de Servir, «Así somos» y reserva «Ven como estés»: sin hallazgos medios ni mayores. `<source media>` móvil (webp y jpeg) antes que el webp de escritorio y el `<img>` jpg de reserva: correcto. Sin colores literales, sin imágenes huérfanas (las 5 parejas nuevas se usan; ≤ 56 kB cada una), sin CSS muerto (`.tarjeta--foto` en uso). Bajos: `fetchpriority="high"` en la reserva compite con el del hero sin ser LCP; `width/height` 960×720 en la reserva aunque la fuente móvil es 960×540 (sin CLS por `aspect-ratio`); en `body.scss` `.donde__mapa` tiene un `@media` entre declaraciones. Contraste sobre el velo de escritorio no remedido (se da por bueno el medido por el implementador).
      - «Así somos» encuadre (Claude, `cam-frontend-dev`, 29-oct-2026): `object-position: center 15%` en la `<img>` de `.tarjeta--foto` (`body.scss`) para que el recorte 3:1 desde 768 px no corte las cabezas de los músicos; móvil (16:9) sin cambio visible. Build OK; sin verificar visualmente en navegador.
- [x] Probar en navegador (escritorio y móvil, claro y oscuro, teclado) — Jesús
