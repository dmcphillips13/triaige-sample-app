#!/usr/bin/env bash
# post-failures.sh — Parse Playwright JSON results and POST failures to Triaige runner
# Wired up fully in Step 16
#
# Usage: ./scripts/post-failures.sh [results-file] [runner-url]
#   results-file: path to Playwright JSON results (default: test-results/results.json)
#   runner-url:   Triaige runner endpoint (default: http://localhost:8000/ask)

RESULTS_FILE="${1:-test-results/results.json}"
RUNNER_URL="${2:-http://localhost:8000/ask}"

echo "Stub: would parse $RESULTS_FILE and POST failures to $RUNNER_URL"
echo "This script will be implemented in Step 16."
