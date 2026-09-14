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

Tareas:

- [ ] Recopilar con la iglesia los textos de creencias, quiénes somos y equipo pastoral — Jesús
- [ ] Páginas de La iglesia: quiénes somos, creencias, equipo pastoral — `cam-frontend-dev`
- [x] Enseñanza como archivo de prédicas desde fichero de datos, con la voz de lectura, carrusel
      de portada y ficha con reproductor en facade — `cam-frontend-dev`. El archivo de
      `/ensenanza` está montado pero vacío de contenido real: falta que la iglesia entregue
      prédicas grabadas (fecha, pasaje, predicador, resumen). Los vídeos de otras actividades
      de la iglesia (teatro, danza) ya tienen su propio sitio en `/conocenos` y ocupan de forma
      temporal el bloque de la portada mientras no haya prédicas.
- [ ] Ministerios y acción social — `cam-frontend-dev`
- [x] Rehacer la portada según la maqueta: antetítulo, titular en Cormorant, banda de imagen con
      velo y las tres tarjetas de entrada; el formulario de contacto se va a `/contacto` —
      `cam-frontend-dev` (adelantada tras cerrar la fase 1)
- [x] Bloque «Cuándo nos reunimos» en la portada (rejilla, encima de las tres entradas) y
      `/horarios` consumiendo el mismo fichero de datos (`src/app/data/horarios.data.ts`); cierre
      de portada con «Dónde estamos» (mapa + dirección + enlace a la app de mapas) —
      `cam-frontend-dev`. **Pendiente de confirmar por la iglesia:** qué actividad concreta hay
      cada día (culto, estudio bíblico...). El código solo tenía confirmado que hay reunión
      jueves y domingos a las 19:00, sin distinguir cuál es cuál; no se ha inventado la
      distinción. En cuanto la iglesia lo confirme, rellenar el campo `actividad` de cada
      `Reunion` en `horarios.data.ts` (hoy `null`) y mostrarlo en las tarjetas y en la lista de
      `/horarios`.
- [ ] Tu primera visita, galería — `cam-frontend-dev`
- [ ] Servir, donar y contacto, con el método de donación que se decida — `cam-frontend-dev`
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
- **Dependencias:** fase 2. **Estado:** pendiente.
- **Notas y riesgos:** medir antes y después para saber si el trabajo sirvió de algo.

Tareas:

- [ ] Convertir las fotos a WebP con varios tamaños y declarar dimensiones — `cam-frontend-dev`.
      La imagen de portada ya se sirve en JPEG a 1920 y 960 px (248 kB y 62 kB, frente a los 6 MB
      del PNG): falta el WebP, que aquí no hay códec para generarlo.
- [ ] Textos alternativos reales en todas las imágenes — `cam-frontend-dev`
- [ ] Vídeos de YouTube cargados al pulsar y mapa con `title` y carga diferida —
      `cam-frontend-dev`
- [ ] Foco de teclado visible y repaso de contraste en los dos modos — `cam-frontend-dev`
- [ ] Medición final en móvil — `cam-frontend-dev`
- [ ] Bajar el peso del bundle inicial: supera el presupuesto de 500 kB (revisar sobre todo la
      importación de FontAwesome) — `cam-frontend-dev`
- [ ] Revisión con `cam-reviewer` y cierre de la fase (parar y validar)
