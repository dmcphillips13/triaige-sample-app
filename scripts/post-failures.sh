#!/usr/bin/env bash
# post-failures.sh — Parse Playwright JSON results and POST to Triaige runner
#
# Reads the Playwright JSON report, embeds screenshot files as base64 into the
# attachment bodies (Playwright only writes paths, not inline data), extracts
# PR context from the most recent merge commit, and sends everything to the
# Triaige /triage-run endpoint.
#
# Environment variables:
#   TRIAIGE_RUNNER_URL  — Runner base URL (e.g. https://triaige-runner.onrender.com)
#   TRIAIGE_API_KEY     — Shared API key for runner auth
#   GITHUB_REPOSITORY   — owner/repo (set automatically by GitHub Actions)
#   GITHUB_SHA          — Commit SHA that triggered the workflow
#   TRIAIGE_PR_NUMBER   — (optional) PR number override, useful for retriggers
#                         where the commit message isn't a merge commit

set -euo pipefail

RESULTS_FILE="${1:-test-results/results.json}"

if [ ! -f "$RESULTS_FILE" ]; then
  echo "No results file found at $RESULTS_FILE"
  exit 0
fi

# Check if there are any failures
UNEXPECTED=$(jq '.stats.unexpected // 0' "$RESULTS_FILE")
if [ "$UNEXPECTED" -eq 0 ]; then
  echo "All tests passed — nothing to report"
  exit 0
fi

echo "Found $UNEXPECTED unexpected test failure(s), posting to Triaige..."

# Embed screenshot files as base64 into attachment bodies.
# Playwright's JSON reporter only writes file paths, not inline data.
ENRICHED_FILE="/tmp/results-enriched.json"
python3 -c "
import json, base64, os

with open('$RESULTS_FILE') as f:
    data = json.load(f)

def enrich_attachments(obj):
    if isinstance(obj, dict):
        if 'attachments' in obj and isinstance(obj['attachments'], list):
            for att in obj['attachments']:
                path = att.get('path', '')
                content_type = att.get('contentType', '')
                if path and os.path.isfile(path) and 'image' in content_type and not att.get('body'):
                    with open(path, 'rb') as img:
                        att['body'] = base64.b64encode(img.read()).decode()
        for v in obj.values():
            enrich_attachments(v)
    elif isinstance(obj, list):
        for item in obj:
            enrich_attachments(item)

enrich_attachments(data)

with open('$ENRICHED_FILE', 'w') as f:
    json.dump(data, f)
"

# Extract PR context from the merge commit message or env var override
COMMIT_MSG=$(git log -1 --format="%s" "$GITHUB_SHA" 2>/dev/null || echo "")
PR_NUMBER="${TRIAIGE_PR_NUMBER:-}"
PR_TITLE=""
CHANGED_FILES="[]"
COMMIT_MESSAGES="[]"

# Try to extract PR number from merge commit if not provided via env var
if [ -z "$PR_NUMBER" ] && [[ "$COMMIT_MSG" =~ Merge\ pull\ request\ \#([0-9]+) ]]; then
  PR_NUMBER="${BASH_REMATCH[1]}"
fi

if [ -n "$PR_NUMBER" ]; then
  echo "Using PR #$PR_NUMBER"

  # Fetch PR details using gh CLI
  if command -v gh &>/dev/null; then
    PR_TITLE=$(gh pr view "$PR_NUMBER" --json title --jq '.title' 2>/dev/null || echo "")
    CHANGED_FILES=$(gh pr view "$PR_NUMBER" --json files --jq '[.files[].path]' 2>/dev/null || echo "[]")
    COMMIT_MESSAGES=$(gh pr view "$PR_NUMBER" --json commits --jq '[.commits[].messageHeadline]' 2>/dev/null || echo "[]")
  fi
fi

# Fall back to commit message as PR title if we couldn't get it
if [ -z "$PR_TITLE" ]; then
  PR_TITLE="$COMMIT_MSG"
fi

# Build the pr_context JSON
PR_CONTEXT=$(jq -n \
  --arg title "$PR_TITLE" \
  --argjson changed_files "$CHANGED_FILES" \
  --argjson commit_messages "$COMMIT_MESSAGES" \
  --arg repo "$GITHUB_REPOSITORY" \
  --argjson pr_number "${PR_NUMBER:-null}" \
  '{
    title: $title,
    changed_files: $changed_files,
    commit_messages: $commit_messages,
    repo: $repo,
    pr_number: (if $pr_number == null then null else ($pr_number | tonumber) end)
  }')

# Determine triage mode from GitHub event type
# workflow_dispatch with a pr_number input is a PR retrigger, treat as pre_merge
if [ "${GITHUB_EVENT_NAME:-}" = "pull_request" ]; then
  TRIAGE_MODE="pre_merge"
elif [ "${GITHUB_EVENT_NAME:-}" = "workflow_dispatch" ] && [ -n "${TRIAIGE_PR_NUMBER:-}" ]; then
  TRIAGE_MODE="pre_merge"
else
  TRIAGE_MODE="post_merge"
fi

# Build the full payload: enriched Playwright JSON + PR context + triage mode
# Write to file because base64 screenshots make the payload too large for shell args
PAYLOAD_FILE="/tmp/triaige-payload.json"
jq -n \
  --slurpfile report "$ENRICHED_FILE" \
  --argjson pr_context "$PR_CONTEXT" \
  --arg triage_mode "$TRIAGE_MODE" \
  '{
    report_json: $report[0],
    pr_context: $pr_context,
    triage_mode: $triage_mode
  }' > "$PAYLOAD_FILE"

# POST to runner (use @file to avoid "argument list too long")
RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X POST "${TRIAIGE_RUNNER_URL}/triage-run" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${TRIAIGE_API_KEY}" \
  -d @"$PAYLOAD_FILE")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | sed '$d')

if [ "$HTTP_CODE" -ge 200 ] && [ "$HTTP_CODE" -lt 300 ]; then
  RUN_ID=$(echo "$BODY" | jq -r '.run_id // "unknown"')
  echo "Triage run created: $RUN_ID"
  echo "View results at the Triaige dashboard"
else
  echo "Failed to post to Triaige runner (HTTP $HTTP_CODE)"
  echo "$BODY"
  exit 1
fi
