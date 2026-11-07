# Vohn Creative Studio

A polished starter kit for a creative studio website, social graphics, and short-form video.

## Start the website

Requires Node.js 20.9 or newer.

1. Run `npm install`
2. Run `npm run dev`
3. Open http://localhost:3000

The site is built with Next.js, React, and Lucide icons. It uses original CSS layouts and SVG artwork included in this repository.

## Create social content

- Square post: `public/social/post-template.svg` (1080 × 1080)
- Story / Reel cover: `public/social/story-template.svg` (1080 × 1920)
- Remotion composition: `video/src/SocialPromo.tsx` (1080 × 1920, 30 fps, 18 seconds)

To preview the video, run `npm run video:studio`. To render it, run `npm run video:render`. The MP4 is written to `out/social-promo.mp4`.

Edit the headline, supporting copy, and brand name in the SVG files and the Remotion composition before publishing. Replace the sample contact address and project details in `app/page.tsx`.

## Design direction

The starter uses expressive editorial typography, oversized type, electric coral and lavender accents, bold cards, and restrained motion. Change the design tokens in `app/globals.css` to rebrand it.

## Reference projects

- shadcn/ui: https://github.com/shadcn-ui/ui
- Remotion: https://github.com/remotion-dev/remotion
- Video Shotcraft recipes: https://github.com/Vincentwei1021/video-shotcraft

The site and templates in this repository are original starter files. Installable dependencies are listed in `package.json`. Review upstream licenses and current usage terms before incorporating third-party code or assets into commercial work.
