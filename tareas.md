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
