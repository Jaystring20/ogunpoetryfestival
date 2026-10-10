#!/bin/bash
# Installs npm dependencies so `npm run typecheck` and `npm run build`
# work at the start of Claude Code cloud sessions.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"
npm install --no-audit --no-fund
