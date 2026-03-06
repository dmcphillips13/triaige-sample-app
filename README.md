# Triaige Sample App

A sample Next.js dashboard app used to generate visual regressions for the [Triaige](https://github.com/dmcphillips13/triaige) pipeline.

## Pages

- **Overview** (`/overview`) — KPI cards with trend indicators
- **Users** (`/users`) — Data table with status badges
- **Settings** (`/settings`) — Form with inputs, selects, toggles
- **Reports** (`/reports`) — Grid of report summary cards

## Design Tokens

All visual properties (colors, spacing, radii, shadows, font sizes) are CSS custom properties in `src/app/globals.css`. Changing a single token cascades across every page, producing realistic multi-component visual diffs.

## Development

```bash
npm install
npm run dev
```

## Visual Regression Tests

```bash
npx playwright install chromium
npx playwright test --update-snapshots  # generate baselines
npx playwright test                      # run tests
```

To trigger failures, change a token in `globals.css` (e.g., `--spacing-unit: 6px`) and re-run tests.
