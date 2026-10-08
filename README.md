<div align="center">

# Shalimar Coworking

**WORK. MEET. GROW.**

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Hosted_on-Vercel-000000?logo=vercel&logoColor=white)](https://shalimarcoworking-com.vercel.app/)

The website for Shalimar Coworking.

[Live site](https://shalimarcoworking-com.vercel.app/) · [Next.js docs](https://nextjs.org/docs) · [Tailwind docs](https://tailwindcss.com/docs)

</div>

---

## What it is

A Next.js site that uses the App Router and is styled with Tailwind CSS. Pages are prerendered as static HTML at build time, so they load fast and need no server of their own. Vercel builds and hosts it, and every push to `main` goes live.

## Quickstart

Requires Node.js 20 or newer and npm.

```bash
git clone https://github.com/ahmad-kiani/shalimarcoworking-com.git
cd shalimarcoworking-com

npm install                  # dependencies
npm run dev                  # dev server on :3000, reloads on save
```

Open http://localhost:3000.

## Project structure

```
src/
  app/
    layout.tsx    Shared layout for every page (header, footer, fonts, metadata)
    page.tsx      Homepage (/)
    globals.css   Global styles and Tailwind setup
public/           Static files such as images and icons, served from /
```

Each folder under `src/app/` that has a `page.tsx` becomes a route, so `src/app/about/page.tsx` serves `/about`.

## Development

```bash
npm run lint             # ESLint
npm run build            # production build, which also type-checks
npm run start            # serve that build on :3000
```

Run `npm run build` before you push. Vercel runs the same build, and a failed build won't go live.

## Deployment

Vercel watches this repo. Every push to `main` deploys to production at [shalimarcoworking-com.vercel.app](https://shalimarcoworking-com.vercel.app/). Other branches and pull requests get their own preview URL. There's nothing to run by hand.

## Commit messages

This repo uses [Conventional Commits](https://www.conventionalcommits.org):

| Prefix      | Use for                                     |
| ----------- | ------------------------------------------- |
| `feat:`     | a new page, section or feature              |
| `fix:`      | a bug fix                                   |
| `refactor:` | code changes that don't change behaviour    |
| `chore:`    | tooling, dependencies and config            |
| `docs:`     | documentation only                          |

Example: `feat: add pricing page`
