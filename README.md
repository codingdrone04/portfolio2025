# Portfolio - cd04.fr

Personal portfolio built with Next.js 16, TypeScript, Tailwind CSS and Framer Motion. Bilingual (FR/EN) with `next-intl`.

**Live:** [portfolio.cd04.fr](https://portfolio.cd04.fr)

## Stack

- **Framework:** Next.js 16 (standalone output)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **i18n:** next-intl (FR/EN)
- **Linter:** Biome
- **Package manager:** Bun

## Development

```bash
bun install
bun run dev
```

## Deployment

Deployed via Docker on a self-hosted server, accessible through Cloudflare Tunnel.

```bash
docker compose up -d --build
```

Auto-deploys on push to `main` via GitHub Actions (self-hosted runner).

## Project structure

```
app/
  [locale]/        # i18n routing
  components/      # React components
messages/          # Translation files (fr.json, en.json)
i18n/              # next-intl config
public/            # Static assets
```
