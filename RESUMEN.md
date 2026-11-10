# Resumen del proyecto: Boda Mongalo-Anderson

Pega este archivo al inicio de una conversación nueva para continuar donde quedamos.

## Qué es

Página web de boda de una sola página, en español, hecha con **Angular 21** (componentes
standalone, signals, sin zone.js, sin SSR). Diseño inspirado en dos referencias:

- Portada con la foto de los novios frente a la iglesia (`catedral.jpg`), los nombres
  "JUSTIN & MELANIE" y las dos fechas ("US Wedding 02/27/2027" y "NIC Wedding 27/11/2027").
- Debajo, **dos cuentas regresivas**: US Wedding (Texas) y NIC Wedding (Nicaragua).
- Una sección verde "Reserva la fecha" con los nombres en cursiva, las dos fechas y el botón "Confirma antes del…".

Tipografías (Google Fonts): Cormorant Garamond (títulos), Pinyon Script (cursiva), Great Vibes
("Wedding" en los títulos de cada boda), Montserrat (texto). Paleta (la novia pidió "no negro, más verde,
verde crema ivory"): blanco, marfil, crema `#ece4d2`, verde oliva profundo `#3f4b35` para los fondos
oscuros, oliva `#5c6b4a` en botones, dorado `#b08d57` / `#c9a76a`.

Fechas: la de EE. UU. se escribe MM/DD/AAAA (02/27/2027) y la de Nicaragua DD/MM/AAAA (27/11/2027).

## Repositorio

- GitHub: `AngelGaleanoMendoza/boda-mongalo-anderson` (antes AngularExamples).
- Rama de trabajo y principal: **`main`**. `dev` tiene el proyecto viejo de Angular Examples.
- Publicada en **https://angelgaleanomendoza.github.io/boda-mongalo-anderson/** (se actualiza sola en cada push a main).
- También existe `claude/affectionate-ritchie-71zmtw`, con el mismo contenido que `main`.

## Estructura

```
src/app/wedding.config.ts   <- TODOS los datos de la boda (editar aquí)
src/app/app.ts / app.html   <- arma la página con las secciones en orden
src/app/sections/*          <- una carpeta por sección (ts + html + css):
  navbar, hero, countdown, welcome, save-the-date, story, schedule,
  venues (ubicación + código de vestimenta),
  gallery (cuadrícula + visor con flechas/Esc), gifts, rsvp, footer
src/app/shared/             <- reveal.directive (aparecer al hacer scroll),
                               format.ts (fechas: MM/DD/AAAA para EE. UU., DD/MM/AAAA para Nicaragua), icon.ts
src/styles.css              <- variables de color/tipografía, botones, utilidades
public/images/              <- fotos (de la carpeta de Drive "Boda Anderson-Mongalo")
  catedral.jpg (portada), hero.jpg (bienvenida), hero-movil.jpg (sin usar), atardecer.jpg, historia.jpg, og.jpg (imagen al compartir),
  gallery/01-24.jpg + gallery/thumbs/01-24.jpg
.github/workflows/deploy-pages.yml  <- publica en GitHub Pages en cada push a main
scripts/configurar.ps1 / .sh        <- configuración en la computadora local (ver abajo)
```

## Pendiente

### Configuración de GitHub: hecha (rama principal main, repo renombrado, Pages con GitHub Actions).

### Datos reales que faltan (en `src/app/wedding.config.ts`, marcados `POR CONFIRMAR`)

- Hora de cada boda: las dos están a las 4:00 p. m. de ejemplo (las fechas sí son reales:
  27 feb 2027 en Texas y 27 nov 2027 en Nicaragua).
- Fecha límite del RSVP: hoy es 27 de enero de 2027, inventada.
- Lugar y dirección de la ceremonia y de la recepción, con enlace de Google Maps.
- Horarios del itinerario (son de ejemplo).
- Texto de "Nuestra historia" (es de ejemplo).
- Datos para regalos (transferencia bancaria / mesa de regalos).
- RSVP: `rsvp.email` es `correo@ejemplo.com`; `rsvp.endpoint` está vacío.

### Formulario RSVP

Sin `endpoint`, el formulario muestra la respuesta lista para copiar y un botón que abre el
correo del invitado. Falta conectarlo a algo que guarde las respuestas, por ejemplo un Google
Apps Script que escriba en una hoja de cálculo, o Formspree. El componente ya hace `POST` JSON a
`rsvp.endpoint` con: `nombre, contacto, asistira, personas, alimentacion, mensaje`.

## Comandos

```bash
npm ci                              # instalar (usa el package-lock)
npm start                           # http://localhost:4200
npx ng test --watch=false           # 3 pruebas (Vitest)
npx ng build --base-href ./         # versión para publicar -> dist/boda-anderson-mongalo/browser
```

## Notas técnicas

- `--base-href ./` hace que la página funcione en cualquier subcarpeta (GitHub Pages).
- Las fechas se muestran siempre en hora de Nicaragua (`WEDDING.timeZone`).
- La galería asume 12 fotos verticales + 12 horizontales para llenar la cuadrícula de 4 columnas
  sin huecos. Si se cambian fotos, actualizar el set `portrait` en `wedding.config.ts`.
- Con npm 10 en una instalación nueva **sin** lockfile, `npm install` puede fallar con
  "Cannot read properties of null (reading 'edgesOut')"; con lockfile (`npm ci`) funciona.
- Hubo una vista previa privada en claude.ai (https://claude.ai/artifact/8huC8gAzqd7wr23Ndi3aLN)
  que no se actualiza sola con los cambios del repositorio.

## Carrusel y música (agregado después)

- **Carrusel en "Nuestra historia"** (`sections/story`): tira de fotos que se desliza sola,
  con el monograma de las iniciales encima. Las fotos y cuáles van en blanco y negro se
  eligen en `WEDDING.story.carousel` (números de `images/gallery/NN.jpg`).
- **Canción de fondo** (`sections/music`): al entrar aparece una portada con
  "Abrir invitación". Ese toque arranca la canción, porque los navegadores no dejan sonar
  una página sin que la persona toque algo. Luego queda un botón flotante para pausar o
  reanudar. Usa el reproductor oficial de Spotify (`WEDDING.music.spotifyTrackId`):
  - Con sesión de Spotify en el navegador se escucha completa.
  - Sin sesión, Spotify solo da 30 segundos de vista previa, que se repiten.
  - Si el navegador bloquea el arranque, se abre el reproductor para tocar ▶ ahí.
