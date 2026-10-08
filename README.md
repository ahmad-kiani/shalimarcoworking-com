# Shalimar Coworking

Website for Shalimar Coworking, built with Next.js and deployed on Vercel.

**Live:** https://shalimarcoworking-com.vercel.app/

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- React 19
- TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- ESLint
- Hosted on [Vercel](https://vercel.com)

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000. The page reloads as you edit.

## Scripts

| Command         | What it does                         |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the local dev server           |
| `npm run build` | Create a production build            |
| `npm run start` | Serve the production build locally   |
| `npm run lint`  | Run ESLint                           |

## Project structure

```
src/
  app/
    layout.tsx    Shared layout for every page (header, footer, fonts, metadata)
    page.tsx      Homepage (/)
    globals.css   Global styles and Tailwind setup
public/           Static files such as images and icons, served from /
```

To add a page, create a folder under `src/app/` with a `page.tsx` inside it. For example, `src/app/about/page.tsx` becomes `/about`.

## Deployment

Vercel deploys every push to `main` to production automatically. Pull requests and other branches get preview deployments.

## Commit messages

This repo uses [Conventional Commits](https://www.conventionalcommits.org):

- `feat:` for a new feature or page
- `fix:` for a bug fix
- `refactor:` for code changes that don't change behaviour
- `chore:` for tooling, dependencies and config
- `docs:` for documentation only

Example: `feat: add pricing page`
