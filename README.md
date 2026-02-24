# Coach Cathy & HydroSafe

Championship-level website for Coach Cathy and HydroSafe swim coaching.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS 3
- shadcn/ui + Radix UI
- Lucide icons

## GitHub Pages Deployment

This project is configured for **static export** and deploys to GitHub Pages.

### Build

```bash
npm install
npm run build
```

Output goes to the `out/` folder. Deploy the contents of `out/` to GitHub Pages.

### For project sites (`username.github.io/repo-name`)

If deploying to a project site (not a user/org root), add to `next.config.ts`:

```ts
const nextConfig = {
  output: "export",
  basePath: "/CoachCathyHydrosafe",  // your repo name
  assetPrefix: "/CoachCathyHydrosafe/",
  // ...
};
```

### Contact

- **Coach Cathy:** +256 700 127331
- **HydroSafe:** +256 700 127331
