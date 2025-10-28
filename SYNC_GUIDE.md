# Token Sync Scripts

This project includes automated scripts to sync design tokens from the GitHub repository.

## Available Commands

### 1. Manual Sync
```bash
npm run sync:tokens
```
- Fetches the latest tokens from GitHub
- Copies files from the repository's `export-from-figma` folder
- Automatically rebuilds the design tokens

### 2. Automatic Watcher
```bash
npm run watch:tokens
```
- Monitors the GitHub repository for new commits
- Automatically syncs and rebuilds when changes are detected
- Checks every 5 minutes by default
- Runs continuously until stopped with Ctrl+C

## How It Works

### sync-tokens.sh
1. Clones the latest version of `https://github.com/Frank16UX/pc-ds-tokens`
2. Copies all files from the repo's `export-from-figma` folder to your local `export-from-figma`
3. Runs `npm run build:tokens` to regenerate SCSS/CSS outputs
4. Cleans up temporary files

### watch-tokens.sh
1. Polls the GitHub repository every 5 minutes
2. Compares the latest commit hash with the last known commit
3. When a new commit is detected, runs `sync-tokens.sh` automatically
4. Tracks the commit hash in `.last-commit-hash` file

## Configuration

You can adjust the check interval by editing `watch-tokens.sh`:
```bash
CHECK_INTERVAL=300  # Change to desired seconds (e.g., 600 for 10 minutes)
```

## Requirements

- Git installed and available in PATH
- Internet connection to access GitHub
- Write permissions to the project directory

## Troubleshooting

### "Failed to clone repository"
- Check your internet connection
- Verify the repository URL is correct and accessible
- Ensure Git is installed: `git --version`

### "Source folder 'export-from-figma' not found"
- The repository structure may have changed
- Check if the folder exists in: https://github.com/Frank16UX/pc-ds-tokens

### Watcher not detecting changes
- Verify the repository has new commits
- Check if `.last-commit-hash` contains a valid hash
- Delete `.last-commit-hash` and restart the watcher to reset

## Ignoring Sync Artifacts

Add these lines to your `.gitignore`:
```
.token-sync-temp/
.last-commit-hash
```
