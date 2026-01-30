# Git and GitHub Setup Guide

This guide explains how Git synchronization works when moving this project between computers, and how to set up authentication on a new machine.

## Table of Contents
- [Files Synced via Git vs Local Files](#files-synced-via-git-vs-local-files)
- [What Happens on a New Computer](#what-happens-on-a-new-computer)
- [Git Connection vs Authentication](#git-connection-vs-authentication)
- [Setting Up Authentication](#setting-up-authentication)
- [Recommended Workflow](#recommended-workflow)

---

## Files Synced via Git vs Local Files

### ✅ Files Synced via Git (will appear on new computer)

When you `git clone` or `git pull` on another computer, you'll get:
- All source code (`src/`, `stories/`, etc.)
- Configuration files (`.gitignore`, `package.json`, etc.)
- Your committed components (Button, IconButton, TextLink)
- Documentation (`instructions/`, `CLAUDE.md`)
- Build configuration files
- Design tokens and SCSS files

### ❌ Files NOT Synced (local/generated only)

These files/folders won't appear because they're in `.gitignore`:

```
# Dependencies
node_modules/

# Instructions for LLM
_instructions/

# Sync script temporary files
.token-sync-temp/
.last-commit-hash

# Build outputs
storybook-static/

# Claude internal files
.claude/

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
```

**Why they're ignored:**
- `.claude/` - Claude Code's local workspace data (machine-specific)
- `storybook-static/` - Built Storybook output (regenerated)
- `.last-commit-hash` - Token sync tracking (local state)
- `node_modules/` - Dependencies (installed via `npm install`)
- `.DS_Store` - macOS metadata (not needed)

---

## What Happens on a New Computer

### Scenario 1: `git clone` (✅ Recommended)

```bash
git clone https://github.com/Frank16UX/pc-ds-test.git
cd pc-ds-test
npm install
```

**Result**:
- ✅ Full Git connection to remote repo
- ✅ All commit history preserved
- ✅ Can push/pull without issues (after authentication)
- ❌ `.claude/`, `storybook-static/` won't exist (need to regenerate)

### Scenario 2: Copy folder manually (⚠️ Not recommended)

If you copy the entire folder (including `.git/`):
- ✅ Git connection works (`.git/` folder contains remote info)
- ✅ Can push/pull normally (after authentication)
- ⚠️ Hidden folders like `.claude/` will copy, but they're machine-specific

---

## Git Connection vs Authentication

### 1. Git Connection (Already in the repository)

The connection to your GitHub remote is **stored in the `.git/` folder** and travels with your repository:

```ini
# .git/config
[remote "origin"]
    url = https://github.com/Frank16UX/pc-ds-test.git
    fetch = +refs/heads/*:refs/remotes/origin/*
[branch "main"]
    remote = origin
    merge = refs/heads/main
```

This means:
- ✅ Remote URL is **automatic** - no setup needed
- ✅ Branch tracking is **preserved** - main branch configured
- ✅ Git knows where to push/pull - connection is built-in

### 2. Authentication (What you need on new computer)

While the **connection** is automatic, you need **authentication** to prove you're allowed to push/pull.

| What | Where It Lives | On New Computer |
|------|----------------|-----------------|
| **Remote URL** | `.git/config` | ✅ Automatic (in repo) |
| **Commit history** | `.git/` folder | ✅ Automatic (in repo) |
| **Branch info** | `.git/` folder | ✅ Automatic (in repo) |
| **Your credentials** | Local machine only | ❌ Need to set up again |

---

## Setting Up Authentication

You have three options for authentication on a new computer:

### Option A: GitHub CLI (✅ Recommended)

**Install:**
```bash
# macOS
brew install gh

# Windows
winget install --id GitHub.cli

# Linux
sudo apt install gh
```

**Authenticate:**
```bash
gh auth login
```

Follow the interactive prompts to:
1. Choose GitHub.com
2. Choose HTTPS or SSH
3. Authenticate via browser or token

**Benefits:**
- ✅ Simplest setup process
- ✅ Automatic credential management
- ✅ Works with all Git operations
- ✅ Includes additional GitHub features (PR management, issues, etc.)

### Option B: Personal Access Token (Classic method)

**Create Token:**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (full control)
4. Generate and copy token

**Use Token:**
```bash
# Clone works without auth
git clone https://github.com/Frank16UX/pc-ds-test.git

# First push will prompt for credentials
git push

# Enter:
# Username: Frank16UX
# Password: ghp_xxxxxxxxxxxx (your token, not actual password)
```

**Benefits:**
- ✅ Works without installing extra tools
- ✅ Fine-grained access control
- ⚠️ Need to store token securely

### Option C: SSH Keys (Most secure)

**Generate SSH Key:**
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

**Add to GitHub:**
1. Copy public key: `cat ~/.ssh/id_ed25519.pub`
2. Go to: https://github.com/settings/keys
3. Click "New SSH key"
4. Paste and save

**Clone with SSH:**
```bash
git clone git@github.com:Frank16UX/pc-ds-test.git
```

**Benefits:**
- ✅ Most secure option
- ✅ No password prompts
- ✅ Key-based authentication
- ⚠️ Requires SSH key setup

---

## Recommended Workflow

### On New Computer (Step-by-Step)

#### 1. Install Prerequisites
```bash
# Install Node.js (if not installed)
# Download from: https://nodejs.org/

# Install GitHub CLI (recommended)
brew install gh  # macOS
```

#### 2. Authenticate with GitHub
```bash
gh auth login
# Follow prompts to authenticate
```

#### 3. Clone Repository
```bash
git clone https://github.com/Frank16UX/pc-ds-test.git
cd pc-ds-test
```

#### 4. Install Dependencies
```bash
npm install
```

#### 5. Build Tokens (if needed)
```bash
npm run build:tokens
```

#### 6. Start Development
```bash
# Start Storybook
npm run storybook

# Or build Storybook
npm run build-storybook
```

---

## Authentication Workflow Explained

### When You Run Git Commands:

#### `git clone` (Read operation)
- ✅ Works immediately for public repos
- ⚠️ May need auth for private repos
- No credentials needed on first clone

#### `git pull` (Read operation)
```bash
git pull
```
- ✅ Works if repo is public
- ⚠️ May ask for authentication if private

#### `git push` (Write operation)
```bash
git push
```
- ❌ **Always requires authentication**
- This is when you need GitHub CLI or token

**With GitHub CLI:**
```bash
gh auth login
# ✅ Now git push works automatically!
```

**Without GitHub CLI:**
```bash
git push
# Prompts for:
# Username: Frank16UX
# Password: ghp_xxxxxxxxxxxx (Personal Access Token)
```

---

## No Conflicts!

You **won't get conflicts** when moving between computers because:

1. **Git ignores local files** - `.gitignore` prevents them from being tracked
2. **Files are regenerated locally** - Each computer creates its own:
   - `node_modules/` via `npm install`
   - `storybook-static/` via `npm run build-storybook`
   - `.claude/` automatically by Claude Code when you use it

3. **Git tracks the remote URL** - The `.git/config` file stores your GitHub connection
4. **Commit history is preserved** - All your work is safely in Git

---

## Summary

### Key Takeaways

✅ **Git Connection**:
- Already in the repository (`.git/config`)
- No setup needed on new computer
- Remote URL travels with the repo

✅ **Authentication**:
- Needed for push/pull operations
- Set up once per computer
- Multiple options available (GitHub CLI recommended)

✅ **No Conflicts**:
- Ignored files stay local
- Generated files are recreated
- Source code syncs perfectly

### Quick Reference

```bash
# On new computer:
gh auth login              # Authenticate (once)
git clone <repo-url>       # Clone repository
cd <project-folder>        # Enter project
npm install                # Install dependencies
npm run storybook          # Start developing
```

The only files that matter for your workflow (source code, components, tokens) are all safely in Git! 🎉

---

## Troubleshooting

### Problem: "Permission denied" when pushing

**Solution**: You need to authenticate
```bash
gh auth login
# or set up SSH keys
# or use Personal Access Token
```

### Problem: "Remote URL not set"

**Solution**: Check your remote configuration
```bash
git remote -v
# Should show:
# origin  https://github.com/Frank16UX/pc-ds-test.git (fetch)
# origin  https://github.com/Frank16UX/pc-ds-test.git (push)
```

### Problem: "node_modules not found"

**Solution**: Install dependencies
```bash
npm install
```

### Problem: "build/scss not found"

**Solution**: Build tokens
```bash
npm run build:tokens
```

---

*Last updated: December 2024*
