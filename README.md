# Iglesia El Camino — Barbate

Sitio web público de la Iglesia El Camino (Barbate, Cádiz). Proyecto real en producción, desarrollado de forma altruista para la comunidad.

## El problema

La congregación no tenía presencia web propia: la información de horarios, ubicación y actividades circulaba solo por redes sociales y WhatsApp, donde se pierde y no es consultable por alguien que llega de fuera. Necesitaban un sitio que funcionara como punto de entrada estable, que se viera bien en el móvil —por donde entra la mayoría del tráfico— y que permitiera contactar sin exponer números personales.

## Solución

Aplicación Angular de una sola página con navegación por rutas, pensada para consumo mayoritariamente móvil:

- **Carrusel** de imágenes de la comunidad en la portada
- **Sección "Conócenos"** con la información de la iglesia en ruta propia (`/know`)
- **Formulario de contacto** que envía correo directamente desde el navegador vía EmailJS, sin necesidad de backend ni servidor de correo propio
- **Widget de WhatsApp** flotante para contacto inmediato
- **Enlaces a redes** (Facebook, Instagram, TikTok, YouTube) y reproductor de vídeo integrado
- **Ubicación** enlazada a Google Maps

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Angular 21 (componentes standalone) |
| Estilos | Bootstrap 5 + SCSS |
| Iconografía | FontAwesome 7 |
| Correo | EmailJS (`@emailjs/browser`) |
| Despliegue | GitHub Actions → FTP a Hostinger |

## Decisiones técnicas

**Sin backend.** El único requisito dinámico era el formulario de contacto. Montar un servidor solo para eso habría añadido un coste recurrente y un punto de fallo a un proyecto sin presupuesto ni mantenimiento previsto. EmailJS resuelve el envío desde el cliente, y el sitio queda como estático puro: barato de alojar y sin superficie de ataque de servidor.

**Componentes standalone en lugar de NgModules.** Es el enfoque por defecto desde Angular 17 y evita el boilerplate de módulos en un proyecto de esta escala. La configuración vive en un único `app.config.ts` con `provideRouter`.

**Separación `pages/` y `components/`.** `pages/` contiene las piezas que componen la estructura de la página (navbar, header, body, footer, know); `components/` las reutilizables e independientes (carrusel, formulario, widget de WhatsApp, caja de vídeo, redes). Facilita saber dónde tocar sin abrir todo el árbol.

**Despliegue por FTP.** Hostinger, el alojamiento que ya tenía la comunidad, no ofrece integración con Git. El workflow de GitHub Actions compila y sube `dist/` por FTP en cada push, de modo que actualizar el sitio no requiere que nadie toque un cliente FTP a mano. Las credenciales van en *secrets* del repositorio.

## Ejecutar en local

```bash
npm ci
npm start          # http://localhost:4200
```

Otros comandos:

```bash
npm run build      # compila a dist/iglesia-barbate/browser/
npm test           # tests unitarios con Karma
```

## Configuración

Las claves de EmailJS (`serviceID`, `templateID`, `publicKey`) están en `src/app/components/form-contact/form-contact.ts`. Son identificadores de cliente: EmailJS los expone por diseño en el bundle del navegador, así que no son secretos. La protección contra abuso se configura en el panel de EmailJS restringiendo los orígenes permitidos al dominio de producción.

El despliegue necesita tres *secrets* en el repositorio: `FTP_SERVER`, `FTP_USERNAME` y `FTP_PASSWORD`.

## Estructura

```
src/app/
├── app.ts · app.config.ts · app.routes.ts
├── pages/          navbar · header · body · know · footer
└── components/     carousel · form-contact · networks · video-box · whatsapp-widget
```
