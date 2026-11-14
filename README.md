# Boda Anderson & Mongalo

Página web de la boda, hecha con Angular 21. Es una sola página con estas secciones:
portada, cuenta regresiva, bienvenida, "reserva la fecha", nuestra historia, itinerario,
ubicación y código de vestimenta, hospedaje, galería (con visor de fotos), preguntas
frecuentes, regalos y confirmación de asistencia (RSVP).

## Editar los datos de la boda

Todo el contenido (nombres, fecha, lugares, horarios, hoteles, preguntas, regalos, RSVP)
está en un solo archivo:

```
src/app/wedding.config.ts
```

Los datos marcados con `POR CONFIRMAR` son de ejemplo y hay que reemplazarlos.

## Fotos

Las fotos vienen de la carpeta de Google Drive **Boda Anderson-Mongalo** y están en
`public/images/`:

- `hero.jpg`: portada en computadora; `hero-movil.jpg`: portada en celular
- `catedral.jpg`, `atardecer.jpg`, `historia.jpg`: fotos de las secciones
- `gallery/NN.jpg` y `gallery/thumbs/NN.jpg`: galería (foto completa y miniatura)
- `og.jpg`: imagen que aparece al compartir el enlace (WhatsApp, Facebook…)

## Formulario RSVP

En `wedding.config.ts` → `rsvp`:

- `endpoint`: URL de un servicio que reciba las respuestas (por ejemplo Formspree o un
  Google Apps Script que guarde en una hoja de cálculo). Se envía un JSON por `POST`.
- Si `endpoint` está vacío, el formulario abre el correo del invitado con la respuesta
  lista para enviarse a `email`.

## Comandos

```bash
npm install      # instalar dependencias
npm start        # servidor local en http://localhost:4200
npm run build    # versión de producción en dist/boda-anderson-mongalo/browser
npm test         # pruebas
```

## Publicación

La página se publica sola en GitHub Pages con cada `push` a `main`, mediante `.github/workflows/deploy-pages.yml`:

https://angelgaleanomendoza.github.io/boda-mongalo-anderson/

Configuración necesaria una sola vez en GitHub: **Settings → Pages → Source: GitHub Actions**.
