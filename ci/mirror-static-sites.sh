#!/usr/bin/env bash
# Install upstream static sites from GitHub Release tarballs into the VitePress dist tree.
# Usage: bash ci/mirror-static-sites.sh [dist-dir]
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST="${1:-$ROOT/.vitepress/dist}"
RESOLVED="${ROOT}/ci/static-sites-resolved.json"
MARKER_NAME=".wiki-static-hash"

if [[ ! -f "$RESOLVED" ]]; then
  echo "Resolving upstream static site versions..."
  node "${ROOT}/ci/scripts/resolve-static-sites.mjs"
fi

if [[ ! -f "$RESOLVED" ]]; then
  echo "::error::Missing resolved static site metadata: $RESOLVED" >&2
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  echo "::error::curl is required to download static site releases" >&2
  exit 1
fi

site_count=0
mkdir -p "$DIST"

while IFS=$'\t' read -r id content_hash release_tag download_url; do
  [[ -n "$id" && -n "$content_hash" && -n "$download_url" ]] || continue
  site_count=$((site_count + 1))

  dest="$DIST/$id"
  marker="$dest/$MARKER_NAME"
  output_name="${id//-/_}_downloaded"

  if [[ -f "$dest/index.html" && -f "$marker" && "$(tr -d '[:space:]' < "$marker")" == "$content_hash" ]]; then
    echo "Static site ${id} already present (${content_hash}) — skipping download"
    continue
  fi

  echo "::group::Install ${id} from release ${release_tag}"
  tmp="$(mktemp)"
  trap 'rm -f "$tmp"' RETURN

  curl -fsSL --retry 3 --retry-delay 2 --connect-timeout 30 --max-time 600 \
    -o "$tmp" "$download_url"

  rm -rf "${dest:?}"
  mkdir -p "$dest"
  tar -xf "$tmp" -C "$dest"
  rm -f "$tmp"
  trap - RETURN

  if [[ ! -f "$dest/index.html" ]]; then
    echo "::error::Release extract for ${id} is missing index.html under ${dest}" >&2
    exit 1
  fi

  printf '%s\n' "$content_hash" > "$marker"
  echo "Installed ${id} → ${dest} (${content_hash})"
  echo "::endgroup::"

  if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
    echo "${output_name}=true" >> "$GITHUB_OUTPUT"
  fi
done < <(
  node --input-type=module -e "
import { readFileSync } from 'node:fs';
const data = JSON.parse(readFileSync('${RESOLVED}', 'utf8'));
for (const site of data.sites ?? []) {
  const id = String(site.id ?? '');
  const contentHash = String(site.contentHash ?? '');
  const releaseTag = String(site.releaseTag ?? '');
  const downloadUrl = String(site.downloadUrl ?? '');
  if (!id || !contentHash || !downloadUrl) {
    console.error('::error::Invalid resolved static site entry:', JSON.stringify(site));
    process.exit(1);
  }
  process.stdout.write([id, contentHash, releaseTag, downloadUrl].join('\t') + '\n');
}
"
)

if ((site_count == 0)); then
  echo "No enabled static sites in ${RESOLVED}"
  exit 0
fi
