# How to Create and Deploy a Next.js Site to GitHub Pages

This guide walks you through creating a static Next.js site (like Coach Cathy & HydroSafe) and deploying it to GitHub Pages.

---

## Part 1: Create the Project

### Step 1: Initialize Next.js with TypeScript and Tailwind

```bash
npx create-next-app@latest my-project --typescript --tailwind --eslint --app --yes
cd my-project
```

### Step 2: Configure for Static Export

Edit `next.config.ts` and add `output: "export"`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,  // Required for static export
  },
};

export default nextConfig;
```

**Important:** Static export means:
- No server-side rendering at runtime
- No API routes, server actions, or middleware
- No dynamic server features
- Everything is pre-built at `npm run build`

### Step 3: Build the Site

```bash
npm install
npm run build
```

The `out/` folder will contain your static HTML, CSS, and JS.

---

## Part 2: Configure for GitHub Pages (Project Site)

If your site will live at `username.github.io/repo-name` (project site), you need to set the base path.

### Step 4: Add basePath and assetPrefix

Edit `next.config.ts` again. Replace `repo-name` with your actual repository name:

```ts
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/repo-name",           // Must match your GitHub repo name exactly
  assetPrefix: "/repo-name/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
```

### Step 5: Update SEO Base URL

If you have an SEO helper, update the site URL to match your GitHub Pages URL:

```ts
// src/lib/seo.ts (or similar)
const SITE_URL = "https://YOUR_USERNAME.github.io/repo-name";
```

---

## Part 3: Create the GitHub Repository

### Step 6: Create a New Repository on GitHub

1. Go to [github.com](https://github.com) and sign in.
2. Click the **+** icon → **New repository**.
3. Set:
   - **Repository name:** `repo-name` (e.g. `coachcathyandHydrosafe`)
   - **Visibility:** Public
   - **Do not** initialize with a README (your project already has files).
4. Click **Create repository**.

### Step 7: Push Your Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/repo-name.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `repo-name` with your actual GitHub username and repo name.

---

## Part 4: Deploy to GitHub Pages

**Recommended: GitHub Actions** (auto-deploys on every push, fewer issues with assets)

A workflow is already in `.github/workflows/deploy.yml`. To use it:

1. Push your code to `main`.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. The workflow runs on every push to `main` and deploys the site.

**Alternative: Manual deploy with gh-pages**

```bash
npm install --save-dev gh-pages
npm run deploy
```

This pushes `out/` to the `gh-pages` branch. Set Pages source to that branch in Settings.

---

## Part 5: Enable GitHub Pages

### Step 11: Configure GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings**.
3. In the left sidebar, click **Pages** (under "Code and automation").
4. Under **Build and deployment**:
   - **Source:** **GitHub Actions** (recommended)
   - If using manual deploy: Source = Deploy from a branch, Branch = `gh-pages`, Folder = `/ (root)`
5. Save. If using GitHub Actions, push to `main` to trigger the workflow.

### Step 12: Wait for Deployment

- GitHub will build and publish your site (usually 1–2 minutes).
- Check the **Deployments** tab or the Pages section for status.

---

## Part 6: Access Your Site

### Your Site URL

For a project site:

```
https://YOUR_USERNAME.github.io/repo-name/
```

**Example:** `https://jkaweesi22.github.io/coachcathyandHydrosafe/`

---

## Checklist Summary

- [ ] Next.js project with `output: "export"`
- [ ] `basePath` and `assetPrefix` match repo name (for project sites)
- [ ] `images.unoptimized: true` in next.config
- [ ] SITE_URL / SEO config updated for your Pages URL
- [ ] GitHub repo created
- [ ] Code pushed to `main` (or default branch)
- [ ] `gh-pages` installed and deploy script added
- [ ] `npm run deploy` run successfully
- [ ] GitHub Pages enabled (Settings → Pages → gh-pages branch)

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Blank page / 404 | Check `basePath` matches repo name exactly (case-sensitive). |
| Styles not loading | Verify `assetPrefix` has trailing slash. |
| Images broken | Ensure `images.unoptimized: true`. |
| Links go to wrong URL | `basePath` is auto-added by Next.js `<Link>`; internal links should work. |
| Site not updating | Re-run `npm run deploy` after changes. |
| 404 on refresh | GitHub Pages serves static files; client-side routing works with Next.js. |

---

## Updating the Site

After making changes:

```bash
git add .
git commit -m "Your commit message"
git push origin main
npm run deploy
```

This pushes your source code to `main` and publishes the new build to `gh-pages`.
