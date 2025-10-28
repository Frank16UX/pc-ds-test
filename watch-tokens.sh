#!/bin/bash

# PC Design Tokens Auto-Sync Watcher
# Polls GitHub repository for changes and automatically syncs when detected

REPO_URL="https://github.com/Frank16UX/pc-ds-tokens"
CHECK_INTERVAL=300  # Check every 5 minutes (300 seconds)
LAST_COMMIT_FILE=".last-commit-hash"

echo "👀 Starting automatic token sync watcher..."
echo "📍 Repository: $REPO_URL"
echo "⏱️  Check interval: ${CHECK_INTERVAL}s"
echo ""

# Function to get the latest commit hash from GitHub
get_latest_commit() {
  git ls-remote "$REPO_URL" HEAD 2>/dev/null | awk '{print $1}'
}

# Get initial commit hash
CURRENT_HASH=$(get_latest_commit)

if [ -z "$CURRENT_HASH" ]; then
  echo "❌ Failed to connect to repository. Please check the URL and your internet connection."
  exit 1
fi

# Save initial hash if file doesn't exist
if [ ! -f "$LAST_COMMIT_FILE" ]; then
  echo "$CURRENT_HASH" > "$LAST_COMMIT_FILE"
  echo "📌 Initialized with commit: ${CURRENT_HASH:0:7}"
fi

LAST_HASH=$(cat "$LAST_COMMIT_FILE")

echo "✅ Watcher started. Press Ctrl+C to stop."
echo ""

while true; do
  CURRENT_HASH=$(get_latest_commit)
  
  if [ -z "$CURRENT_HASH" ]; then
    echo "⚠️  $(date '+%Y-%m-%d %H:%M:%S') - Failed to check for updates"
    sleep "$CHECK_INTERVAL"
    continue
  fi
  
  if [ "$CURRENT_HASH" != "$LAST_HASH" ]; then
    echo "🔔 $(date '+%Y-%m-%d %H:%M:%S') - New commit detected!"
    echo "   Previous: ${LAST_HASH:0:7}"
    echo "   Current:  ${CURRENT_HASH:0:7}"
    echo ""
    
    # Run sync script
    ./sync-tokens.sh
    
    if [ $? -eq 0 ]; then
      echo "$CURRENT_HASH" > "$LAST_COMMIT_FILE"
      LAST_HASH=$CURRENT_HASH
      echo ""
      echo "✅ Auto-sync completed successfully!"
    else
      echo ""
      echo "❌ Auto-sync failed. Will retry on next check."
    fi
    echo ""
  else
    echo "✓ $(date '+%Y-%m-%d %H:%M:%S') - No changes detected"
  fi
  
  sleep "$CHECK_INTERVAL"
done
