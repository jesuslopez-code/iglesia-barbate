# Plan de implementación — Iglesia El Camino

> Visión y plan por **fases** del rediseño. Es la fuente de «hacia dónde vamos». El detalle de
> arquitectura y el sistema visual viven en `CLAUDE.md`; aquí va el **orden** en que se construye. El
> estado y las tareas de cada fase están en `tareas.md`.

## Objetivo

Convertir el sitio actual —una única pantalla sin navegación, invisible para los buscadores— en la
web completa de la iglesia: barra lateral con todos los apartados, contenido que responde a lo que
pregunta quien llega, identidad visual propia en modo claro y oscuro, y páginas que Google pueda
indexar. Terminado significa que alguien que busca «iglesia evangélica Barbate» encuentra el sitio,
entiende a qué hora puede ir y qué se va a encontrar, y puede contactar o colaborar sin salir de la
web.

## Punto de partida

El sitio funciona y lo que hay se conserva: sin backend, EmailJS para el contacto, widget de
WhatsApp, componentes standalone y despliegue por FTP desde GitHub Actions. Los problemas son
estructurales, no de gusto:

- La barra de navegación existe pero está comentada en `app.html`, y su menú apunta a rutas que no
  existen en el enrutador. No hay forma de navegar.
- El servidor entrega un HTML de 5 KB con un `app-root` vacío: sin prerenderizado, sin descripción,
  sin Open Graph, sin `robots.txt` ni `sitemap.xml` (ambos devuelven 404) y sin datos estructurados.
- Faltan todos los contenidos salvo portada, carrusel y dos vídeos.
- Titulares con tamaño fijo en píxeles que desbordan en móvil, que es por donde entra casi todo el
  tráfico.
- Imágenes sin optimizar y con `alt` de relleno.
- Tres paletas conviviendo y `color: white` global sobre imagen de fondo.

## Arquitectura (resumen)

Aplicación Angular 21 estática, componentes standalone, rutas perezosas, SCSS con tokens propios y
Bootstrap 5 solo para rejilla y formularios. Sin backend ni base de datos: el formulario de contacto
se resuelve con EmailJS desde el navegador. Detalle completo en `CLAUDE.md`.

## Dirección visual

Decidida: **«Faro»** — barra lateral azul noche sobre papel hueso, acento de latón, Cormorant
Garamond para titulares, Source Serif 4 para lectura y Karla para interfaz. Con modo oscuro propio
(fondo profundo, lateral que pasa a contrastar por elevación, latón conservado como acento) y una
voz de lectura específica para la sección de enseñanza. Tokens y reglas en `CLAUDE.md`.

## Fases

| # | Fase | Objetivo | Estado |
|---|------|----------|--------|
| 0 | Sistema y esqueleto | Tokens en dos modos, tipografías, servicio de tema y layout con barra lateral funcionando | hecho |
| 1 | Navegación real | Todas las rutas navegables con páginas mínimas y ruta 404 | hecho |
| 2 | Contenido | Los apartados con sus textos, fotos y datos definitivos | pendiente |
| 3 | Que os encuentren | Prerenderizado, metadatos por ruta, Open Graph, datos estructurados, `robots.txt` y `sitemap.xml` | hecho, a validar en producción |
| 4 | Velocidad y accesibilidad | Imágenes optimizadas, carga diferida, foco de teclado y contraste verificados | en curso |

Al terminar cada fase se **para** para que Jesús pruebe y valide antes de seguir.

## Decisiones y convenciones clave

- **Sin backend, y no se negocia sin consultarlo.** Es lo que mantiene el proyecto barato y sin
  mantenimiento. Cualquier necesidad dinámica se resuelve con servicios externos desde el cliente.
- **Un único juego de tokens.** El rediseño no sirve de nada si los colores vuelven a escribirse
  sueltos en cada componente: fue precisamente lo que produjo las tres identidades del sitio actual.
- **El latón no cambia entre modos.** Es el ancla de marca. Cambiar el acento al conmutar el tema
  haría que pareciesen dos webs distintas.
- **La navegación se genera de la definición de rutas.** Dos listas separadas ya se desincronizaron
  una vez.
- **Ninguna foto va de fondo de página.** La imagen entra en banda, con un velo degradado que termina
  en el color de papel del modo activo, de forma que el texto se apoye siempre en un tono conocido.
  El fondo a sangre de `fondo.png` es justo lo que obligaba al `color: white` global que dejaba
  ilegible cualquier sección clara, y en modo oscuro el titular casi blanco desaparecería sobre el
  humo iluminado de la foto.
- **Móvil primero.** Es por donde entra la mayoría del tráfico.

## Riesgos y decisiones abiertas

- **Logo.** `logo.jpg` tiene fondo blanco y en modo oscuro se verá como un recuadro pegado. Hace
  falta una versión en SVG o PNG con transparencia. Sin eso, la fase 0 queda a medias.
- **Contenido.** Las fases 0, 1, 3 y 4 son técnicas y las puede hacer el equipo. La fase 2 dependía
  de que la iglesia facilitase los textos: el 3 de octubre de 2026 entregó la propuesta completa
  (`D:\Iglesia Barbate\Propuesta Web - Iglesia Evangelica El Camino Barbate.docx`, fuera del
  repositorio) con texto definitivo para los once apartados. El cuello de botella pasa a ser las
  **fotos**: la propuesta pide congregación reunida, una foto histórica de los inicios, retrato del
  pastor e imágenes de Kids, Jóvenes y El Refugio, y no adjunta ninguna.
- **Donaciones.** Decidido: Bizum, transferencia bancaria y efectivo en los cultos. Se descarta la
  pasarela externa. Faltan el número o código de Bizum, el IBAN y el titular, y que la iglesia
  decida si emite certificados de donación.
- **Fotografía.** La dirección elegida tolera fotos discretas, pero la portada y la galería ganarían
  mucho con una sesión decente. Decidir si se hace antes de cerrar la fase 2.
- **Redes sociales.** La propuesta cita Facebook (con directo del culto dominical), YouTube,
  Instagram, TikTok y Spotify, pero sin enlaces. Sin las URL no se pueden poner los iconos ni el
  enlace a Spotify de cada prédica.
- **Avisos de Jóvenes.** La propuesta dice que las reuniones de Gedeones «se anuncian en esta web»,
  pero el plan no tiene sección de avisos. Decidir si se añade un bloque de avisos en datos o si se
  cambia la frase para remitir a redes.
- **Archivo de prédicas.** La propuesta pide buscador y filtros por serie, predicador y fecha. Con dos
  prédicas no aportan: se añade ya el campo `serie` al modelo y los filtros se construyen cuando el
  archivo pase de unas diez.
- **Acción social.** El Refugio (ACAF, en colaboración con Tharsis Betel) es un proyecto en
  recaudación de fondos con contenido propio. Pide más espacio que un párrafo y una llamada a
  colaborar enlazada con Donar.
