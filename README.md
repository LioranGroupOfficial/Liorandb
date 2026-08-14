# LioranDB Docs Site

This folder contains the Docusaurus-based documentation site for LioranDB.

It is the docs project for:

- local solo setup with Docker
- the `@liorandb/driver` package
- the `@liorandb/cli` package
- managed deployment guidance

## What is in this site

The docs are organized around the real LioranDB user journey:

- homepage with the local startup command and startup log output
- `docs/getting-started/` for first local setup
- `docs/driver/` for JavaScript and TypeScript driver docs
- `docs/cli/` for CLI usage, auth, CRUD, admin, ops, and shell docs
- `docs/deployment/` for managed deployment guidance

Custom site code lives mainly in:

- `src/pages/` for the homepage
- `src/components/` for reusable docs components such as terminals and deployment helpers
- `src/css/custom.css` for site-wide theme overrides
- `docusaurus.config.ts` and `sidebars.ts` for site config and navigation

## Installation

```bash
npm install
```

## Local development

```bash
npm run start
```

This starts the local docs server with live reload.

## Build

```bash
npm run build
```

This generates the production site into the `build/` directory.

## Serve the production build

```bash
npm run serve
```

Use this when you want to preview the built static output locally.

## Useful maintenance commands

```bash
npm run clear
npm run typecheck
```

- `npm run clear` resets Docusaurus caches
- `npm run typecheck` checks the TypeScript site code

## Editing notes

When updating docs here:

- keep LioranDB branding and content focused on the real product, not Docusaurus defaults
- prefer source-backed docs for the driver and CLI
- keep homepage visuals simple, dark, and terminal-led
- keep code examples aligned with the documented package versions used by this site

Current documented package versions in this site:

- `@liorandb/driver@2.0.3`
- `@liorandb/cli@1.0.3`

## Deployment

If you use the standard Docusaurus deploy flow:

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<your-github-username> npm run deploy
```

If deployment for this project is handled by another hosting workflow, use the
generated `build/` output from `npm run build`.
