# OTR Frontend

A shared React HTML5 application for golden-age radio landing pages. The first URL path segment chooses the series, and each series loads its **own independent CSS** from `public/skins/<slug>.css`.

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env` and configure `VITE_API_DOMAIN`. For example `/suspense` queries `https://suspense.api.example.com/v1/landing`. The API must permit cross-origin access from the frontend domain.

## Landing API shape

The frontend expects `featured_episode` with `title`, `description`, optional `air_date`, `audio_url`, and optional `no_broadcast` and `message`. It accepts `cards: [{label,desc}]`. Absent an API, placeholder preview data appears rather than fabricated broadcast information.

## Prototype status

This is an initial shared DOM and independent skin scaffold, **not a pixel-perfect reconstruction**. The reference artwork has not yet been committed. Each skin expects `public/art/<slug>-hero.webp` and `public/art/<slug>-card.webp`. Those missing binary assets must be uploaded before visual approval. The source has not yet passed a verified production build.
