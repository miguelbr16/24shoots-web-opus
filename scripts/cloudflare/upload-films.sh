#!/usr/bin/env bash
# Upload the full films to the R2 bucket that backs NEXT_PUBLIC_FILM_BASE.
# Run manually, once per new/updated film, with a logged-in wrangler (npx wrangler login).
# Usage: BUCKET=24shoots-media bash scripts/cloudflare/upload-films.sh
set -euo pipefail
BUCKET="${BUCKET:-24shoots-media}"
cd "$(dirname "$0")/../.."
for f in public/media/*/film.mp4; do
  key="${f#public/}"
  echo "→ r2://$BUCKET/$key"
  npx wrangler r2 object put "$BUCKET/$key" --file "$f" --content-type video/mp4 --cache-control "public, max-age=31536000, immutable" --remote
done
