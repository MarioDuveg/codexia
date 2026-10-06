# JARVIS vs ULTRON — Hackathon Sonora

Sitio estático listo para publicar en GitHub Pages.

## Archivos

- `index.html` — estructura y contenido.
- `styles.css` — diseño visual.
- `script.js` — menú móvil, animaciones y aviso de prerregistro.
- `ultron-face.svg` — ilustración original del rostro robótico usada en el hero.

## Antes de publicar

Busca en `index.html` este botón:

```html
<a class="btn primary large" href="#" id="registerLink">PRERREGISTRARME <span>→</span></a>
```

Sustituye `href="#"` por la URL real de tu Google Form, Microsoft Form o sistema de prerregistro.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube los cuatro archivos del proyecto a la raíz del repositorio.
3. En GitHub abre **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/ (root)`.
6. Guarda los cambios y espera a que GitHub genere la URL pública.

No requiere Node.js, compilación ni dependencias locales.
