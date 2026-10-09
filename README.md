# CODEXIA — Landing page

Sitio estático responsive para el hackathon CODEXIA con preregistro conectado a Supabase.

## Archivos

- `index.html`: estructura, contenido y formulario de preregistro.
- `styles.css`: diseño visual responsive.
- `script.js`: menú móvil, animaciones, navegación y envío del preregistro a Supabase.
- `assets/cyborg-rojo.webp`: imagen principal del hero.
- `assets/amazon-500.webp`: imagen de la tarjeta Amazon usada en la sección de premio.

## Premio y sede

- Premio mostrado: tarjetas de regalo Amazon.com.mx de **$2000 MXN para cada integrante del equipo ganador**.
- Sede: **Tecnológico de Monterrey, Campus Sonora Norte**.
- Dirección: **Blvr. Enrique Mazón López 965, C.P. 83000, Hermosillo, Sonora, México**.

## Preregistro

El formulario guarda los datos en la tabla `public.preregistros` de Supabase mediante la REST Data API.

Campos enviados:

- `nombre`
- `edad`
- `email`
- `telefono`
- `preparatoria`
- `semestre`
- `tiene_laptop`
- `areas_interes`
- `experiencia_programando`

La clave incluida en `script.js` es una **Publishable key** de Supabase, diseñada para usarse en aplicaciones públicas del navegador. La seguridad depende de mantener Row Level Security (RLS) y los permisos de la tabla correctamente configurados.

Nunca agregues una `sb_secret_...`, `service_role` ni la contraseña de PostgreSQL al código del sitio.

## Uso

Abre `index.html` directamente para revisar la interfaz o publica la carpeta completa como sitio estático en Render.

Para producción, asegúrate de que:

1. La tabla `public.preregistros` exista.
2. RLS esté habilitado.
3. El rol público solo tenga permiso de `INSERT` en los campos del formulario.
4. No exista una política pública de `SELECT`, `UPDATE` o `DELETE`.

## Actualización de sede e itinerario
- Entrada gratuita.
- Sede base: Tecnológico de Monterrey, Campus Sonora Norte — Sala de Usos Múltiples (SUM).
- Se agregó el itinerario completo del evento de 08:00 a 13:30.
