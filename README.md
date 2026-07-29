# puente /i

Blog técnico sobre modernización de IBMi/AS400, arquitectura cloud aplicada a sistemas
empresariales, e IA aplicada al desarrollo de software.

## Stack

- Next.js 16 (App Router) + TypeScript, compilado como export estático (`output: 'export'`)
- Tailwind CSS v4
- Contenido en MDX (`content/posts/*.mdx`), leído en build time con `gray-matter`
- Diagramas en Excalidraw (`public/diagrams/*.excalidraw` como fuente + PNG rendereado)
- Tipografías: Fraunces (display), Source Serif 4 (cuerpo), JetBrains Mono (metadatos/código)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:3000

En dev también existe `/hero-lab` con variantes tipográficas del hero para iterar (V1–V6 y V4a/b/c). Se excluye del build de producción.

## Estructura

```
app/
  page.tsx              → home (hero + pilares + últimos posts)
  [pillar]/page.tsx      → archivo por pilar (/ibmi, /cloud, /ia)
  blog/[slug]/page.tsx   → post individual (renderiza el MDX)
  hero-lab/page.tsx      → banco de pruebas del hero (solo dev)
components/
  Header.tsx, Footer.tsx, PostCard.tsx
  PillarNav.tsx          → nav con resaltado del pilar activo (usePathname)
  BridgeLine.tsx         → línea puente reutilizable (home + pilar)
  Figure.tsx             → componente MDX para diagramas con caption
content/
  posts/*.mdx            → un archivo por post
public/
  illustrations/*.svg    → íconos de pilares y hero
  diagrams/              → fuentes .excalidraw + PNG rendereados
lib/
  config.ts               → nombre del sitio y definición de los 3 pilares
  posts.ts                 → lee content/posts, parsea frontmatter, expone getAllPosts/getPostBySlug
  format.ts                → formateo de fechas en español
```

## Cómo agregar un post nuevo

Crea un archivo `content/posts/mi-slug-descriptivo.mdx` con este frontmatter:

```md
---
title: "Título del post"
excerpt: "Una o dos frases para la tarjeta de listado y el <meta description>."
date: "2026-07-10"
pillar: "ibmi"   # ibmi | cloud | ia
draft: false
---

Contenido en Markdown normal a partir de aquí.
```

Con `draft: true` el post no aparece en producción (sí se ve en `npm run dev`), así que
sirve como estado intermedio antes de aprobarlo para publicar.

El slug del post es el nombre del archivo sin `.mdx` — usa minúsculas y guiones, sin tildes.

### Incluir un diagrama

Rendereá el `.excalidraw` a PNG y guardalos ambos en `public/diagrams/`. En el MDX:

```mdx
<Figure
  src="/diagrams/mi-diagrama.png"
  alt="Descripción textual completa del diagrama para lectores de pantalla."
>
  Pie de figura corto: leyenda de colores, contexto.
</Figure>
```

## Git

- Rama `main`: producción. Cada push a `main` dispara un build en Cloudflare Pages.
- Ramas `feat/*` para cambios grandes que no se quieren publicar de inmediato (ej. `feat/dark-magazine`).
- Mensajes de commit en español, formato `tipo: descripción breve` — tipos usados en el historial: `content` (posts, copy del sitio) y `feat` (funcionalidad nueva). Cambios puntuales de diseño/ajustes van sin prefijo.
- No hay revisión por PR en este repo: los posts nuevos se commitean y pushean directo a `main` una vez que el frontmatter es válido (`draft: false`).

## Despliegues e integración continua

Cloudflare Pages, conectado directo al repo de GitHub. No hay workflows de GitHub Actions
en `.github/` — el build corre del lado de Cloudflare en cada push a `main`, sirviendo el
sitio como estático puro (`out/` generado por `next build`).

- Build command: `npm run build`
- Output directory: `out`
- Node version: 20+
- El script `build` elimina `out/hero-lab/` antes de publicar, así que esa ruta de pruebas
  nunca llega a producción aunque exista en el árbol de `app/`.
- No hay ambiente de staging separado; para previsualizar cambios antes de pushear, correr
  `npm run dev` en local.

## Covers de posts

Cada post tiene una imagen de portada declarada en su frontmatter (`cover: "/covers/<slug>.jpg"`).
Las imágenes se refrescan con:

```bash
node scripts/fetch-covers.mjs
```

Baja una imagen por query desde Openverse (CC, sin API key) a `public/covers/<slug>.jpg`
y regenera `public/covers/CREDITS.md` con la atribución de cada foto. Para cambiar la temática
de un cover, editá la `query` de ese slug en el script y volvelo a correr — o simplemente
reemplazá el `.jpg` a mano con lo que quieras (mismo nombre, cualquier proporción).
