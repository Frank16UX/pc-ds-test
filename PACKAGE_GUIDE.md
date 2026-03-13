# Design System Package Publishing Guide

A step-by-step guide to understanding how the PC Design System was published as a private npm package, and how to use it in your projects.

---

## Part 1: How the Package Was Created

This section explains the entire process, which you can replicate for other design system repositories.

### Step 1: Create a Barrel Export

A barrel export is a single file that re-exports all your components so users don't have to remember long import paths.

**File: `src/index.ts`**

```typescript
export { Button } from './components/actions/Button';
export type { ButtonProps } from './components/actions/Button';
export { IconButton } from './components/actions/IconButton';
export type { IconButtonProps } from './components/actions/IconButton';
export { Link } from './components/actions/Link';
export type { LinkProps } from './components/actions/Link';
```

**Why this matters:** Instead of writing `import { Button } from '@frank16ux/pc-design-system/components/actions/Button'`, users can now write `import { Button } from '@frank16ux/pc-design-system'`.

### Step 2: Create TypeScript Declaration Config

TypeScript declarations give developers autocomplete and type hints when using your components in their code.

**File: `tsconfig.build.json`**

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": false,
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "outDir": "./dist"
  },
  "include": ["src"],
  "exclude": ["src/**/*.stories.*", "src/**/*.test.*"]
}
```

**What it does:**
- `declaration: true` — generates `.d.ts` files for type hints
- `declarationMap: true` — creates source maps so developers can hover and see your actual code
- `emitDeclarationOnly: true` — only generates types, not JavaScript (Vite handles that)
- `outDir: "./dist"` — puts the types in the dist folder

### Step 3: Create Vite Library Build Config

Vite bundles your components into two formats: ESM (modern browsers) and CJS (Node.js/older systems).

**File: `vite.config.lib.ts`**

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => format === 'es' ? 'index.js' : 'index.cjs',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'react-aria-components',
        'react-stately',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: 'index.[ext]',
      },
    },
    sourcemap: true,
    cssCodeSplit: false,
  },
});
```

