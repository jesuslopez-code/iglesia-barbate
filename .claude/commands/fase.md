Ejecuta una fase del plan del proyecto.

Fase a ejecutar (número o nombre): $ARGUMENTS

Pasos:

1. Lee `plan-implementacion.md`, `tareas.md` y `CLAUDE.md` de la raíz. Localiza la fase indicada. Si
   no está definida o es ambigua, **pregunta** antes de actuar.
2. Reparte las tareas de la fase en `cam-frontend-dev`. Al ser un proyecto de una sola área, casi
   todo va ahí; el hilo principal no edita código de producto directamente.
3. Marca el estado en `tareas.md`: `[~]` al empezar cada tarea, `[x]` al cerrarla.
4. Cierra la fase con una revisión de `cam-reviewer`. Antes de lanzar pruebas, **pregunta** a Jesús
   si prefiere probarlo él.
5. **PARA al terminar la fase** y resume qué quedó hecho, qué comprobaste y cómo probarlo, para que
   lo valide antes de seguir. No hagas commit sin pedirlo.
