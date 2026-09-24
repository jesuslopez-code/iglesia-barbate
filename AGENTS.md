# Iglesia El Camino — Orquestador Codex

Antes de trabajar, lee `CLAUDE.md`: contiene la arquitectura, el sistema visual «Faro», los agentes,
los límites operativos, las convenciones y el estado técnico, y forma parte de estas instrucciones
para Codex. Las referencias a agentes `cam-*` se ejecutan mediante los subagentes Codex equivalentes
de `.codex/agents/`.

Ante una diferencia futura entre este fichero y `CLAUDE.md`, detén la parte afectada y unifica la
regla antes de continuar.

## Sitio en producción

El sitio está publicado en [icelcamino.com](https://icelcamino.com) y se despliega por GitHub
Actions a FTP de Hostinger al integrar en la rama de publicación. Un cambio mal cerrado sale a
producción: nadie hace commit, merge, push ni despliegue sin que Jesús lo pida explícitamente.

## Agentes por área

`cam-frontend-dev` (componentes Angular, plantillas, SCSS y tokens, rutas), `cam-docs`
(documentación) y `cam-reviewer` (revisión). El hilo principal orquesta y no edita código de
producto directamente: reparte por áreas y ficheros.

Las particularidades de un apartado viven en `.claude/docs/<Apartado>/NotasAgentes.md`. Esa ruta es
la real y compartida con Claude: no la dupliques bajo `.codex/`.

No hay agente de pruebas en este proyecto: cuando algo haya que probar, pregunta a Jesús si lo
prueba él o si quiere que se monte la comprobación.

## Colaboración con Claude y SDD

- Fuentes compartidas: `plan-implementacion.md` para la dirección, `tareas.md` para fases y estado,
  `fixes.md` para correcciones, `contenido-para-la-iglesia.md` para el contenido pendiente de la
  iglesia y el código real para la implementación.
- Antes de implementar, marca la tarea `[~]` y registra responsable IA, agente/área y modelo.
- Una tarea tiene un único propietario. Si cruza contenido y frontend, divídela por áreas y ficheros.
- Al pausar o cerrar, deja un relevo en `tareas.md` con cambios/ficheros, comprobaciones, decisiones
  y pendientes. El siguiente asistente revisa primero ese relevo y el diff.
- Para cambios con riesgo, prefiere revisión cruzada: revisa el asistente que no implementó.
- Al cerrar una fase, detente para que Jesús pruebe y valide antes de avanzar.
- `CLAUDE.md` cita `/fase <n>`: es un comando de Claude (`.claude/commands/`) y Codex no lo tiene.
  Haz lo equivalente leyendo la fase en `tareas.md` y ajustándote a su alcance y criterios de
  aceptación.

## Modelos recomendados

- Inventario, formato o tareas mecánicas: Codex Luna / Claude Haiku.
- Implementación habitual de Angular, contenido y documentación: Codex Terra / Claude Sonnet.
- Diagnóstico difícil, cambio transversal o revisión profunda: Codex Sol / Claude Sonnet u Opus.
- Arquitectura crítica, despliegue o migración difícil de revertir: Codex Astra / Claude Opus.

Registra en `tareas.md` el modelo elegido y la razón si se eleva a Sol/Astra u Opus.
