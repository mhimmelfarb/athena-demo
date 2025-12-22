# Remidi Works Platform Demos

Interactive demos for Remidi Works - Building Revenue Model Excellence.

**Target Audience:** Middle Market PE Firms & Portfolio Companies

## URLs

- `/` - Landing page with both demo options
- `/user` - Portfolio Company demo (default case study)
- `/user?client=skupreme` - Custom company demo
- `/investor` - Investor Portfolio dashboard (default)
- `/investor?client=fundname` - Custom investor view

## Core Value Proposition

- **WHAT:** See where you rank vs. peers (benchmark position)
- **SO WHAT:** Know what's broken (diagnosed gaps)
- **NOW WHAT:** Fix what matters (prioritized action)

---

## Adding Custom Company Demos

### Step 1: Create a JSON file

Create a new file in `src/data/` named after the company (lowercase, hyphens for spaces):
- `skupreme.json`
- `dataforge-ai.json`
- `cloudsync-pro.json`

### Step 2: Use this template

```json
{
  "company": "SKUpreme",
  "industry": "Retail Analytics Platform",
  "arr": "$8M",
  "stage": "Series A",
  "website": "skupreme.com",
  "scores": {
    "valueArticulation": 5.2,
    "pricingArchitecture": 4.8,
    "competitivePositioning": 6.1,
    "salesEnablement": 3.9,
    "customerROI": 5.5
  },
  "actionPlan": [
    { "name": "CFO-Ready Value Story", "priority": "High", "weeks": 2, "dimension": "customerROI" },
    { "name": "Pricing Page Overhaul", "priority": "High", "weeks": 2, "dimension": "pricingArchitecture" },
    { "name": "Sales Enablement Toolkit", "priority": "High", "weeks": 3, "dimension": "salesEnablement" },
    { "name": "Competitive Battlecards", "priority": "Medium", "weeks": 1, "dimension": "competitivePositioning" },
    { "name": "ROI Calculator", "priority": "Medium", "weeks": 2, "dimension": "customerROI" }
  ]
}
```

### Field Definitions - Company Demo

| Field | Description |
|-------|-------------|
| `company` | Company name (displayed in header and situation text) |
| `industry` | Industry/sector description |
| `arr` | Annual recurring revenue (e.g., "$8M") |
| `stage` | Funding stage (e.g., "Series A") |
| `scores` | Object with 5 dimension scores (0-10 scale) |
| `actionPlan` | Array of prioritized workstreams |

### Action Plan Item Fields

| Field | Description |
|-------|-------------|
| `name` | Workstream name |
| `priority` | "High", "Medium", or "Low" |
| `weeks` | Estimated duration |
| `dimension` | Which score dimension this addresses |

### Step 3: Share the custom URL

```
https://remidiworks.com/user?client=skupreme
```

---

## Adding Custom Investor Demos

### Step 1: Create a JSON file

Create a new file in `src/data/` named after the investor:
- `jump-capital.json`
- `insight-partners.json`

### Step 2: Use this template

```json
{
  "fundName": "Jump Capital",
  "fundType": "Growth Equity",
  "lastUpdated": "2025-12-22",
  "portfolio": [
    {
      "id": 1,
      "name": "Company Name",
      "sector": "Industry/Sector",
      "stage": "Series A/B/C",
      "healthScore": 6.5,
      "relativeScore": 0.7,
      "valueArticulation": 6.8,
      "pricingArchitecture": 5.5,
      "competitivePositioning": 7.0,
      "salesEnablement": 6.2,
      "customerROI": 6.5,
      "status": "average",
      "invested": 2023,
      "topGaps": ["Pricing Architecture"],
      "observation": "One-line observation"
    }
  ]
}
```

### Field Definitions - Investor Demo

| Field | Description |
|-------|-------------|
| `healthScore` | Overall score 0-10 (average of dimensions) |
| `relativeScore` | Difference from universe avg (5.8). Positive = above avg |
| `status` | `outperformer` (7+), `average` (5-7), `underperformer` (4-5), `critical` (<4) |
| `topGaps` | Array of dimensions needing work (empty if outperformer) |
| `observation` | Brief assessment visible in detail panel |

### Step 3: Share the custom URL

```
https://remidiworks.com/investor?client=jump-capital
```

---

## Development

```bash
npm install
npm run dev
```

## Deployment

Push to GitHub. Vercel auto-deploys.

---

Remidi Works is a product of HG Partners.
