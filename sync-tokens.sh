#!/bin/bash

# PC Design Tokens Sync Script
# Monitors GitHub repository for changes and rebuilds tokens automatically

REPO_URL="https://github.com/Frank16UX/pc-ds-tokens"
TEMP_DIR=".token-sync-temp"
SOURCE_FOLDER="export-from-figma"
TARGET_FOLDER="export-from-figma"

echo "🔄 Starting token sync process..."

# Clone the repository to a temporary directory
echo "📥 Fetching latest tokens from GitHub..."
if [ -d "$TEMP_DIR" ]; then
  rm -rf "$TEMP_DIR"
fi

git clone --depth 1 "$REPO_URL" "$TEMP_DIR" > /dev/null 2>&1

if [ $? -ne 0 ]; then
  echo "❌ Failed to clone repository"
  exit 1
fi

# Check if source folder exists in the cloned repo
if [ ! -d "$TEMP_DIR/$SOURCE_FOLDER" ]; then
  echo "❌ Source folder '$SOURCE_FOLDER' not found in repository"
  rm -rf "$TEMP_DIR"
  exit 1
fi

# Copy files from cloned repo to local export-from-figma
echo "📋 Copying token files..."
cp -r "$TEMP_DIR/$SOURCE_FOLDER"/* "$TARGET_FOLDER/"

if [ $? -ne 0 ]; then
  echo "❌ Failed to copy files"
  rm -rf "$TEMP_DIR"
  exit 1
fi

# Clean up temp directory
rm -rf "$TEMP_DIR"

echo "✅ Token files updated successfully"

# Run the build script
echo ""
echo "🏗️  Building design tokens..."
npm run build:tokens

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Sync complete! Design tokens are up to date."
else
  echo ""
  echo "❌ Build failed. Please check the errors above."
  exit 1
fi
