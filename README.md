# jnarvaez.dev

Mi portfolio personal construido con [Astro](https://astro.build).

🌐 **Live:** [https://juannarvaez.dev](https://juannarvaez.dev)

## 🚀 Tecnologías

- **Framework:** Astro 5.x
- **Lenguaje:** TypeScript
- **Estilos:** CSS personalizado (sin frameworks CSS)
- **i18n:** Soporte multilingüe (Inglés/Español)
- **Features:**
  - Modo oscuro/claro con persistencia
  - Transiciones de vista (View Transitions)
  - Animaciones de partículas interactivas
  - Typewriter effect en el hero
  - Spotlight hover effect en tarjetas de proyectos
  - Blog con soporte Markdown
  - Sitemap XML generado automáticamente

## 📁 Estructura del Proyecto

```
/
├── public/              # Archivos estáticos
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/      # Componentes Astro
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── ProjectCard.astro
│   │   ├── ExperienceCard.astro
│   │   ├── PostCard.astro
│   │   ├── ThemeToggle.astro
│   │   ├── LanguageToggle.astro
│   │   ├── Particles.astro
│   │   └── HeroTypewriter.astro
│   ├── content/         # Contenido del blog (Markdown)
│   │   └── blog/
│   ├── data/            # Datos estáticos
│   │   └── projects.ts
│   ├── i18n/            # Traducciones
│   │   └── translations.ts
│   ├── layouts/         # Layouts
│   │   ├── BaseLayout.astro
│   │   └── PostLayout.astro
│   ├── lib/             # Utilidades
│   │   └── icons.ts
│   ├── pages/           # Rutas
│   │   ├── index.astro          # Home (EN)
│   │   ├── es/                  # Versión en español
│   │   ├── projects/
│   │   └── posts/
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 📝 Scripts

| Comando           | Acción                                           |
| :---------------- | :----------------------------------------------- |
| `npm install`     | Instala dependencias                             |
| `npm run dev`     | Inicia servidor local en `localhost:4321`        |
| `npm run build`   | Construye el sitio para producción (`./dist/`)   |
| `npm run preview` | Previsualiza el build localmente                 |

## 🎨 Características de Diseño

- **Minimalista:** Interfaz limpia sin distracciones
- **Tipografía:** Plus Jakarta Sans
- **Paleta de colores:** Modo claro/oscuro con transiciones suaves
- **Responsive:** Adaptado para todos los dispositivos
- **Accesibilidad:** Skip links, focus visible, contraste adecuado

## 🌍 Internacionalización (i18n)

El sitio soporta dos idiomas:
- 🇺🇸 Inglés (default) - `/`
- 🇪🇸 Español - `/es`

Las traducciones se encuentran en `src/i18n/translations.ts`.

## 📝 Blog

Los posts se escriben en Markdown y se almacenan en `src/content/blog/`.

Frontmatter soportado:
```yaml
---
title: "Título del post"
description: "Descripción breve"
date: 2026-01-15
tags: ["Tag1", "Tag2"]
lang: en        # 'en' o 'es'
draft: false    # true para ocultar el post
---
```

## 📄 Licencia

MIT - Libre para usar y modificar.

---

Desarrollado con ❤️ por [Juan Narvaez](https://juannarvaez.dev)
