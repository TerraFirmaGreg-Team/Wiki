#!/usr/bin/env bash
# Start the local VitePress preview server.
#
# Usage:
#   ./dev.sh             # dev mode (hot reload, recommended for writing docs)
#   ./dev.sh build       # production build into docs/.vitepress/dist
#   ./dev.sh preview     # preview the production build (run `build` first)

set -euo pipefail

cd "$(dirname "$0")"

# Pick a package manager. Prefer pnpm; fall back to npm.
if command -v pnpm >/dev/null 2>&1; then
  PM=pnpm
elif command -v npm >/dev/null 2>&1; then
  PM=npm
else
  echo "[dev.sh] Error: neither pnpm nor npm is installed." >&2
  echo "          Install Node.js 20+ and pnpm, then re-run." >&2
  exit 1
fi

# Bail out early if Node is too old to run VitePress.
if command -v node >/dev/null 2>&1; then
  NODE_MAJOR=$(node -p 'process.versions.node.split(".")[0]')
  if [ "${NODE_MAJOR}" -lt 20 ]; then
    echo "[dev.sh] Error: Node.js >= 20 required (current: $(node -v))." >&2
    exit 1
  fi
fi

# Install dependencies on first run, or when lockfile changes.
if [ ! -d node_modules ] || [ pnpm-lock.yaml -nt node_modules ]; then
  echo "[dev.sh] Installing dependencies with ${PM}..."
  "${PM}" install
fi

CMD="${1:-dev}"
shift || true

case "${CMD}" in
  dev|build|preview)
    echo "[dev.sh] Running: ${PM} run ${CMD}"
    exec "${PM}" run "${CMD}" "$@"
    ;;
  *)
    echo "[dev.sh] Unknown command: ${CMD}" >&2
    echo "         Usage: $0 [dev|build|preview]" >&2
    exit 2
    ;;
esac
