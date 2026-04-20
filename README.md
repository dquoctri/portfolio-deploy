# Portfolio Deploy

React Router 7 portfolio app running on Cloudflare Workers with server-side rendering through the Cloudflare Vite plugin.

## Stack

- React Router 7 framework mode
- Cloudflare Workers
- Vite 6
- Tailwind CSS 4
- TypeScript
- Playwright + Vitest

## Local Development

Use the repo toolchain:

```bash
node -v
npm -v
```

This project is pinned to `npm@10.9.2` in `package.json`.

Install dependencies:

```bash
npm install
```

Start local development:

```bash
npm run dev
```

Generate Cloudflare and route types:

```bash
npm run typegen
```

Run verification:

```bash
npm run typecheck
npm test
npm run e2e
```

## Production Build

Create the Worker build locally:

```bash
npm run build
```

This generates:

- `build/client`
- `build/server`

## Deploy To Cloudflare

### CLI Deploy

1. Log in to Cloudflare:

```bash
npx wrangler login
```

2. Deploy the Worker:

```bash
npm run deploy
```

3. Optional preview version upload:

```bash
npx wrangler versions upload
```

### Cloudflare Dashboard With Git

This project should be deployed as a **Worker**, not a Pages static site.

1. Push this repo to GitHub or GitLab.
2. In Cloudflare, go to **Workers & Pages**.
3. Select **Create application**.
4. Select **Import a repository** under Workers.
5. Choose this repository.
6. Use the repo root as the root directory.
7. Set the build command to:

```bash
npm run build
```

8. Set the deploy command to:

```bash
npm run deploy
```

9. For preview builds on non-production branches, use:

```bash
npx wrangler versions upload
```

10. Save and deploy.

## Important Cloudflare Notes

- The Worker name in the Cloudflare dashboard must match the `name` field in [wrangler.json](./wrangler.json).
- In this repo that Worker name is `portfolio-deploy`.
- If you connect this repo to Workers Builds, Cloudflare uses the Wrangler version from `package.json`.
- If you rename the Worker in Cloudflare, update `wrangler.json` to match before the next build.

## Useful Scripts

```bash
npm run dev
npm run build
npm run deploy
npm run typegen
npm run typecheck
npm test
npm run e2e
```