**What it does:**
- `formats: ['es', 'cjs']` — creates both ESM and CommonJS versions
- `external: [...]` — tells Vite NOT to bundle React and React Aria (the consumer's version is used instead)
- `assetFileNames: 'index.[ext]'` — names the CSS file `index.css` for easy importing
- `sourcemap: true` — includes source maps for debugging

### Step 4: Update `.gitignore`

Generated files shouldn't be committed. Add `dist/` to `.gitignore`:

```
# Build output
dist/
```

### Step 5: Update `package.json`

The package.json file tells npm how to publish and what to include.

**Key additions:**

```json
{
  "name": "@frank16ux/pc-design-system",
  "version": "1.0.0",
  "description": "Pampered Chef Design System - React components and design tokens",
  "author": "Frank16UX",
  "license": "UNLICENSED",

  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",

  "exports": {
    ".": {
      "import": { "types": "./dist/index.d.ts", "default": "./dist/index.js" },
      "require": { "types": "./dist/index.d.ts", "default": "./dist/index.cjs" }
    },
    "./tokens": "./build/scss/index.scss",
    "./tokens/css": "./build/css/tokens.css",
    "./tokens/scss/*": "./build/scss/*",
    "./tokens/css/*": "./build/css/*",
    "./assets/*": "./assets/*",
    "./dist/index.css": "./dist/index.css"
  },

  "files": [
    "dist",
    "build/scss",
    "build/css",
    "assets"
  ],

  "publishConfig": {
    "registry": "https://npm.pkg.github.com",
    "access": "restricted"
  },

  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0",
    "react-aria-components": "^1.0.0",
    "react-stately": "^3.0.0"
  },

  "scripts": {
    "build:tokens": "node build-tokens.js",
    "build:lib": "vite build --config vite.config.lib.ts && tsc --project tsconfig.build.json",
    "build": "npm run build:tokens && npm run build:lib",
    "prepublishOnly": "npm run build"
  }
}
```

**Explanation:**
- `name` — scoped to your GitHub username: `@frank16ux/pc-design-system`
- `version` — starts at `1.0.0` following semantic versioning
- `main`, `module`, `types` — entry points for different module systems
- `exports` — allows importing from subpaths (e.g., `from '@frank16ux/pc-design-system/tokens'`)
- `files` — only these directories get published (keeps the package small)
- `publishConfig` — tells npm to publish to GitHub Packages instead of npmjs.com
- `peerDependencies` — React and friends are the consumer's responsibility (reduces bundle size)
- `prepublishOnly` — automatically runs `npm run build` before publishing

### Step 6: Create `.npmrc`

This file tells npm where to find your scoped package.

**File: `.npmrc`**

```
@frank16ux:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

**What it does:**
- Line 1: Route all `@frank16ux/*` packages to GitHub Packages
- Line 2: Use a GitHub token for authentication (provided by CI/CD or user's `.npmrc`)

### Step 7: Create GitHub Actions Workflow

Automate publishing when you push version tags.

**File: `.github/workflows/publish.yml`**

```yaml
name: Publish to GitHub Packages

on:
  push:
    tags:
      - 'v*.*.*'
  workflow_dispatch:

permissions:
  contents: read
  packages: write

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://npm.pkg.github.com

      - name: Install dependencies
        run: npm ci

      - name: Build tokens and library
        run: npm run build

      - name: Publish package
        run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**How it works:**
- Triggers on push of tags like `v1.0.0`, `v1.0.1`, etc.
- Can also be triggered manually via GitHub UI
- Runs the full build pipeline
- Uses `GITHUB_TOKEN` (automatic in GitHub Actions) to authenticate with GitHub Packages

### Step 8: Build and Verify

Run the build locally to make sure everything works:

```bash
npm run build
```

This should produce:
- `dist/index.js` (ESM bundle)
- `dist/index.cjs` (CommonJS bundle)
- `dist/index.d.ts` (TypeScript definitions)
- `dist/index.css` (component styles)

### Step 9: Preview the Package Contents

See exactly what will be published:

```bash
npm pack --dry-run
```

This shows all 439 files and their sizes. The total package should be around 800-900 KB.

---

## Part 2: How to Use the Package in a New Project

Follow these steps to use the design system in any new project.

### Step 1: Create a GitHub Personal Access Token (PAT)

1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "npm-packages"
4. Check the `read:packages` scope
5. Click "Generate token"
6. Copy the token (you won't see it again!)

### Step 2: Create `.npmrc` in Your Project

In your new project root, create a `.npmrc` file:

```
@frank16ux:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_TOKEN_HERE
```

Replace `YOUR_TOKEN_HERE` with the token you just created.

**Alternatively, set it globally** (one time setup):

```bash
npm config set @frank16ux:registry https://npm.pkg.github.com
npm config set //npm.pkg.github.com/:_authToken YOUR_TOKEN_HERE
```

### Step 3: Install the Package

```bash
npm install @frank16ux/pc-design-system
```

If it fails with a 404 error, check:
- Your token is correct
- Your token has `read:packages` scope
- The package is published (check https://github.com/Frank16UX/pc-ds-test/packages)

### Step 4: Import Components

In your React code:

```tsx
import { Button, IconButton, Link } from '@frank16ux/pc-design-system';
import '@frank16ux/pc-design-system/dist/index.css';

export function MyComponent() {
  return (
    <Button variant="primary">
      Click me
    </Button>
  );
}
```

The CSS import is important — it styles the components!

### Step 5: Import Design Tokens (SCSS)

In your SCSS files:

```scss
@import '@frank16ux/pc-design-system/tokens';

.my-element {
  color: $tokens-color-text-default-primary;
  padding: $numeric-tokens-spacing-md;
  background: $tokens-color-background-accent-solid;
}
```

### Step 6: Import Design Tokens (CSS)

If you're not using SCSS:

```css
@import '@frank16ux/pc-design-system/tokens/css';

.my-element {
  color: var(--tokens-color-text-default-primary);
  padding: var(--numeric-tokens-spacing-md);
}
```

### Step 7: Access Icons and Assets

Icons are available at:

```
@frank16ux/pc-design-system/assets/icons/base/check.svg
@frank16ux/pc-design-system/assets/icons/social/social-facebook.svg
```

You can import them as URLs in your code:

```tsx
import checkIcon from '@frank16ux/pc-design-system/assets/icons/base/check.svg';

export function IconExample() {
  return <img src={checkIcon} alt="check" />;
}
```

Or reference them as paths in CSS:

```css
.icon::before {
  background-image: url('@frank16ux/pc-design-system/assets/icons/base/check.svg');
}
```

---

## Part 3: How to Publish Changes to the Design System

When you update components or tokens, follow this workflow to release a new version.

### Step 1: Make Changes

Edit components in `src/components/` or tokens in Figma, then sync them.

Example: Update Button styles:

```bash
# Edit src/components/actions/Button/Button.module.scss
# Commit your changes
git add .
git commit -m "feat: update button hover states"
git push origin my-feature-branch
```

### Step 2: Create a PR and Merge to Main

1. Create a pull request on GitHub
2. Have it reviewed
3. Merge to `main`

### Step 3: Update the Version Number

After merging, update the version in `package.json`:

```bash
npm version patch
```

This command:
- Updates `package.json` from `1.0.0` to `1.0.1`
- Creates a git commit
- Creates a git tag `v1.0.1`

**Understanding version numbers:**

Semantic Versioning (semver) uses `MAJOR.MINOR.PATCH`:

- **PATCH** (e.g., `1.0.0` → `1.0.1`): Bug fixes, small tweaks
- **MINOR** (e.g., `1.0.0` → `1.1.0`): New features, backwards compatible
- **MAJOR** (e.g., `1.0.0` → `2.0.0`): Breaking changes

For most updates, use `patch`:

```bash
npm version patch
```

### Step 4: Push the Tag

```bash
git push origin v1.0.1
```

The moment you push the tag, GitHub Actions automatically:
- Builds the design system
- Publishes to GitHub Packages
- Your users can now install the new version

### Step 5: Verify the Release

Check GitHub Actions to see if it succeeded:

1. Go to https://github.com/Frank16UX/pc-ds-test/actions
2. Look for "Publish to GitHub Packages" workflow
3. It should show a green checkmark after ~30 seconds

Or check the Packages page:

1. Go to https://github.com/Frank16UX/pc-ds-test/packages
2. Click on `pc-design-system`
3. You should see the new version listed

---

## Part 4: How to Update the Package in a Consumer Project

When a new version is released, update it in your projects.

### Update to the Latest Version

```bash
npm update @frank16ux/pc-design-system
```

This updates to the newest compatible version (respects semver ranges).

### Update to a Specific Version

```bash
npm install @frank16ux/pc-design-system@1.0.2
```

### Check Your Current Version

```bash
npm list @frank16ux/pc-design-system
```

This shows you which version is installed.

### See All Available Versions

```bash
npm view @frank16ux/pc-design-system versions
```

Lists all published versions.

---

## Part 5: Helpful Tips & Troubleshooting

### Understanding Semantic Versioning (semver)

When you see `^1.0.0` in your package.json, the `^` means:
- Update to any version up to (but not including) `2.0.0`
- So `1.5.3` is allowed, but `2.0.0` is not

Use these ranges:
- `^1.0.0` — compatible with version (default)
- `~1.0.0` — only patch updates
- `1.0.0` — exact version only

### Common Errors and Fixes

**Error: 404 Not Found**

```
npm ERR! 404 Not Found
```

Fix:
- Check your token is in `.npmrc`
- Verify the token has `read:packages` scope
- Make sure you're using the correct registry URL

**Error: Authentication error**

```
npm ERR! 401 Unauthorized
```

Fix:
- Your token may have expired
- Generate a new PAT and update `.npmrc`

**Error: Package not found**

```
npm ERR! code E404
```

Fix:
- The package may not be published yet (check the Packages page)
- Verify the package name is `@frank16ux/pc-design-system` (with `@`)
- Wait a few seconds — GitHub may need time to register the package

### Testing Locally Before Publishing

Before publishing a release, test it locally:

```bash
# Build the package
npm run build

# See what gets published
npm pack --dry-run

# Actually create a tarball (for manual testing)
npm pack
```

This creates a `.tgz` file you can inspect or share.

### Setting Up CI/CD for Your Project

If you want automatic deployments when your design system updates, add to your consumer project:

1. Check for updates periodically with `npm outdated`
2. Create an automated PR when a new version is available
3. Review and merge to deploy

Tools like Dependabot can do this automatically (GitHub-native option).

### Need Help?

If you get stuck:
- Check the build logs: https://github.com/Frank16UX/pc-ds-test/actions
- Review `package.json` for the current version
- Ask for help in team chat or documentation

---

## Summary

Publishing a design system as a package is a one-time setup process that saves time for every consumer project afterward. The investment in automation (GitHub Actions) means you can publish updates in seconds — just push a tag and you're done.

For questions or updates to this guide, reference the original design system repository: https://github.com/Frank16UX/pc-ds-test
