# Assignment 02 review — 20 November 2026

I used this checklist to map my CS4032 assignment requirements to the app.

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
| FR17 | Responsive and keyboard-accessible journey | Responsive authored CSS, semantic controls and focus states. My current desktop screenshots are in the verification notes. |
| FR18 | Three investigated problems addressed | Early packaging prices; recoverable no-match search; keyboard-operable packaging controls. Evidence and decisions retained. |
| FR19 | Public deployment and nested-route refresh | The public site is on Vercel. I opened the live home and box routes during the screenshot check. |

## Operating rules

1. Capacity: Small 6 units/Rs 300, Medium 10/Rs 450, Large 14/Rs 600. Exactly full is allowed; over-capacity or stock conflicts block checkout and explain recovery.
2. Compatibility: scent-free selection rejects added-fragrance candles/soap. Enabling the preference after selecting a conflicting gift preserves it, explains the conflict and prevents completion.
3. Fulfilment/pricing: Islamabad and Rawalpindi only. Rs 250 delivery below Rs 4,000 merchandise; free at/above Rs 4,000. Packaging is excluded from the threshold. Unsupported city prevents completion; the total now asks for a supported city rather than showing a misleading numeric quote.

I recorded the current evidence in [my verification notes](VERIFICATION.md).