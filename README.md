# app-dna.github.io

The appDNA website, served by GitHub Pages at **https://appdna.de** (see `CNAME`).

Push to `main` and GitHub Pages publishes it. The home page is plain HTML, CSS and JavaScript. The legal pages are written in Markdown and turned into pages by GitHub Pages' built-in Jekyll; there is nothing to install.

## Structure

| Path | What it is |
| --- | --- |
| `index.html` | Home page: hero, principles, apps, about, contact |
| `apps/` | One JSON file per app, plus `index.json` with the display order |
| `legal/<group>/*.md` | Imprint, privacy policies and terms, one Markdown file each |
| `_layouts/default.html` | Page template for everything in `legal/` |
| `_config.yml` | Jekyll settings, including display names for the `legal/` folders |
| `assets/` | CSS (`tokens.css`, `site.css`), JavaScript and logo SVGs |
| `date-privacy-policy/`, `impress/`, … | Redirects from the old Wix URLs, so links in store listings keep working |
| `404.html` | Not-found page |

## Add or change a legal page

Upload a Markdown file to a folder in `legal/`:

```markdown
# Privacy Policy

*Last updated: 1 November 2026*

## Overview

Text…
```

- The first `# Heading` becomes the page title. Use `##` for sections.
- The file `legal/kinetic/privacy-policy.md` is published at `https://appdna.de/legal/kinetic/privacy-policy/`.
- Every page shows up in the legal menu automatically, grouped by folder and sorted by file name.
- New folder? Add its display name under `legal_groups` in `_config.yml` (for example `kinetic: Kinetic`). Without it, the folder name is shown.
- For a page in German, add front matter at the very top:

  ```markdown
  ---
  lang: de
  ---
  ```

Use the page URL as the privacy policy URL in the Play Store and App Store.

## Add an app

1. Create `apps/<app>.json`:

   ```json
   {
     "name": "Kinetic",
     "subtitle": "Short tagline",
     "description": "One or two sentences about the problem the app solves.",
     "icon": "calendar",
     "tile": "indigo",
     "tags": ["Android", "iOS"],
     "link": { "label": "Get it on Google Play", "url": "https://play.google.com/store/apps/details?id=…" },
     "note": "Optional small print",
     "legal": [
       { "label": "Privacy Policy", "url": "legal/kinetic/privacy-policy/" },
       { "label": "Terms of Use", "url": "legal/kinetic/terms-of-use/" }
     ]
   }
   ```

   - `icon`: `calendar` or `gauge`; anything else shows the app's first letter.
   - `tile`: `indigo`, `mint` or `ink`.
   - `link`, `note` and `legal` are optional.

2. Add the file name to `apps/index.json`. The order there is the order on the page.

## Before going live

- Replace every `[placeholder]` in `legal/**/*.md`, and have the texts reviewed.

## Fonts

Archivo and IBM Plex Mono are self-hosted in `assets/fonts/` (latin subset, from Fontsource 5.3.0, SIL Open Font License) and declared in `assets/css/fonts.css`. The site makes no requests to third-party servers.
