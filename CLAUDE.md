# Iglesia El Camino — Barbate

Sitio web público de una iglesia evangélica en Barbate (Cádiz). Aplicación Angular 21 de una sola
página, sin backend, desplegada como estático. Proyecto real en producción en
[icelcamino.com](https://icelcamino.com).

Stack: Angular 21 (componentes standalone) · SCSS con tokens propios + Bootstrap 5 solo para rejilla
y formularios · FontAwesome 7 · EmailJS para el formulario de contacto · despliegue por GitHub
Actions a FTP de Hostinger.

## Contexto técnico

Reglas de arquitectura a tener presentes antes de tocar código:

- **SPA estática sin backend.** No hay servidor propio ni base de datos. El único requisito dinámico
  es el formulario de contacto, que resuelve EmailJS desde el navegador. Cualquier propuesta que
  implique un backend se consulta antes: rompe el modelo de coste y de despliegue del proyecto.
- **Componentes standalone.** Nada de NgModules. La configuración vive en `src/app/app.config.ts`
  con `provideRouter`.
- **Estructura.** `src/app/pages/` contiene las piezas que componen la estructura de la página
  (layout, navegación, pie, páginas de ruta); `src/app/components/` las reutilizables e
  independientes (carrusel, formulario, widget de WhatsApp, caja de vídeo, redes).
- **Rutas perezosas.** Los apartados se cargan con `loadComponent` para que añadir páginas no
  engorde la descarga inicial. El menú de la cabecera se genera desde la misma definición de rutas,
  no desde un array de menú aparte: si se duplica, se desincroniza (ya pasó una vez).
- **El sitio debe prerenderizarse.** Cada ruta tiene que servir HTML real con su título, descripción
  y Open Graph. Una ruta nueva sin metadatos propios está incompleta.
- **Contenido en JSON.** Prédicas, ministerios y horarios viven en ficheros de datos, no incrustados
  en plantillas, para poder actualizarlos sin tocar componentes.
- **Feedback al usuario en el DOM.** Nunca `alert`, `confirm` ni `prompt`: los avisos se muestran
  con el estilo de la aplicación y con `aria-live` donde corresponda.

## Sistema visual — dirección «Faro»

La identidad está decidida y especificada. **No se improvisan colores ni tipografías.**

- **Tokens CSS** `--ec-*` declarados en `:root` en `src/styles.scss`. Los componentes consumen
  `var(--ec-*)`; **ningún color literal se escribe suelto en un componente**.
- **Dos modos**, claro y oscuro, conmutados con `data-theme` en el elemento raíz y preferencia
  guardada; por defecto se respeta `prefers-color-scheme`. Los tokens se redefinen; las reglas de
  componente nunca se escriben dentro de un bloque de media query o de `[data-theme]`.
- **El latón es la marca y no cambia entre modos.** Hay dos tokens distintos por un motivo de
  contraste: `--ec-accent` (latón oscurecido) para texto y enlaces sobre fondo claro, y
  `--ec-accent-fill` (latón puro) para rellenos, filos y texto sobre la cabecera oscura. El latón
  puro sobre papel no llega al contraste mínimo: no usarlo como texto.
- **Navegación en cabecera** (decisión de Jesús, 26 de octubre de 2026; sustituye a la barra
  lateral). Barra azul noche (`--ec-sidebar`) fija en todas las páginas, que se compacta al hacer
  scroll: logo a la izquierda, los cuatro grupos como desplegables, «Donar» discreto y «Tu primera
  visita» como único botón en latón. El elemento activo lleva el filo de latón. En móvil: barra fija
  con logo, botón «Visítanos» y ☰ que abre el panel a pantalla completa con los cuatro grupos.
- **La cabecera cambia de mecanismo de contraste, no de papel.** En claro es un bloque oscuro sobre
  papel hueso; en oscuro es una superficie más clara que el fondo, separada por un filo de 1 px.
  Los tokens conservan el nombre `--ec-sidebar*` por historia: renombrarlos tocaría todo el sitio
  sin cambiar nada visible.
- **Tres tipografías, tres papeles:** Cormorant Garamond (titulares y cita del versículo),
  Source Serif 4 (cuerpo de artículos y enseñanza), Karla (navegación, botones, etiquetas,
  formularios). No se añade una cuarta sin consultarlo.
- **`--ec-word`** (granate) se usa **exclusivamente** para referencias bíblicas. Es un color con
  significado, no decoración.
- **La sección de enseñanza se distingue por ritmo, no por tipografías nuevas:** columna única de
  unos 65 caracteres, cuerpo mayor que el resto del sitio, reglas finas en lugar de tarjetas.

| Token | Claro | Oscuro | Papel |
|---|---|---|---|
| `--ec-ground` | `#F5F3EE` | `#0A1219` | Fondo de página |
| `--ec-surface` | `#FFFFFF` | `#101C24` | Tarjetas y formularios |
| `--ec-sidebar` | `#0B2432` | `#16242E` | Cabecera (antes barra lateral) |
| `--ec-sidebar-ink` | `#E7E2D6` | `#E7E2D6` | Texto de la cabecera |
| `--ec-ink` | `#17222B` | `#E6EDF3` | Texto principal |
| `--ec-ink-soft` | `#5A6A73` | `#97A8B2` | Texto secundario |
| `--ec-rule` | `#DDD8CD` | `#24333D` | Líneas y bordes |
| `--ec-accent` | `#806323` | `#D9B45F` | Latón para texto y enlaces — el valor anterior en claro (`#A8822E`) no llegaba a 4.5:1 sobre `--ec-ground` ni `--ec-surface`; este da 5.08:1 / 5.63:1 |
| `--ec-accent-fill` | `#C8A44D` | `#C8A44D` | Latón para rellenos y filos |
| `--ec-focus-ring` | `color-mix(in srgb, var(--ec-accent) 75%, transparent)` | ídem | Anillo de foco sobre papel (`--ec-ground`) y sobre superficie de tarjeta (`--ec-surface`); 3,14:1 / 3,35:1 en claro, 5,78:1 / 5,46:1 en oscuro |
| `--ec-focus-ring-fill` | `color-mix(in srgb, var(--ec-accent-fill) 60%, transparent)` | ídem | Anillo de foco **dentro de la cabecera** (marca, navegación, donar, botón de visita, interruptor de tema): `--ec-accent` está pensado para papel claro y ahí pierde visibilidad; 3,27:1 en claro, 3,29:1 en oscuro sobre `--ec-sidebar` |
| `--ec-sea` | `#3E7C78` | `#5FA9A4` | Acento frío, uso puntual |
| `--ec-word` | `#7A2E2E` | `#D98C86` | Solo referencias bíblicas |
| `--ec-radius-card` | `14px` | `14px` | Radio de las tarjetas de la portada |

## Arquitectura de información

La cabecera agrupa los apartados en cuatro desplegables, con «Donar» y «Tu primera visita» aparte a
la derecha:

- **La iglesia** — Inicio (`/`) · Quiénes somos (`/quienes-somos`) · Nuestras creencias
  (`/creencias`) · Equipo pastoral (`/equipo`)
- **Vida de iglesia** — Enseñanza (`/ensenanza`) · Ministerios (`/ministerios`) · Jóvenes
  (`/ministerios/jovenes`) · Kids (`/ministerios/kids`) · Acción social (`/accion-social`) ·
  Campañas (`/campanas`)
- **Conócenos** — Tu primera visita (`/primera-visita`) · Horarios y ubicación (`/horarios`) ·
  Galería y vídeos (`/conocenos`)
- **Participar** — Servir (`/servir`) · Donar (`/donar`) · Contacto (`/contacto`)

**Añadir una campaña:** una entrada nueva en `src/app/data/campanas.data.ts` y sus ficheros en
`public/descargas/<slug>/` (carteles y PDF, más los derivados de portada: `portada.jpg`,
`portada-800.jpg`, `portada.webp`, `portada-800.webp` y `og.jpg`). La ruta `campanas/:slug`, el
prerenderizado y el sitemap salen de ese array; no se toca nada más.

En móvil la misma estructura se abre en un panel a pantalla completa desde el botón ☰.

## Usar los agentes adecuados

El hilo principal orquesta, reparte y cierra; no edita código de producto directamente.

- **`cam-frontend-dev`** — todo el código del sitio: componentes, plantillas, SCSS, rutas, layout,
  accesibilidad, rendimiento, metadatos.
- **`cam-reviewer`** — revisar los cambios antes de cerrar una fase o hacer commit.
- **`cam-docs`** — documentación bajo demanda. No toca código de producto.

Al ser un proyecto de una sola área, casi todo va a `cam-frontend-dev`. Tras implementar, pásalo por
`cam-reviewer`. Antes de lanzar pruebas, pregunta a Jesús si prefiere probarlo él.

## Cómo se avanza el proyecto

El trabajo se dirige desde ficheros de la raíz:

- **`plan-implementacion.md`** — visión y orden de las fases.
- **`tareas.md`** — fases con alcance, criterios de aceptación y estado. Se ejecutan con
  **`/fase <n>`**. **Al terminar cada fase se para** para que Jesús pruebe y valide antes de seguir.
- **`fixes.md`** — log de correcciones encontradas al probar.

## Convenciones

- Textos visibles en castellano, con acentos y eñes intactos. Nunca dejar el carácter `�`.
- `let` y `const`, nunca `var`. `preventDefault` donde corresponda.
- HTML semántico y responsive por defecto. El sitio se diseña primero para móvil: es por donde entra
  la mayoría del tráfico.
- Toda imagen lleva `alt` real, `width` y `height` declarados y carga diferida fuera de la portada.
- Comentarios solo para explicar el porqué. Sin cabeceras decorativas ni código comentado.

## Claves y secretos

Las claves de EmailJS (`serviceID`, `templateID`, `publicKey`) están en el código del formulario de
contacto. Son identificadores de cliente que EmailJS expone por diseño en el bundle: no son secretos.
La protección contra abuso se configura en el panel de EmailJS restringiendo los orígenes permitidos
al dominio de producción. El despliegue necesita los secretos `FTP_SERVER`, `FTP_USERNAME` y
`FTP_PASSWORD` en el repositorio; nunca se escriben en el código.
