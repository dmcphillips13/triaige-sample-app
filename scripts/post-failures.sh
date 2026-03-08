#!/usr/bin/env bash
# post-failures.sh — Parse Playwright JSON results and POST to Triaige runner
#
# Reads the Playwright JSON report, extracts PR context from the most recent
# merge commit, and sends everything to the Triaige /triage-run endpoint.
#
# Environment variables:
#   TRIAIGE_RUNNER_URL  — Runner base URL (e.g. https://triaige-runner.onrender.com)
#   TRIAIGE_API_KEY     — Shared API key for runner auth
#   GITHUB_REPOSITORY   — owner/repo (set automatically by GitHub Actions)
#   GITHUB_SHA          — Commit SHA that triggered the workflow

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

# Extract PR context from the merge commit message
# Merge commits from GitHub PRs have the format: "Merge pull request #N from ..."
COMMIT_MSG=$(git log -1 --format="%s" "$GITHUB_SHA" 2>/dev/null || echo "")
PR_NUMBER=""
PR_TITLE=""
CHANGED_FILES="[]"
COMMIT_MESSAGES="[]"

# Try to extract PR number from merge commit
if [[ "$COMMIT_MSG" =~ Merge\ pull\ request\ \#([0-9]+) ]]; then
  PR_NUMBER="${BASH_REMATCH[1]}"
  echo "Detected PR #$PR_NUMBER"

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

# Build the full payload: raw Playwright JSON + PR context
PAYLOAD=$(jq -n \
  --slurpfile report "$RESULTS_FILE" \
  --argjson pr_context "$PR_CONTEXT" \
  '{
    report_json: $report[0],
    pr_context: $pr_context
  }')

# POST to runner
RESPONSE=$(curl -s -w "\n%{http_code}" \
  -X POST "${TRIAIGE_RUNNER_URL}/triage-run" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${TRIAIGE_API_KEY}" \
  -d "$PAYLOAD")

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
