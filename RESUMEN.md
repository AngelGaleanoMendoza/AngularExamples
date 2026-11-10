# Resumen del proyecto: Boda Mongalo-Anderson

Pega este archivo al inicio de una conversación nueva para continuar donde quedamos.

## Qué es

Página web de boda de una sola página, en español, hecha con **Angular 21** (componentes
standalone, signals, sin zone.js, sin SSR). Diseño inspirado en dos referencias:

- Portada con la foto de los novios y los nombres en mayúsculas con un "&" en letra cursiva,
  y debajo una cuenta regresiva con botón de RSVP.
- Una sección negra con los nombres en cursiva, líneas doradas, fecha y botón "Confirma antes del…".

Tipografías (Google Fonts): Cormorant Garamond (títulos), Pinyon Script (cursiva), Montserrat
(texto). Paleta: blanco, marfil, negro cálido `#121110`, dorado `#b08d57` / `#c9a76a`, oliva `#5c6b4a`.

## Repositorio

- GitHub: `AngelGaleanoMendoza/AngularExamples`, que se va a renombrar a `boda-mongalo-anderson`.
- Rama de trabajo: **`main`**. Hay que ponerla como rama principal en GitHub, porque hoy
  la principal sigue siendo `dev`, que todavía tiene el proyecto viejo de Angular Examples.
- También existe `claude/affectionate-ritchie-71zmtw`, con el mismo contenido que `main`.

## Estructura

```
src/app/wedding.config.ts   <- TODOS los datos de la boda (editar aquí)
src/app/app.ts / app.html   <- arma la página con las secciones en orden
src/app/sections/*          <- una carpeta por sección (ts + html + css):
  navbar, hero, countdown, welcome, save-the-date, story, schedule,
  venues (ubicación + código de vestimenta), stay (hospedaje),
  gallery (cuadrícula + visor con flechas/Esc), faq, gifts, rsvp, footer
src/app/shared/             <- reveal.directive (aparecer al hacer scroll),
                               format.ts (fechas en es-NI, zona America/Managua), icon.ts
src/styles.css              <- variables de color/tipografía, botones, utilidades
public/images/              <- fotos (de la carpeta de Drive "Boda Anderson-Mongalo")
  hero.jpg (portada en computadora), hero-movil.jpg (portada en celular),
  catedral.jpg, atardecer.jpg, historia.jpg, og.jpg (imagen al compartir),
  gallery/01-24.jpg + gallery/thumbs/01-24.jpg
.github/workflows/deploy-pages.yml  <- publica en GitHub Pages en cada push a main
scripts/configurar.ps1 / .sh        <- configuración en la computadora local (ver abajo)
```

## Pendiente

### Configuración de GitHub (no se pudo hacer desde la nube)

Lo hace el script `scripts/configurar.ps1` (Windows) o `scripts/configurar.sh` (Mac/Linux)
si se tiene GitHub CLI con sesión iniciada (`gh auth login`). Si no, a mano:

1. Settings → Branches → Default branch: **main**
2. Settings → General → Repository name: **boda-mongalo-anderson**
3. Settings → Pages → Source: **GitHub Actions**
4. Volver a correr el workflow "Publicar página de la boda" (pestaña Actions).

La página quedará en **https://angelgaleanomendoza.github.io/boda-mongalo-anderson/**
(la etiqueta `og:image` en `src/index.html` ya apunta a esa dirección).

### Datos reales que faltan (en `src/app/wedding.config.ts`, marcados `POR CONFIRMAR`)

- Nombres de pila de los novios: hoy la portada dice "Anderson & Mongalo"
  (apellidos tomados del nombre de la carpeta de Drive). También `initials`.
- Fecha y hora de la boda: hoy es **17 de abril de 2027, 4:00 p. m.**, inventada.
- Fecha límite del RSVP: hoy es 17 de marzo de 2027, inventada.
- Lugar y dirección de la ceremonia y de la recepción, con enlace de Google Maps.
- Horarios del itinerario (son de ejemplo).
- Hoteles recomendados (3 de ejemplo) y sus enlaces.
- Texto de "Nuestra historia" (es de ejemplo).
- Datos para regalos (transferencia bancaria / mesa de regalos).
- Preguntas frecuentes: revisar que las respuestas sean correctas (niños, acompañantes, etc.).
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
