# Assignment 02 review — 20 November 2026

Source: Web Programming_A#02 (1).pdf, CS4032, Fall 2026. This is a review of implemented source and recorded checks, not a claim that every submission item is finished.

## Functional requirements

| IDs | Requirement | Current evidence / status |
|---|---|---|
| FR01–FR02 | At least three routes, details parameter and invalid-ID recovery | Collection, details, box, checkout and confirmation routes; useful fallback. Implemented. |
| FR03 | At least ten stable local records | Twelve products in src/data/products.js. Implemented. |
| FR04–FR05 | Search, filter and sort together | URL-based search/category/sort/budget filter. Implemented. |
| FR06 | Decision-making product details | Price, stock, packing space, fragrance and care/ingredients. Implemented. |
| FR07–FR08 | Editable selection and consistent shared state | App owns draft; add/remove/quantity/size/finish affect all summaries. Implemented. |
| FR09–FR10 | Controlled form, at least three validation rules, input preservation | Recipient, email, city, address, message and consent; field-specific errors. Implemented. |
| FR11–FR12 | Derived summary and three enforced rules | Capacity, fragrance compatibility, city/delivery-price rule. Implemented. |
| FR13 | Restore selection from local storage | Validated cart/preferences restore and stock revalidation. Implemented. |
| FR14–FR15 | Async loading, failure/retry, distinct empty states | Mock loader plus documented demo controls and recovery. Implemented. |
| FR16 | Clear final result | Explicit simulated order receipt. Implemented. |
| FR17 | Responsive and keyboard-accessible journey | Responsive authored CSS, semantic controls and focus states. Previous release was browser-tested; redesigned release needs fresh 390/1280 px and console checks. |
| FR18 | Three investigated problems addressed | Early packaging prices; recoverable no-match search; keyboard-operable packaging controls. Evidence and decisions retained. |
| FR19 | Public deployment and nested-route refresh | Existing Vercel deployment and SPA rewrite. Updated deployment status must be checked for this revision. |

## Operating rules

1. Capacity: Small 6 units/Rs 300, Medium 10/Rs 450, Large 14/Rs 600. Exactly full is allowed; over-capacity or stock conflicts block checkout and explain recovery.
2. Compatibility: scent-free selection rejects added-fragrance candles/soap. Enabling the preference after selecting a conflicting gift preserves it, explains the conflict and prevents completion.
3. Fulfilment/pricing: Islamabad and Rawalpindi only. Rs 250 delivery below Rs 4,000 merchandise; free at/above Rs 4,000. Packaging is excluded from the threshold. Unsupported city prevents completion; the total now asks for a supported city rather than showing a misleading numeric quote.

## Changes made in this review

- Replaced illustrated hero/stickers with product photography and a quieter retail layout.
- Replaced illustrated packing objects with the same product photos used in the catalogue.
- Simplified size/finish labels and customer-facing instructions.
- Replaced undersized mobile text with readable labels and larger controls.
- Preserved search/filter/sort URL when following the product details return link.
- Kept stock, capacity, price and compatibility feedback visible.
- Removed unused decorative stylesheet rules and external font dependency.

## Verification

Node business-rule tests: 6 passed, 0 failed. Valid, exact-boundary and over-limit capacity cases are separate tests; additional cases cover malformed input, delivery-area/fee boundaries and restored conflicts. Production Vite build passed. React Router's dependency-level use-client bundling notices do not prevent the build; current browser console remains unverified because the browser automation runtime was unavailable.

Reference screenshots document the inspected BOXFOX interface on 15 November 2026. Earlier app screenshots in docs/screenshots are historical and must not be described as screenshots of this redesign.

## Remaining submission gaps

- Public GitHub repository/link is still missing. Real local commits exist; uploading now cannot satisfy the historical public-from-start requirement. Do not fabricate/backdate history.
- The assignment requires a final PDF report, not only the website. Update its app screenshots/annotations and insert the real repository URL, deployed URL and final commit. Its sections must cover business profile, operating rules/boundaries, three reference problems, three decisions, implementation evidence, verification and limitations.
- Recheck redesigned screens at 390 and 1280 px, keyboard-only navigation and the live browser console; refresh a nested product route after deployment.
- Submit the public repository link, deployed link and a source ZIP named 24I2105_IrumFatima_A_A#02.zip. Exclude node_modules, dist and secrets; retain local data/assets, dependency lockfile, tests, README and DECISIONS.

No payment backend or MongoDB is required by this assignment: the brief explicitly asks for a React frontend using local data and simulated completion.
