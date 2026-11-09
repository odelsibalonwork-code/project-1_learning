# Vohn Creative portfolio

A buildless HTML, CSS and JavaScript portfolio for Odel Vohn Sibalon. The complete site is in `portfolio/`; serve that directory locally or publish it with any static host. No dependencies or build step are required.

## Hosting

The primary public portfolio URL is https://vohn-sibalon.netlify.app/. Netlify provides the free `netlify.app` address. The included `portfolio/netlify.toml` serves the static directory directly, with no framework build. For repository deployment, select `portfolio/` as the Netlify base directory so its configuration applies.

## Content and media

The 29 selected projects include 21 videos and eight AI-assisted graphics. Initial project data, contact details and the résumé were taken from the previous portfolio at https://vohn-sibalon.netlify.app/ and its original `portfolio-data.js`. Nine additional projects were selected from the owner-provided Drive folder: https://drive.google.com/drive/folders/19_z5YtjjugaUM6jO0ZUPLvd0QeiNEuGk. New concept graphics are labeled as concept work. Each project includes its original Google Drive full-preview link. Graphics remain labeled AI-assisted. No client results or testimonials were added.

The palette uses the existing portfolio's graphite and lavender because no separate color-reference image was received. The layout is new, informed by the pacing, typography and video emphasis of https://www.elypt.io/tiktok.

## Behavior

The hero uses a silent, optimized copy of the owner's AI Product UGC 01 video. Scroll controls its time. Reduced motion and Pause motion keep a static poster; hero video is requested only after scrolling. Work filters and a View all control expose all 29 projects. Project dialogs use native video or original Drive previews and always include a full-preview fallback link. Graphics use local WebP exports. The contact form opens a draft in the visitor's email application and does not submit or store inquiries.

## Validation

JavaScript syntax, local asset references, project-data consistency, HTML identities and media budgets were checked. Browser rendering and interaction QA were not available because this managed environment did not expose the required browser preview tool.

## Fonts

Self-hosted Space Grotesk and DM Mono, distributed under the SIL Open Font License. License files are in `portfolio/assets/fonts/`.
