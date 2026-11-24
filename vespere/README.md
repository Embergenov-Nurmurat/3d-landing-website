# VESPÈRE — Rain Hours (concept watch store)

Scroll-driven film site: React 19 + Vite 6 + Tailwind 4 + Lenis. 701 WebP frames (24 fps)
in `public/frames/{d,m}` are scrubbed by scroll; three watch cards and a bag drawer sit on top.

    npm install
    npm run dev        # http://localhost:5173
    npm run build      # output in dist/
    npm run preview    # serve dist/ locally

Deploy guide (Uzbek): see `DEPLOY.md`.

Where things live
- Copy, prices, brand: `src/content.ts`
- Camera timing, card windows, focal points, dial-macro veil: `src/lib/timeline.ts`
- Frame count / fps: `src/lib/frames.ts`
- Cards = bottom sheet on phones and portrait screens, side panel on landscape desktops
  (`sheet:` / `desk:` variants in `src/index.css`).

Fictional brand, fictional products.

Known issue (generated video): frames ~236–405 (the dial macro) show a crown-like mark and garbled
lettering. The site lands card 01 on a clean wrist shot (8.54 s), rushes through the macro and
blurs it (`VEIL_FRAMES`). Replace that clip before publishing publicly, then adjust
`HOLD_SECONDS`, `VEIL_FRAMES` and `FOCAL` in `timeline.ts`.
